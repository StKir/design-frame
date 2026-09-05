export type StageId =
  | 'reference'
  | 'sketch'
  | 'upscale'
  | 'plan'
  | 'svg'
  | 'export'
  | 'source'
  | 'tutorial';

export type StageStatus = 'idle' | 'pending' | 'running' | 'done' | 'error';

export type StageState = {
  id: StageId;
  label: string;
  status: StageStatus;
  startedAt?: string;
  finishedAt?: string;
  error?: string;
  requestId?: number;
};

export type SvgSettings = {
  mode: string;
  colormode: string;
  hierarchical: string;
  filter_speckle: number;
  max_iterations: number;
  path_precision: number;
  color_precision: number;
  corner_threshold: number;
  layer_difference: number;
  length_threshold: number;
  splice_threshold: number;
};

export type UpscaleSettings = {
  upscale_mode: string;
  upscale_factor: number;
  target_resolution: string;
  noise_scale: number;
  output_format: string;
};

export type VectorizeSettings = {
  threshold: number;
  blurSigma: number;
  turdSize: number;
  optTolerance: number;
  alphaMax: number;
  optCurve: boolean;
  turnPolicy: 'minority' | 'majority' | 'black' | 'white' | 'left' | 'right';
};

export type PipelineConfig = {
  sketchModel: string;
  upscaleModel: string;
  planModel: string;
  svgModel: string;
  tutorialModel: string;
  sketchPrompt: string;
  planPrompt: string;
  svgPrompt: string;
  tutorialPrompt: string;
  sketchQuality: string;
  sketchSize: string;
  sketchFormat: string;
  sketchNumImages: number;
  upscaleSettings: UpscaleSettings;
  svgSettings: SvgSettings;
  vectorizeSettings: VectorizeSettings;
};

export type PipelineArtifacts = {
  reference?: string;
  sketch?: string;
  sketchUrl?: string;
  upscaledSketch?: string;
  upscaledSketchUrl?: string;
  plan?: string;
  svg?: string;
  sourceJson?: string;
  tutorialJson?: string;
};

export type PipelineRun = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  exportSlug?: string;
  courseDataDir?: string;
  config: PipelineConfig;
  stages: Record<StageId, StageState>;
  artifacts: Partial<PipelineArtifacts>;
};

export type PipelineSummary = Pick<PipelineRun, 'id' | 'title' | 'createdAt' | 'updatedAt' | 'stages' | 'courseDataDir'>;
