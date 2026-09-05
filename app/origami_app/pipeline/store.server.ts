import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { slugifyRunTitle } from '~/origami_app/pipeline/export.server';
import { createDefaultConfig } from '~/origami_app/pipeline/prompts';
import type { PipelineRun, PipelineSummary, StageId, StageState, StageStatus } from '~/origami_app/pipeline/types';

const RUNS_DIR = path.join(process.cwd(), 'app/origami_app/tutorials/pipline/runs');

const STAGE_LABELS: Record<StageId, string> = {
  reference: 'Референс',
  sketch: 'Скетч (gpt-image-2)',
  upscale: 'Upscale (SeedVR)',
  plan: 'План рисования (luna)',
  svg: 'Вектор (Potrace)',
  export: 'Экспорт в course/data',
  source: 'source.json (svg + план)',
  tutorial: 'tutorial.json (урок Atelier)',
};

const ALL_STAGE_IDS: StageId[] = [
  'reference',
  'sketch',
  'upscale',
  'plan',
  'svg',
  'export',
  'source',
  'tutorial',
];

const createStage = (id: StageId, status: StageStatus = 'idle'): StageState => ({
  id,
  label: STAGE_LABELS[id],
  status,
});

const normalizeRun = (run: PipelineRun): PipelineRun => {
  ALL_STAGE_IDS.forEach((stageId) => {
    if (!run.stages[stageId]) {
      run.stages[stageId] = createStage(stageId);
    }
  });

  run.exportSlug = run.exportSlug ?? slugifyRunTitle(run.title, run.id);
  run.config.sketchQuality = run.config.sketchQuality ?? createDefaultConfig().sketchQuality;
  run.config.sketchNumImages = run.config.sketchNumImages ?? createDefaultConfig().sketchNumImages;
  run.config.tutorialModel = run.config.tutorialModel ?? createDefaultConfig().tutorialModel;
  run.config.tutorialPrompt = run.config.tutorialPrompt ?? createDefaultConfig().tutorialPrompt;
  run.config.upscaleModel =
    run.config.upscaleModel === 'upscale-image'
      ? createDefaultConfig().upscaleModel
      : (run.config.upscaleModel ?? createDefaultConfig().upscaleModel);
  run.config.upscaleSettings = run.config.upscaleSettings ?? { ...createDefaultConfig().upscaleSettings };
  run.config.svgPrompt = run.config.svgPrompt ?? createDefaultConfig().svgPrompt;
  run.config.vectorizeSettings = run.config.vectorizeSettings ?? { ...createDefaultConfig().vectorizeSettings };

  if (run.config.svgModel === 'gpt-5-6-luna') {
    run.config.svgModel = 'local';
  }

  const svg = run.config.svgSettings;
  const isLegacySvg =
    !svg ||
    (svg.filter_speckle === 4 &&
      svg.max_iterations === 10 &&
      svg.path_precision === 3 &&
      svg.corner_threshold === 60 &&
      svg.splice_threshold === 45);
  if (isLegacySvg) {
    run.config.svgSettings = { ...createDefaultConfig().svgSettings };
  }

  return run;
};

export const createEmptyRun = (title: string): PipelineRun => {
  const now = new Date().toISOString();
  const id = `${Date.now()}`;

  return normalizeRun({
    id,
    title,
    createdAt: now,
    updatedAt: now,
    exportSlug: slugifyRunTitle(title, id),
    config: createDefaultConfig(),
    stages: Object.fromEntries(ALL_STAGE_IDS.map((stageId) => [stageId, createStage(stageId)])) as Record<
      StageId,
      StageState
    >,
    artifacts: {},
  });
};

const runDir = (runId: string) => path.join(RUNS_DIR, runId);

export const ensureRunsDir = async () => {
  await mkdir(RUNS_DIR, { recursive: true });
};

export const saveRun = async (run: PipelineRun) => {
  await ensureRunsDir();
  const dir = runDir(run.id);
  await mkdir(dir, { recursive: true });
  run.updatedAt = new Date().toISOString();
  await writeFile(path.join(dir, 'meta.json'), JSON.stringify(run, null, 2));
};

export const loadRun = async (runId: string) => {
  const raw = await readFile(path.join(runDir(runId), 'meta.json'), 'utf8');
  return normalizeRun(JSON.parse(raw) as PipelineRun);
};

export const listRuns = async (): Promise<PipelineSummary[]> => {
  await ensureRunsDir();
  const entries = await readdir(RUNS_DIR, { withFileTypes: true });
  const runs = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        try {
          const run = await loadRun(entry.name);
          return {
            id: run.id,
            title: run.title,
            createdAt: run.createdAt,
            updatedAt: run.updatedAt,
            stages: run.stages,
            courseDataDir: run.courseDataDir,
          } as PipelineSummary;
        } catch {
          return null;
        }
      }),
  );

  return runs
    .filter((run): run is PipelineSummary => run !== null)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
};

export const saveArtifact = async (
  runId: string,
  name: 'reference' | 'sketch' | 'upscaled-sketch' | 'plan' | 'svg',
  content: Buffer | string,
  ext: string,
) => {
  const dir = runDir(runId);
  await mkdir(dir, { recursive: true });
  const filename = `${name}.${ext}`;
  const fullPath = path.join(dir, filename);

  if (typeof content === 'string') {
    await writeFile(fullPath, content, 'utf8');
  } else {
    await writeFile(fullPath, content);
  }

  return filename;
};

export const getArtifactPath = (runId: string, name: string) => path.join(runDir(runId), name);

export const artifactExists = async (runId: string, filename: string) => {
  try {
    await readFile(getArtifactPath(runId, filename));
    return true;
  } catch {
    return false;
  }
};

export const updateStage = (
  run: PipelineRun,
  stageId: StageId,
  patch: Partial<StageState>,
) => {
  run.stages[stageId] = { ...run.stages[stageId], ...patch };
};

export const artifactUrl = (runId: string, filename: string) => `/admin/pipeline/file/${runId}/${filename}`;

export const mimeForArtifact = (filename: string) => {
  if (filename.endsWith('.png')) return 'image/png';
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
  if (filename.endsWith('.webp')) return 'image/webp';
  if (filename.endsWith('.svg')) return 'image/svg+xml';
  if (filename.endsWith('.md')) return 'text/markdown; charset=utf-8';
  if (filename.endsWith('.json')) return 'application/json; charset=utf-8';
  return 'application/octet-stream';
};
