import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { getArtifactPath, loadRun, saveRun, updateStage } from '~/origami_app/pipeline/store.server';
import type { PipelineRun, StageId } from '~/origami_app/pipeline/types';

const COURSE_DATA_ROOT = path.join(process.cwd(), 'app/origami_app/tutorials/course/data');

export const slugifyRunTitle = (title: string, fallbackId: string) => {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9а-яё-]/gi, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || fallbackId;
};

export const getCourseDataDir = (run: PipelineRun) => {
  const slug = run.exportSlug ?? slugifyRunTitle(run.title, run.id);
  return path.join(COURSE_DATA_ROOT, slug);
};

export const getCourseDataFilePath = (slug: string, filename: string) =>
  path.join(COURSE_DATA_ROOT, slug, filename);

const fileExists = async (filePath: string) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const copyIfExists = async (from: string, to: string) => {
  if (!(await fileExists(from))) return false;
  await copyFile(from, to);
  return true;
};

export const runExportStage = async (runId: string) => {
  const run = await loadRun(runId);

  if (!run.artifacts.sketch || !run.artifacts.plan || !run.artifacts.svg) {
    throw new Error('Нужны скетч, план и SVG перед экспортом');
  }

  updateStage(run, 'export', {
    status: 'running',
    startedAt: new Date().toISOString(),
    error: undefined,
  });
  await saveRun(run);

  try {
    const exportDir = getCourseDataDir(run);
    await mkdir(exportDir, { recursive: true });

    const copied: Record<string, string> = {};

    if (run.artifacts.reference) {
      const from = getArtifactPath(runId, run.artifacts.reference);
      const target = `reference.${run.artifacts.reference.split('.').pop() ?? 'jpg'}`;
      await copyIfExists(from, path.join(exportDir, target));
      copied.reference = target;
    }

    if (run.artifacts.sketch) {
      const from = getArtifactPath(runId, run.artifacts.sketch);
      const target = `sketch.${run.artifacts.sketch.split('.').pop() ?? 'png'}`;
      await copyIfExists(from, path.join(exportDir, target));
      copied.sketch = target;
    }

    if (run.artifacts.upscaledSketch) {
      const from = getArtifactPath(runId, run.artifacts.upscaledSketch);
      const target = `upscaled-sketch.${run.artifacts.upscaledSketch.split('.').pop() ?? 'png'}`;
      await copyIfExists(from, path.join(exportDir, target));
      copied.upscaledSketch = target;
    }

    if (run.artifacts.plan) {
      await copyIfExists(getArtifactPath(runId, run.artifacts.plan), path.join(exportDir, 'plan.md'));
      copied.plan = 'plan.md';
    }

    if (run.artifacts.svg) {
      await copyIfExists(getArtifactPath(runId, run.artifacts.svg), path.join(exportDir, 'output.svg'));
      copied.svg = 'output.svg';
    }

    await writeFile(path.join(exportDir, 'manifest.json'), `${JSON.stringify(copied, null, 2)}\n`, 'utf8');

    run.exportSlug = path.basename(exportDir);
    run.courseDataDir = path.relative(path.join(process.cwd(), 'app/origami_app/tutorials'), exportDir);

    updateStage(run, 'export', {
      status: 'done',
      finishedAt: new Date().toISOString(),
    });
    await saveRun(run);
    return run;
  } catch (error) {
    updateStage(run, 'export', {
      status: 'error',
      finishedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    });
    await saveRun(run);
    throw error;
  }
};

export const runSourceStage = async (runId: string) => {
  const run = await loadRun(runId);

  if (!run.artifacts.plan || !run.artifacts.svg) {
    throw new Error('Нужны план и SVG перед сборкой source.json');
  }

  updateStage(run, 'source', {
    status: 'running',
    startedAt: new Date().toISOString(),
    error: undefined,
  });
  await saveRun(run);

  try {
    if (run.stages.export.status !== 'done') {
      await runExportStage(runId);
      Object.assign(run, await loadRun(runId));
    }

    const exportDir = getCourseDataDir(run);
    await mkdir(exportDir, { recursive: true });

    const planText = await readFile(getArtifactPath(runId, run.artifacts.plan), 'utf8');
    const svgText = await readFile(getArtifactPath(runId, run.artifacts.svg), 'utf8');

    const source = {
      id: run.exportSlug ?? slugifyRunTitle(run.title, run.id),
      title: run.title,
      description: planText,
      plan: planText,
      svg: svgText,
      runId: run.id,
      exportedAt: new Date().toISOString(),
      files: {
        reference: run.artifacts.reference,
        sketch: run.artifacts.sketch,
        upscaledSketch: run.artifacts.upscaledSketch,
        plan: 'plan.md',
        svg: 'output.svg',
      },
    };

    const sourcePath = path.join(exportDir, 'source.json');
    await writeFile(sourcePath, `${JSON.stringify(source, null, 2)}\n`, 'utf8');

    run.artifacts.sourceJson = 'source.json';
    run.courseDataDir = path.relative(path.join(process.cwd(), 'app/origami_app/tutorials'), exportDir);

    updateStage(run, 'source', {
      status: 'done',
      finishedAt: new Date().toISOString(),
    });
    await saveRun(run);
    return run;
  } catch (error) {
    updateStage(run, 'source', {
      status: 'error',
      finishedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    });
    await saveRun(run);
    throw error;
  }
};
