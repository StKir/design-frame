import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  createLlmVisionRequest,
  createNetworkRequest,
  downloadUrlToBuffer,
  extractSvgFromGenApiResult,
  extractTextFromGenApiResult,
  extractUrlsFromGenApiResult,
  isHttpUrl,
  pollRequestResult,
} from '~/origami_app/pipeline/genapi.server';
import {
  loadRun,
  saveArtifact,
  saveRun,
  updateStage,
} from '~/origami_app/pipeline/store.server';
import type { PipelineRun, StageId } from '~/origami_app/pipeline/types';
import {
  clearPipelineCancel,
  PipelineCancelledError,
  throwIfCancelled,
} from '~/origami_app/pipeline/cancel.server';
import { runExportStage, runSourceStage } from '~/origami_app/pipeline/export.server';
import { runTutorialStage } from '~/origami_app/pipeline/tutorial.server';
import {
  isGenApiVectorizer,
  isLlmVectorizer,
  isLocalVectorizer,
  vectorizeImageToSvg,
} from '~/origami_app/pipeline/vectorize.server';

const RUNS_DIR = path.join(process.cwd(), 'app/origami_app/tutorials/pipline/runs');

const readRunFile = (runId: string, filename: string) =>
  readFile(path.join(RUNS_DIR, runId, filename));

const mimeForFile = (filename: string) => {
  if (filename.endsWith('.png')) return 'image/png';
  if (filename.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
};

const markRunning = (run: PipelineRun, stageId: StageId) => {
  updateStage(run, stageId, {
    status: 'running',
    startedAt: new Date().toISOString(),
    error: undefined,
  });
};

const markDone = (run: PipelineRun, stageId: StageId, requestId?: number) => {
  updateStage(run, stageId, {
    status: 'done',
    finishedAt: new Date().toISOString(),
    requestId,
  });
};

const markError = (run: PipelineRun, stageId: StageId, error: unknown) => {
  updateStage(run, stageId, {
    status: 'error',
    finishedAt: new Date().toISOString(),
    error: error instanceof Error ? error.message : String(error),
  });
};

export const runSketchStage = async (runId: string) => {
  const run = await loadRun(runId);

  if (!run.artifacts.reference) {
    throw new Error('Сначала загрузите референс');
  }

  markRunning(run, 'sketch');
  await saveRun(run);

  try {
    const referenceFilename = run.artifacts.reference;
    const referenceBuffer = await readRunFile(runId, referenceFilename);

    const { requestId, result } = await createNetworkRequest(
      run.config.sketchModel,
      {
        prompt: run.config.sketchPrompt,
        quality: run.config.sketchQuality,
        image_size: run.config.sketchSize,
        output_format: run.config.sketchFormat,
        num_images: run.config.sketchNumImages,
        is_sync: false,
      },
      [
        {
          field: 'image_urls[]',
          buffer: referenceBuffer,
          filename: referenceFilename,
          mime: mimeForFile(referenceFilename),
        },
      ],
    );

    const rawResult = result ?? (await pollRequestResult(requestId!));
    const imageUrl = extractUrlsFromGenApiResult(rawResult)[0]!;
    const sketchBuffer = imageUrl.startsWith('data:')
      ? Buffer.from(imageUrl.split(',')[1] ?? '', 'base64')
      : await downloadUrlToBuffer(imageUrl);

    const filename = await saveArtifact(runId, 'sketch', sketchBuffer, run.config.sketchFormat);
    run.artifacts.sketch = filename;
    if (isHttpUrl(imageUrl)) {
      run.artifacts.sketchUrl = imageUrl;
    }
    throwIfCancelled(runId);
    markDone(run, 'sketch', requestId);
    await saveRun(run);
    return run;
  } catch (error) {
    markError(run, 'sketch', error);
    await saveRun(run);
    throw error;
  }
};

export const runUpscaleStage = async (runId: string) => {
  const run = await loadRun(runId);

  if (!run.artifacts.sketch) {
    throw new Error('Сначала сгенерируйте скетч');
  }

  markRunning(run, 'upscale');
  await saveRun(run);

  try {
    const sketchFilename = run.artifacts.sketch;
    const sketchBuffer = await readRunFile(runId, sketchFilename);

    const { requestId, result } = await createNetworkRequest(
      run.config.upscaleModel,
      {
        ...run.config.upscaleSettings,
        is_sync: false,
      },
      [
        {
          field: 'image_url',
          buffer: sketchBuffer,
          filename: sketchFilename,
          mime: mimeForFile(sketchFilename),
        },
      ],
    );

    const rawResult = result ?? (await pollRequestResult(requestId!, { maxAttempts: 120, delayMs: 3000 }));
    const imageUrl = extractUrlsFromGenApiResult(rawResult)[0]!;
    const upscaledBuffer = imageUrl.startsWith('data:')
      ? Buffer.from(imageUrl.split(',')[1] ?? '', 'base64')
      : await downloadUrlToBuffer(imageUrl);

    const ext = run.config.upscaleSettings.output_format;
    const filename = await saveArtifact(runId, 'upscaled-sketch', upscaledBuffer, ext);
    run.artifacts.upscaledSketch = filename;
    if (isHttpUrl(imageUrl)) {
      run.artifacts.upscaledSketchUrl = imageUrl;
    }
    throwIfCancelled(runId);
    markDone(run, 'upscale', requestId);
    await saveRun(run);
    return run;
  } catch (error) {
    markError(run, 'upscale', error);
    await saveRun(run);
    throw error;
  }
};

export const runPlanStage = async (runId: string) => {
  const run = await loadRun(runId);

  if (!run.artifacts.sketch) {
    throw new Error('Сначала сгенерируйте скетч');
  }

  markRunning(run, 'plan');
  await saveRun(run);

  try {
    const sketchFilename = run.artifacts.sketch;
    const sketchUrl = run.artifacts.sketchUrl;

    if (!isHttpUrl(sketchUrl)) {
      throw new Error('Нет GenAPI URL скетча. Перезапустите этап sketch.');
    }

    const sketchBuffer = await readRunFile(runId, sketchFilename);

    const { requestId, result } = await createLlmVisionRequest(run.config.planModel, run.config.planPrompt, {
      url: sketchUrl,
      buffer: sketchBuffer,
      filename: sketchFilename,
      mime: mimeForFile(sketchFilename),
    });

    const rawResult = result ?? (await pollRequestResult(requestId!, { maxAttempts: 180, delayMs: 4000 }));
    const planText = extractTextFromGenApiResult(rawResult);

    const filename = await saveArtifact(runId, 'plan', planText, 'md');
    run.artifacts.plan = filename;
    throwIfCancelled(runId);
    markDone(run, 'plan', requestId);
    await saveRun(run);
    return run;
  } catch (error) {
    markError(run, 'plan', error);
    await saveRun(run);
    throw error;
  }
};

export const runSvgStage = async (runId: string) => {
  const run = await loadRun(runId);

  const sketchFilename = run.artifacts.upscaledSketch ?? run.artifacts.sketch;
  if (!sketchFilename) {
    throw new Error('Сначала сгенерируйте upscaled скетч');
  }

  markRunning(run, 'svg');
  await saveRun(run);

  try {
    const sketchBuffer = await readRunFile(runId, sketchFilename);
    const svgModel = run.config.svgModel;

    if (isLocalVectorizer(svgModel)) {
      const svgContent = await vectorizeImageToSvg(sketchBuffer, run.config.vectorizeSettings);
      const filename = await saveArtifact(runId, 'svg', svgContent, 'svg');
      run.artifacts.svg = filename;
      throwIfCancelled(runId);
      markDone(run, 'svg');
      await saveRun(run);
      return run;
    }

    const imageUrl = run.artifacts.upscaledSketchUrl ?? run.artifacts.sketchUrl;

    if (isLlmVectorizer(svgModel) && !isHttpUrl(imageUrl)) {
      throw new Error('Нет GenAPI URL изображения. Перезапустите этап upscale.');
    }

    const { requestId, result } = isGenApiVectorizer(svgModel)
      ? await createNetworkRequest(
          svgModel,
          {
            ...run.config.svgSettings,
            is_sync: false,
          },
          [
            {
              field: 'image_url',
              buffer: sketchBuffer,
              filename: sketchFilename,
              mime: mimeForFile(sketchFilename),
            },
          ],
        )
      : await createLlmVisionRequest(svgModel, run.config.svgPrompt, {
          url: imageUrl,
          buffer: sketchBuffer,
          filename: sketchFilename,
          mime: mimeForFile(sketchFilename),
        });

    const rawResult =
      result ??
      (await pollRequestResult(requestId!, {
        maxAttempts: isGenApiVectorizer(svgModel) ? 200 : 240,
        delayMs: isGenApiVectorizer(svgModel) ? 3000 : 4000,
      }));

    const svgContent = isGenApiVectorizer(svgModel)
      ? await (async () => {
          const svgUrl = extractUrlsFromGenApiResult(rawResult)[0]!;
          return svgUrl.startsWith('data:')
            ? Buffer.from(svgUrl.split(',')[1] ?? '', 'base64').toString('utf8')
            : (await downloadUrlToBuffer(svgUrl)).toString('utf8');
        })()
      : extractSvgFromGenApiResult(rawResult);

    const filename = await saveArtifact(runId, 'svg', svgContent, 'svg');
    run.artifacts.svg = filename;
    throwIfCancelled(runId);
    markDone(run, 'svg', requestId);
    await saveRun(run);
    return run;
  } catch (error) {
    markError(run, 'svg', error);
    await saveRun(run);
    throw error;
  }
};

export const runPartialPipeline = async (runId: string, targetStageId: StageId) => {
  const pipelineStages: StageId[] = [
    'sketch',
    'upscale',
    'plan',
    'svg',
    'export',
    'source',
    'tutorial',
  ];
  const targetIndex = pipelineStages.indexOf(targetStageId);

  if (targetIndex < 0) {
    throw new Error(`Этап ${targetStageId} нельзя запустить через pipeline`);
  }

  const shouldRun = (stageId: StageId) => pipelineStages.indexOf(stageId) <= targetIndex;
  const needsExportChain = shouldRun('export') || shouldRun('source') || shouldRun('tutorial');

  const resetPending = async (stageIds: StageId[]) => {
    const run = await loadRun(runId);
    stageIds.forEach((stageId) => {
      if (run.stages[stageId].status === 'pending') {
        updateStage(run, stageId, { status: 'idle' });
      }
    });
    await saveRun(run);
    return run;
  };

  const cleanupOrphanPending = async () => {
    const run = await loadRun(runId);
    pipelineStages.slice(0, targetIndex + 1).forEach((stageId) => {
      if (run.stages[stageId].status === 'pending') {
        updateStage(run, stageId, { status: 'idle' });
      }
    });
    await saveRun(run);
    return run;
  };

  const handlePipelineError = async (error: unknown, stageIds: StageId[]) => {
    if (error instanceof PipelineCancelledError) {
      clearPipelineCancel(runId);
      return cleanupOrphanPending();
    }
    return resetPending(stageIds);
  };

  const laterStages = pipelineStages.slice(targetIndex + 1);

  try {
    if (shouldRun('sketch')) {
      throwIfCancelled(runId);
      try {
        await runSketchStage(runId);
      } catch (error) {
        return handlePipelineError(error, pipelineStages.filter((stageId) => stageId !== 'sketch'));
      }
    }

    if (shouldRun('upscale')) {
      throwIfCancelled(runId);
      try {
        await runUpscaleStage(runId);
      } catch (error) {
        return handlePipelineError(error, laterStages);
      }
    }

    const runPlan = shouldRun('plan') || needsExportChain;
    const runSvg = shouldRun('svg') || needsExportChain;

    throwIfCancelled(runId);

    if (runPlan && runSvg) {
      await Promise.allSettled([runPlanStage(runId), runSvgStage(runId)]);
    } else if (runPlan) {
      await runPlanStage(runId);
    } else if (runSvg) {
      await runSvgStage(runId);
    }

    throwIfCancelled(runId);

    if (shouldRun('export')) {
      const refreshed = await loadRun(runId);
      if (refreshed.stages.plan.status === 'done' && refreshed.stages.svg.status === 'done') {
        await runExportStage(runId);
      } else {
        await resetPending(['export', ...laterStages.filter((stageId) => stageId !== 'export')]);
      }
    }

    throwIfCancelled(runId);

    if (shouldRun('source')) {
      await runSourceStage(runId);
    }

    throwIfCancelled(runId);

    if (shouldRun('tutorial')) {
      await runTutorialStage(runId);
    }

    clearPipelineCancel(runId);
    return cleanupOrphanPending();
  } catch (error) {
    if (error instanceof PipelineCancelledError) {
      clearPipelineCancel(runId);
      return cleanupOrphanPending();
    }
    throw error;
  }
};

export const runFullPipeline = async (runId: string) => runPartialPipeline(runId, 'tutorial');

export const runStage = async (runId: string, stageId: StageId) => {
  if (stageId === 'sketch') return runSketchStage(runId);
  if (stageId === 'upscale') return runUpscaleStage(runId);
  if (stageId === 'plan') return runPlanStage(runId);
  if (stageId === 'svg') return runSvgStage(runId);
  if (stageId === 'export') return runExportStage(runId);
  if (stageId === 'source') return runSourceStage(runId);
  if (stageId === 'tutorial') return runTutorialStage(runId);
  throw new Error(`Этап ${stageId} нельзя запустить через API`);
};
