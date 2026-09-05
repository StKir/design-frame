export class PipelineCancelledError extends Error {
  constructor() {
    super('Pipeline остановлен');
    this.name = 'PipelineCancelledError';
  }
}

const cancelledRuns = new Set<string>();

export const requestPipelineCancel = (runId: string) => {
  cancelledRuns.add(runId);
};

export const isPipelineCancelled = (runId: string) => cancelledRuns.has(runId);

export const clearPipelineCancel = (runId: string) => {
  cancelledRuns.delete(runId);
};

export const throwIfCancelled = (runId: string) => {
  if (isPipelineCancelled(runId)) {
    throw new PipelineCancelledError();
  }
};
