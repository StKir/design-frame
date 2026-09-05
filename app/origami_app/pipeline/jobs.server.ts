import { clearPipelineCancel, requestPipelineCancel } from '~/origami_app/pipeline/cancel.server';
import { runPartialPipeline, runStage } from '~/origami_app/pipeline/runner.server';
import { loadRun, saveRun, updateStage } from '~/origami_app/pipeline/store.server';
import type { StageId } from '~/origami_app/pipeline/types';

const activeJobs = new Set<string>();

const RUNNABLE_STAGE_IDS: StageId[] = [
  'sketch',
  'upscale',
  'plan',
  'svg',
  'export',
  'source',
  'tutorial',
];

const jobKey = (runId: string, scope: 'all' | StageId) => `${runId}:${scope}`;

const isStageBusy = (runId: string, stageId: StageId) =>
  activeJobs.has(jobKey(runId, stageId)) || activeJobs.has(jobKey(runId, 'all'));

export const isRunBusy = (runId: string) => RUNNABLE_STAGE_IDS.some((stageId) => isStageBusy(runId, stageId));

const dropRunJobs = (runId: string) => {
  for (const key of [...activeJobs]) {
    if (key.startsWith(`${runId}:`)) {
      activeJobs.delete(key);
    }
  }
};

const runJob = async (key: string, task: () => Promise<unknown>) => {
  if (activeJobs.has(key)) return false;

  activeJobs.add(key);
  try {
    await task();
    return true;
  } catch {
    return false;
  } finally {
    activeJobs.delete(key);
  }
};

export const queueStage = async (runId: string, stageId: StageId) => {
  const key = jobKey(runId, stageId);

  if (activeJobs.has(key) || activeJobs.has(jobKey(runId, 'all'))) {
    return { queued: false, reason: 'busy' as const };
  }

  const run = await loadRun(runId);
  if (run.stages[stageId].status === 'running') {
    return { queued: false, reason: 'running' as const };
  }

  clearPipelineCancel(runId);

  updateStage(run, stageId, {
    status: 'pending',
    error: undefined,
    startedAt: undefined,
    finishedAt: undefined,
  });
  await saveRun(run);

  void runJob(key, () => runStage(runId, stageId));

  return { queued: true as const };
};

const PIPELINE_STAGE_IDS: StageId[] = [
  'sketch',
  'upscale',
  'plan',
  'svg',
  'export',
  'source',
  'tutorial',
];

const markPipelinePending = (run: Awaited<ReturnType<typeof loadRun>>, targetStageId: StageId) => {
  const targetIndex = PIPELINE_STAGE_IDS.indexOf(targetStageId);
  PIPELINE_STAGE_IDS.forEach((stageId, index) => {
    if (index > targetIndex) return;
    if (run.stages[stageId].status === 'done') return;
    updateStage(run, stageId, {
      status: 'pending',
      error: undefined,
      startedAt: undefined,
      finishedAt: undefined,
    });
  });
};

export const queuePartialPipeline = async (runId: string, targetStageId: StageId) => {
  const key = jobKey(runId, 'all');

  if (activeJobs.has(key) || isRunBusy(runId)) {
    return { queued: false, reason: 'busy' as const };
  }

  if (!PIPELINE_STAGE_IDS.includes(targetStageId)) {
    return { queued: false, reason: 'invalid' as const };
  }

  clearPipelineCancel(runId);

  const run = await loadRun(runId);
  markPipelinePending(run, targetStageId);
  await saveRun(run);

  void runJob(key, () => runPartialPipeline(runId, targetStageId));

  return { queued: true as const, targetStageId };
};

export const queueFullPipeline = async (runId: string) => queuePartialPipeline(runId, 'tutorial');

export const cancelPipeline = async (runId: string) => {
  requestPipelineCancel(runId);
  dropRunJobs(runId);

  const run = await loadRun(runId);
  RUNNABLE_STAGE_IDS.forEach((stageId) => {
    const status = run.stages[stageId].status;
    if (status === 'pending' || status === 'running') {
      updateStage(run, stageId, {
        status: 'idle',
        error: undefined,
        startedAt: undefined,
        finishedAt: undefined,
      });
    }
  });
  await saveRun(run);

  return { stopped: true as const };
};

export const resetStage = async (runId: string, stageId: StageId) => {
  if (isStageBusy(runId, stageId)) {
    return { reset: false, reason: 'busy' as const };
  }

  const run = await loadRun(runId);
  updateStage(run, stageId, {
    status: 'idle',
    error: undefined,
    startedAt: undefined,
    finishedAt: undefined,
    requestId: undefined,
  });
  await saveRun(run);

  return { reset: true as const };
};
