import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { Tutorial, TutorialStep } from '~/origami_app/data/tutorials';
import { createNetworkRequest, extractTextFromGenApiResult, pollRequestResult } from '~/origami_app/pipeline/genapi.server';
import { getCourseDataDir } from '~/origami_app/pipeline/export.server';
import { buildPathCatalog, parseSvgDocument } from '~/origami_app/pipeline/svg-paths.server';
import { getArtifactPath, loadRun, saveRun, updateStage } from '~/origami_app/pipeline/store.server';

type AiGuidePath = {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  duration?: number;
};

type AiTutorialStep = {
  id: string;
  name: string;
  body: string;
  description: string;
  duration?: number;
  kind?: 'guide' | 'ink';
  pathIndices?: number[];
  paths?: AiGuidePath[];
};

type AiTutorialPlan = {
  meta: {
    id: string;
    title: string;
    subtitle?: string;
    kicker?: string;
    featured?: boolean;
  };
  steps: AiTutorialStep[];
};

const TUTORIALS_DIR = path.join(process.cwd(), 'app/origami_app/tutorials');

const extractJsonBlock = (text: string) => {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced?.[1]?.trim() ?? text.trim();
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Модель не вернула JSON туториала');
  }
  return candidate.slice(start, end + 1);
};

const parseAiTutorialPlan = (text: string): AiTutorialPlan => {
  const raw = extractJsonBlock(text);
  const parsed = JSON.parse(raw) as AiTutorialPlan;

  if (!parsed.meta?.id || !parsed.meta?.title || !Array.isArray(parsed.steps) || !parsed.steps.length) {
    throw new Error('JSON туториала неполный: нужны meta.id, meta.title и steps[]');
  }

  return parsed;
};

const inkPathFromSvg = (pathItem: ReturnType<typeof parseSvgDocument>['paths'][number], duration: number) => ({
  d: pathItem.d,
  ...(pathItem.transform ? { transform: pathItem.transform } : {}),
  stroke: '#111111',
  strokeWidth: pathItem.strokeWidth && pathItem.strokeWidth > 0 ? pathItem.strokeWidth : 1.35,
  duration,
});

const assembleTutorial = (plan: AiTutorialPlan, parsed: ReturnType<typeof parseSvgDocument>): Tutorial => {
  const used = new Set<number>();
  const steps: TutorialStep[] = [];

  plan.steps.forEach((step) => {
    const duration = step.duration ?? 900;
    const paths: TutorialStep['paths'] = [];

    if (step.kind === 'guide' || step.paths?.length) {
      step.paths?.forEach((guidePath) => {
        paths.push({
          d: guidePath.d,
          stroke: guidePath.stroke ?? '#A5A5A0',
          strokeWidth: guidePath.strokeWidth ?? 1.1,
          strokeDasharray: guidePath.strokeDasharray ?? '8 8',
          duration: guidePath.duration ?? duration,
        });
      });
    }

    step.pathIndices?.forEach((index) => {
      const svgPath = parsed.paths[index];
      if (!svgPath) return;
      used.add(index);
      paths.push(inkPathFromSvg(svgPath, duration));
    });

    if (!paths.length) return;

    steps.push({
      id: step.id,
      name: step.name,
      body: step.body,
      description: step.description,
      duration,
      paths,
    });
  });

  if (!steps.length) {
    throw new Error('После сборки tutorial.json не осталось ни одного шага с path');
  }

  const unused = parsed.paths.filter((item) => !used.has(item.index));
  if (unused.length) {
    const chunkSize = 8;
    for (let offset = 0; offset < unused.length; offset += chunkSize) {
      const chunk = unused.slice(offset, offset + chunkSize);
      steps.push({
        id: `detail-${String(Math.floor(offset / chunkSize) + 1).padStart(3, '0')}`,
        name: 'Детали',
        body: 'Добавляем оставшиеся штрихи текущего яруса.',
        description: 'Мелкий масштаб: дополнительные линии фасада.',
        duration: 750,
        paths: chunk.map((item) => inkPathFromSvg(item, 750)),
      });
    }
  }

  return {
    id: plan.meta.id,
    title: plan.meta.title,
    subtitle: plan.meta.subtitle ?? 'Архитектурный линейный этюд',
    kicker: plan.meta.kicker ?? 'Этюд',
    featured: plan.meta.featured ?? false,
    viewBox: parsed.viewBox,
    steps,
  };
};

export const runTutorialStage = async (runId: string) => {
  const run = await loadRun(runId);

  if (!run.artifacts.plan || !run.artifacts.svg) {
    throw new Error('Нужны план и SVG перед генерацией tutorial.json');
  }

  updateStage(run, 'tutorial', {
    status: 'running',
    startedAt: new Date().toISOString(),
    error: undefined,
  });
  await saveRun(run);

  try {
    if (run.stages.source.status !== 'done') {
      const { runSourceStage } = await import('~/origami_app/pipeline/export.server');
      await runSourceStage(runId);
      Object.assign(run, await loadRun(runId));
    }

    const planText = await readFile(getArtifactPath(runId, run.artifacts.plan), 'utf8');
    const svgText = await readFile(getArtifactPath(runId, run.artifacts.svg), 'utf8');
    const parsed = parseSvgDocument(svgText);
    const catalog = buildPathCatalog(parsed);

    if (!parsed.paths.length) {
      throw new Error('SVG не содержит path — нечего собирать в tutorial.json');
    }

    const slug = run.exportSlug ?? run.id;
    const userPayload = {
      task: 'Собери пошаговый tutorial JSON для Atelier',
      metaDefaults: {
        id: slug,
        title: run.title,
        subtitle: 'Архитектурный линейный этюд',
        kicker: 'Этюд',
        featured: false,
      },
      viewBox: parsed.viewBox,
      pathCatalog: catalog,
      drawingPlan: planText.length > 14000 ? `${planText.slice(0, 14000)}\n\n…` : planText,
      outputSchema: {
        meta: { id: 'string', title: 'string', subtitle: 'string', kicker: 'string', featured: 'boolean' },
        steps: [
          {
            id: 'guide-001',
            name: 'string',
            body: 'string',
            description: 'string',
            duration: 'number',
            kind: 'guide',
            paths: [{ d: 'string', stroke: '#A5A5A0', strokeWidth: 1.1, strokeDasharray: '8 8', duration: 1000 }],
          },
          {
            id: 'form-001',
            name: 'string',
            body: 'string',
            description: 'string',
            duration: 'number',
            kind: 'ink',
            pathIndices: [0, 1, 2],
          },
        ],
      },
    };

    const { requestId, result } = await createNetworkRequest(run.config.tutorialModel, {
      messages: [
        { role: 'system', content: run.config.tutorialPrompt },
        {
          role: 'user',
          content: `Данные для сборки tutorial JSON:\n\n${JSON.stringify(userPayload, null, 2)}`,
        },
      ],
      is_sync: false,
    });

    const rawResult = result ?? (await pollRequestResult(requestId!, { maxAttempts: 240, delayMs: 4000 }));
    const responseText = extractTextFromGenApiResult(rawResult);
    const aiPlan = parseAiTutorialPlan(responseText);
    const tutorial = assembleTutorial(aiPlan, parsed);

    const exportDir = getCourseDataDir(run);
    await mkdir(exportDir, { recursive: true });

    const tutorialFilename = `${slug}.json`;
    const courseTutorialPath = path.join(exportDir, 'tutorial.json');
    const publishedTutorialPath = path.join(TUTORIALS_DIR, tutorialFilename);

    await writeFile(courseTutorialPath, `${JSON.stringify(tutorial, null, 2)}\n`, 'utf8');
    await copyFile(courseTutorialPath, publishedTutorialPath);

    const manifestPath = path.join(exportDir, 'manifest.json');
    try {
      const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, string>;
      manifest.tutorial = 'tutorial.json';
      await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    } catch {
      await writeFile(manifestPath, `${JSON.stringify({ tutorial: 'tutorial.json' }, null, 2)}\n`, 'utf8');
    }

    await writeFile(path.join(exportDir, 'tutorial.raw.json'), `${JSON.stringify(aiPlan, null, 2)}\n`, 'utf8');
    await writeFile(getArtifactPath(runId, 'tutorial.raw.json'), `${JSON.stringify(aiPlan, null, 2)}\n`, 'utf8');

    run.artifacts.tutorialJson = 'tutorial.json';
    run.courseDataDir = path.relative(TUTORIALS_DIR, exportDir);

    updateStage(run, 'tutorial', {
      status: 'done',
      finishedAt: new Date().toISOString(),
      requestId,
    });
    await saveRun(run);
    return run;
  } catch (error) {
    updateStage(run, 'tutorial', {
      status: 'error',
      finishedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    });
    await saveRun(run);
    throw error;
  }
};

export const readTutorialPreview = async (courseDataDir?: string) => {
  if (!courseDataDir) return undefined;
  try {
    const text = await readFile(path.join(TUTORIALS_DIR, courseDataDir, 'tutorial.json'), 'utf8');
    const tutorial = JSON.parse(text) as Tutorial;
    return `${tutorial.title} · ${tutorial.steps.length} шагов · viewBox ${tutorial.viewBox}`;
  } catch {
    return undefined;
  }
};
