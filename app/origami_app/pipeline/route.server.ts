import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { redirect } from 'react-router';

import { isRunBusy, cancelPipeline, queuePartialPipeline, queueStage, resetStage } from '~/origami_app/pipeline/jobs.server';
import { getCourseDataFilePath } from '~/origami_app/pipeline/export.server';
import { recoverStaleRun } from '~/origami_app/pipeline/recover.server';
import { readTutorialPreview } from '~/origami_app/pipeline/tutorial.server';
import {
  artifactUrl,
  createEmptyRun,
  getArtifactPath,
  listRuns,
  loadRun,
  saveArtifact,
  saveRun,
  updateStage,
} from '~/origami_app/pipeline/store.server';
import type { PipelineConfig, PipelineRun, StageId } from '~/origami_app/pipeline/types';

const readPlanPreview = async (runId: string, filename?: string) => {
  if (!filename) return undefined;
  try {
    const text = await readFile(getArtifactPath(runId, filename), 'utf8');
    return text.length > 4000 ? `${text.slice(0, 4000)}\n\n…` : text;
  } catch {
    return undefined;
  }
};

const readSourcePreview = async (courseDataDir?: string) => {
  if (!courseDataDir) return undefined;
  try {
    const text = await readFile(
      path.join(process.cwd(), 'app/origami_app/tutorials', courseDataDir, 'source.json'),
      'utf8',
    );
    return text.length > 3000 ? `${text.slice(0, 3000)}\n\n…` : text;
  } catch {
    return undefined;
  }
};

export const pipelineLoader = async (request: Request) => {
  const url = new URL(request.url);
  const runId = url.searchParams.get('run');
  let runs = await listRuns();

  await Promise.all(
    runs
      .filter((item) =>
        (['sketch', 'upscale', 'plan', 'svg', 'export', 'source', 'tutorial'] as StageId[]).some((stageId) => {
          const status = item.stages[stageId].status;
          return status === 'running' || status === 'pending';
        }),
      )
      .map(async (item) => recoverStaleRun(await loadRun(item.id))),
  );

  runs = await listRuns();
  const loaded = runId ? await loadRun(runId) : runs[0] ? await loadRun(runs[0].id) : null;
  const run = loaded ? await recoverStaleRun(loaded) : null;
  const planPreview = run ? await readPlanPreview(run.id, run.artifacts.plan) : undefined;
  const sourcePreview = run ? await readSourcePreview(run.courseDataDir) : undefined;
  const tutorialPreview = run ? await readTutorialPreview(run.courseDataDir) : undefined;

  return {
    runs,
    run: run ? { ...run, planPreview, sourcePreview, tutorialPreview } : null,
    hasApiKey: Boolean(process.env.GENAPI_API_KEY),
  };
};

const parseUpscaleSettings = (raw: string) => {
  try {
    return JSON.parse(raw) as PipelineConfig['upscaleSettings'];
  } catch {
    throw new Error('upscaleSettings должен быть валидным JSON');
  }
};

const parseSvgSettings = (raw: string) => {
  try {
    return JSON.parse(raw) as PipelineConfig['svgSettings'];
  } catch {
    throw new Error('svgSettings должен быть валидным JSON');
  }
};

const redirectToRun = (runId: string, params?: Record<string, string>) => {
  const search = new URLSearchParams({ run: runId, ...params });
  return redirect(`/admin/pipeline?${search.toString()}`);
};

const parseVectorizeSettings = (raw: string) => {
  try {
    return JSON.parse(raw) as PipelineConfig['vectorizeSettings'];
  } catch {
    throw new Error('vectorizeSettings должен быть валидным JSON');
  }
};

export const pipelineAction = async (request: Request) => {
  const form = await request.formData();
  const intent = String(form.get('intent') ?? '');

  try {
    if (intent === 'create') {
      const title = String(form.get('title') ?? 'Новый прогон');
      const file = form.get('reference');

      if (!(file instanceof File) || file.size === 0) {
        return redirect('/admin/pipeline?error=reference-required');
      }

      const run = createEmptyRun(title);
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = await saveArtifact(run.id, 'reference', buffer, ext);
      run.artifacts.reference = filename;
      updateStage(run, 'reference', { status: 'done', finishedAt: new Date().toISOString() });
      await saveRun(run);
      return redirectToRun(run.id, { created: '1' });
    }

    const runId = String(form.get('runId') ?? '');

    if (!runId) {
      return redirect('/admin/pipeline?error=run-required');
    }

    if (intent === 'save-config') {
      const run = await loadRun(runId);
      run.config = {
        ...run.config,
        sketchModel: String(form.get('sketchModel') ?? run.config.sketchModel),
        upscaleModel: String(form.get('upscaleModel') ?? run.config.upscaleModel),
        planModel: String(form.get('planModel') ?? run.config.planModel),
        svgModel: String(form.get('svgModel') ?? run.config.svgModel),
        tutorialModel: String(form.get('tutorialModel') ?? run.config.tutorialModel),
        sketchPrompt: String(form.get('sketchPrompt') ?? run.config.sketchPrompt),
        planPrompt: String(form.get('planPrompt') ?? run.config.planPrompt),
        svgPrompt: String(form.get('svgPrompt') ?? run.config.svgPrompt),
        tutorialPrompt: String(form.get('tutorialPrompt') ?? run.config.tutorialPrompt),
        sketchQuality: String(form.get('sketchQuality') ?? run.config.sketchQuality),
        sketchSize: String(form.get('sketchSize') ?? run.config.sketchSize),
        sketchFormat: String(form.get('sketchFormat') ?? run.config.sketchFormat),
        sketchNumImages: Number(form.get('sketchNumImages') ?? run.config.sketchNumImages ?? 1),
        upscaleSettings: parseUpscaleSettings(String(form.get('upscaleSettings') ?? '{}')),
        svgSettings: parseSvgSettings(String(form.get('svgSettings') ?? '{}')),
        vectorizeSettings: parseVectorizeSettings(
          String(form.get('vectorizeSettings') ?? JSON.stringify(run.config.vectorizeSettings)),
        ),
      };
      await saveRun(run);
      return redirectToRun(runId, { saved: '1' });
    }

    if (intent === 'run-stage') {
      const stageId = String(form.get('stageId') ?? '') as StageId;
      const result = await queueStage(runId, stageId);

      if (!result.queued) {
        return redirectToRun(runId, { busy: '1' });
      }

      return redirectToRun(runId, { started: stageId });
    }

    if (intent === 'run-all') {
      const targetStageId = String(form.get('targetStageId') ?? 'tutorial') as StageId;
      const result = await queuePartialPipeline(runId, targetStageId);

      if (!result.queued) {
        return redirectToRun(runId, { busy: '1' });
      }

      return redirectToRun(runId, { started: result.targetStageId ?? targetStageId, pipeline: '1' });
    }

    if (intent === 'stop-pipeline') {
      await cancelPipeline(runId);
      return redirectToRun(runId, { stopped: '1' });
    }

    if (intent === 'reset-stage') {
      const stageId = String(form.get('stageId') ?? '') as StageId;
      await resetStage(runId, stageId);
      return redirectToRun(runId);
    }

    return redirect('/admin/pipeline?error=unknown-intent');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    const runId = String(form.get('runId') ?? '');
    if (runId) {
      return redirectToRun(runId, { error: message });
    }
    return redirect(`/admin/pipeline?error=${encodeURIComponent(message)}`);
  }
};

export const pipelineFileLoader = async (runId: string, filename: string) => {
  const buffer = await readFile(getArtifactPath(runId, filename));
  return buffer;
};

export const pipelineCourseFileLoader = async (slug: string, filename: string) => {
  const buffer = await readFile(getCourseDataFilePath(slug, filename));
  return buffer;
};

export { artifactUrl };
