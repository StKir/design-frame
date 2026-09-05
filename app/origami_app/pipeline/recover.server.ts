import { access } from 'node:fs/promises';
import path from 'node:path';

import { pollRequestResult } from '~/origami_app/pipeline/genapi.server';
import { getCourseDataDir, getCourseDataFilePath, runExportStage, runSourceStage } from '~/origami_app/pipeline/export.server';
import { isRunBusy } from '~/origami_app/pipeline/jobs.server';
import { getArtifactPath, loadRun, saveRun, updateStage } from '~/origami_app/pipeline/store.server';
import type { PipelineRun, StageId } from '~/origami_app/pipeline/types';

const STALE_RUNNING_MS = 20 * 60 * 1000;
const STALE_PENDING_MS = 15 * 60 * 1000;

const STAGE_ARTIFACT: Partial<Record<StageId, keyof PipelineRun['artifacts']>> = {
  sketch: 'sketch',
  upscale: 'upscaledSketch',
  plan: 'plan',
  svg: 'svg',
};

const DEFAULT_ARTIFACT_FILES: Partial<Record<StageId, string[]>> = {
  sketch: ['sketch.png', 'sketch.webp', 'sketch.jpg'],
  upscale: ['upscaled-sketch.png', 'upscaled-sketch.webp', 'upscaled-sketch.jpg'],
  plan: ['plan.md'],
  svg: ['svg.svg'],
};

const fileExists = async (filePath: string) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const resolveArtifactOnDisk = async (runId: string, stageId: StageId, run: PipelineRun) => {
  const artifactKey = STAGE_ARTIFACT[stageId];
  if (artifactKey && run.artifacts[artifactKey]) {
    if (await fileExists(getArtifactPath(runId, run.artifacts[artifactKey]!))) {
      return run.artifacts[artifactKey];
    }
  }

  for (const filename of DEFAULT_ARTIFACT_FILES[stageId] ?? []) {
    if (await fileExists(getArtifactPath(runId, filename))) {
      if (artifactKey && !run.artifacts[artifactKey]) {
        run.artifacts[artifactKey] = filename;
      }
      return filename;
    }
  }

  return null;
};

const resolveCourseStage = async (run: PipelineRun, stageId: 'export' | 'source' | 'tutorial') => {
  const exportDir = getCourseDataDir(run);
  const slug = path.basename(exportDir);

  if (stageId === 'export') {
    if (await fileExists(getCourseDataFilePath(slug, 'manifest.json'))) {
      run.exportSlug = slug;
      run.courseDataDir = path.relative(path.join(process.cwd(), 'app/origami_app/tutorials'), exportDir);
      return 'manifest.json';
    }
    return null;
  }

  if (stageId === 'source') {
    if (await fileExists(getCourseDataFilePath(slug, 'source.json'))) {
      run.exportSlug = slug;
      run.courseDataDir = path.relative(path.join(process.cwd(), 'app/origami_app/tutorials'), exportDir);
      run.artifacts.sourceJson = 'source.json';
      return 'source.json';
    }
    return null;
  }

  if (await fileExists(getCourseDataFilePath(slug, 'tutorial.json'))) {
    run.exportSlug = slug;
    run.courseDataDir = path.relative(path.join(process.cwd(), 'app/origami_app/tutorials'), exportDir);
    run.artifacts.tutorialJson = 'tutorial.json';
    return 'tutorial.json';
  }

  return null;
};

const LOCAL_STAGE_IDS: StageId[] = ['export', 'source'];
const STALE_LOCAL_PENDING_MS = 8 * 1000;

const exportDepsReady = (run: PipelineRun) =>
  run.stages.plan.status === 'done' &&
  run.stages.svg.status === 'done' &&
  Boolean(run.artifacts.sketch && run.artifacts.plan && run.artifacts.svg);

const sourceDepsReady = (run: PipelineRun) => exportDepsReady(run) && run.stages.export.status === 'done';

const resumeLocalStage = async (run: PipelineRun, stageId: StageId) => {
  if (stageId === 'export' && exportDepsReady(run)) {
    await runExportStage(run.id);
    return true;
  }

  if (stageId === 'source' && sourceDepsReady(run)) {
    await runSourceStage(run.id);
    return true;
  }

  return false;
};

const isPipelineLocked = (run: PipelineRun) => {
  if (isRunBusy(run.id)) return true;
  return (['sketch', 'upscale', 'plan', 'svg', 'export', 'source', 'tutorial'] as StageId[]).some(
    (stageId) => run.stages[stageId]?.status === 'running',
  );
};

const tryRecoverFromGenApi = async (run: PipelineRun, stageId: StageId) => {
  const stage = run.stages[stageId];
  if (!stage.requestId || stage.status !== 'running') return false;

  try {
    await pollRequestResult(stage.requestId, { maxAttempts: 1, delayMs: 0 });
    return false;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('timeout') || message.includes('processing')) {
      return true;
    }
    return false;
  }
};

export const recoverStaleRun = async (run: PipelineRun) => {
  if (isPipelineLocked(run)) return run;

  let changed = false;

  for (const stageId of ['sketch', 'upscale', 'plan', 'svg', 'export', 'source', 'tutorial'] as StageId[]) {
    const stage = run.stages[stageId];
    if (!stage || (stage.status !== 'running' && stage.status !== 'pending')) continue;

    const artifactFilename = await resolveArtifactOnDisk(run.id, stageId, run);
    if (artifactFilename) {
      updateStage(run, stageId, {
        status: 'done',
        error: undefined,
        finishedAt: stage.finishedAt ?? new Date().toISOString(),
      });
      changed = true;
      continue;
    }

    if (stage.status === 'pending') {
      const sketchActive =
        run.stages.sketch.status === 'running' ||
        run.stages.sketch.status === 'pending' ||
        isRunBusy(run.id);
      const upscaleActive =
        run.stages.upscale.status === 'running' || run.stages.upscale.status === 'pending';

      if (stageId === 'upscale' && sketchActive) {
        continue;
      }

      if (stageId !== 'sketch' && sketchActive && (stageId === 'upscale' || stageId === 'plan' || stageId === 'svg')) {
        continue;
      }

      if ((stageId === 'plan' || stageId === 'svg') && upscaleActive) {
        continue;
      }

      if (stageId === 'export' || stageId === 'source' || stageId === 'tutorial') {
        const depsReady =
          run.stages.sketch.status === 'done' &&
          run.stages.plan.status === 'done' &&
          run.stages.svg.status === 'done';
        if (!depsReady) continue;
      }

      if (stageId === 'tutorial' && run.stages.source.status !== 'done') {
        continue;
      }

      if (LOCAL_STAGE_IDS.includes(stageId) && !isRunBusy(run.id)) {
        const since = run.updatedAt;
        const age = Date.now() - new Date(since).getTime();
        if (age >= STALE_LOCAL_PENDING_MS) {
          try {
            if (await resumeLocalStage(run, stageId)) {
              Object.assign(run, await loadRun(run.id));
              changed = true;
              continue;
            }
          } catch {
            updateStage(run, stageId, {
              status: 'idle',
              error: undefined,
              finishedAt: new Date().toISOString(),
            });
            changed = true;
            continue;
          }
        }
      }
    }

    if (stageId === 'export' || stageId === 'source' || stageId === 'tutorial') {
      const courseArtifact = await resolveCourseStage(run, stageId);
      if (courseArtifact) {
        updateStage(run, stageId, {
          status: 'done',
          error: undefined,
          finishedAt: stage.finishedAt ?? new Date().toISOString(),
        });
        changed = true;
        continue;
      }
    }

    if (stage.status === 'running' && stage.requestId) {
      const stillProcessing = await tryRecoverFromGenApi(run, stageId);
      if (stillProcessing) continue;
    }

    const since = stage.startedAt ?? run.updatedAt;
    const age = Date.now() - new Date(since).getTime();
    const limit = stage.status === 'pending' ? STALE_PENDING_MS : STALE_RUNNING_MS;
    if (age < limit) continue;

    updateStage(run, stageId, {
      status: 'error',
      error: 'Генерация прервана. Нажмите «Повторить».',
      finishedAt: new Date().toISOString(),
    });
    changed = true;
  }

  if (changed) await saveRun(run);
  return run;
};
