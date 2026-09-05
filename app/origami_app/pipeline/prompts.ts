import type { PipelineConfig, SvgSettings, UpscaleSettings, VectorizeSettings } from '~/origami_app/pipeline/types';

export const DEFAULT_UPSCALE_SETTINGS: UpscaleSettings = {
  upscale_mode: 'factor',
  upscale_factor: 2,
  target_resolution: '1080p',
  noise_scale: 0.1,
  output_format: 'png',
};

export const DEFAULT_SVG_SETTINGS: SvgSettings = {
  mode: 'spline',
  colormode: 'binary',
  hierarchical: 'stacked',
  filter_speckle: 2,
  max_iterations: 20,
  path_precision: 6,
  color_precision: 6,
  corner_threshold: 40,
  layer_difference: 16,
  length_threshold: 3.5,
  splice_threshold: 30,
};

export const DEFAULT_VECTORIZE_SETTINGS: VectorizeSettings = {
  threshold: 168,
  blurSigma: 0.4,
  turdSize: 2,
  optTolerance: 0.15,
  alphaMax: 1,
  optCurve: true,
  turnPolicy: 'minority',
};

export const DEFAULT_SVG_PROMPT = `You are performing a STRICT GEOMETRIC VECTOR TRACE.

This is NOT an image generation task.
This is NOT a redraw.
This is NOT an architectural reconstruction.
This is NOT an artistic interpretation.

The input image is the ONLY source of truth.

Your task is to reproduce the visible 2D ink lines of the input image as SVG vector geometry.

Do not invent, improve, redesign, beautify, regularize, or reconstruct architectural elements.

TRACE THE IMAGE, DO NOT DRAW THE BUILDING.

Preserve the exact composition, framing, proportions and relative positions of all visible elements.

Do not omit visible elements.
Do not add elements that are not visible in the source.

VECTORIZATION RULES:
Every visible ink line must become SVG vector geometry.
Thin source lines must remain thin vector strokes.
Do not convert line drawings into filled silhouettes.
Do not use filled shapes to approximate detailed linework.
Use <path>, <line>, <polyline>, and <polygon> only when appropriate.
Straight source lines must remain straight.
Curved source lines must remain curved.
Do not introduce unnecessary Bézier control points.
Do not create thousands of tiny fragmented paths from image noise.
Remove only obvious compression artifacts, isolated pixels and background noise.

BINARY COLOR:
The SVG may contain ONLY stroke="#000000", fill="#000000", fill="#FFFFFF".
No other colors. No opacity. No gradients. No filters. No shadows. No embedded raster images.

IMPORTANT GEOMETRY RULE:
The SVG coordinate system must correspond directly to the source image coordinate system.
Preserve the complete image dimensions and aspect ratio.
Do not crop the image. Do not change the camera/viewpoint.

OUTPUT:
Return valid SVG markup only.
The first characters must be: <svg
The last characters must be: </svg>
No Markdown. No code fences. No explanation. No comments.`;

export const DEFAULT_SKETCH_PROMPT = `Use the attached reference as the basis for creating a NEW original architectural sketch. Create an architectural drawing inspired by the reference, preserving its architectural character, main forms, proportions, composition, and perspective, but do NOT copy the image literally. The result must be an original, simplified architectural line sketch.

The drawing will become an interactive step-by-step tutorial in Atelier (architectural line-art app). Prioritize forms that can be taught layer by layer: construction guides, major volumes, openings, details.

### CRITICALLY IMPORTANT STYLE
Imagine an architect using a graphic tablet and carefully tracing the main architectural forms of the building with a black ink pen, adding only the most important architectural details.
This is NOT a pencil drawing. This is NOT a realistic drawing. This is NOT concept art. This is NOT a painterly sketch.
It is a clean black ink architectural line sketch.
Use primarily:
* black contour lines;
* thin ink-pen lines;
* subtle natural imperfections of hand-drawn linework;
* natural variation in line weight;
* short individual lines for architectural details;
* minimal hatching.

### SIMPLIFICATION
The image MUST be SIMPLIFIED. Do not attempt to reproduce every detail from the reference.
Select only the main architectural forms and the most important details that make the building recognizable.
Remove tiny unnecessary details, complex textures, photographic details, excessive shadows, dense hatching, realistic material textures, random small elements.
The drawing should be simple enough that a person could logically recreate it step by step, one meaningful line or architectural element at a time.

### LINES INSTEAD OF SHADING
The main visual information must be communicated through LINES, not realistic lighting or shading.
Do not create large dark areas. Do not use soft gradients. Do not use pencil-style blending. Do not create realistic shadows.
When depth needs to be communicated, use a few short ink strokes or slightly stronger contour lines.
Keep most of the white space completely clean.

### ARCHITECTURE
Clearly define: overall silhouette, major planes, windows, doors, columns, arches, stairs, roof, cornices, major architectural details.
Every element should be represented with simple, clear lines, without excessive detail.

### FINAL APPEARANCE
White background. Black lines. Very limited hatching. No colors. No solid fills. No gradients. No photorealism.
The final image should look like a clean, minimal, slightly organic hand-drawn architectural ink sketch.`;

export const DEFAULT_PLAN_PROMPT = `ROLE: You are a professional architect-artist, an academic draftsman, and a methodology expert in drawing. Your specialization is architectural graphics, perspective (including low-angle and high-angle views), and ultra-fine detailing of facades.

TASK: The user will send an image of an architectural object (building, tower, bridge, etc.). Your task is to create the most detailed, step-by-step plan for drawing it on paper, exactly as if you were sketching it yourself.

WORKFLOW ALGORITHM (You must always follow this algorithm):

Image Analysis. Determine the point of view, perspective type (three-point, two-point perspective), horizon line level, light source, and proportions.

Break the object into 6 logical Phases (from construction to final presentation).

Automatic Step Calculation. Analyze the complexity of the specific drawing (presence of complex ellipses, stucco ornamentation, clock faces, rustication, spires, etc.). INDEPENDENTLY calculate the optimal number of steps (minimum 40, maximum 100+). This number changes depending on the image's complexity.

Plan Generation. Output a clear, numbered list of the calculated number of steps, grouped by phases.

RESPONSE FORMAT REQUIREMENTS:

Start with a brief introduction from the architect's perspective (1–2 sentences).

Then display phase headings, for example: "PHASE 1: CONCEPT AND LAYOUT".

Inside phases, use strict numbering (Step 1, Step 2, Step 3...).

Describe each step as a concrete action: what to draw, with which tool (pencil, eraser, T-square, compass), and which geometric task to solve (ellipse construction, finding the vanishing point, applying hatching).

Instruction tone: professional, methodical, precise. Use terminology such as: "foreshortening", "modillions", "pilasters", "acroteria", "chiaroscuro modeling".

IMPORTANT: You are not just listing obvious things. You are revealing the "inner kitchen" of a professional draftsman: how to build a grid, how to check symmetry through perspective, how to convey texture and depth. Do not reduce the number of steps to save time if you see that the object is complex. Work from general to specific and back again.`;

export const DEFAULT_TUTORIAL_PROMPT = `Ты — методист архитектурной графики и автор JSON-уроков для приложения Atelier.

ЗАДАЧА: по плану рисования и каталогу SVG-path собрать пошаговый tutorial JSON в формате интерактивного урока.

ОБЯЗАТЕЛЬНЫЕ ПРАВИЛА (architectural-line-art-json):
1. Сначала 3–5 шагов guide с серой пунктирной разметкой (#A5A5A0, strokeDasharray "8 8"): ось, габарит, ярусы, зоны проёмов. Для guide генерируй paths с координатами в viewBox.
2. Затем чёрные шаги (kind: "ink") — только через pathIndices из каталога. Не копируй d вручную для ink-шагов.
3. Порядок: разметка → крупные формы снизу вверх → средние элементы → мелкие детали. Не смешивай ярусы в одном шаге.
4. Один ink-шаг = 1–8 связанных pathIndices одного яруса/масштаба.
5. Каждый шаг: id, name, body (1–2 предложения для пользователя), description (6–14 слов для ИИ, конкретно про часть объекта и масштаб), duration 700–1200.
6. Используй ВСЕ pathIndices из каталога ровно один раз. Не пропускай индексы.
7. meta.id — латиница/slug, meta.title — человекочитаемое название на русском.

ФОРМАТ ОТВЕТА: только один JSON-объект без markdown и комментариев.`;

export const createDefaultConfig = (): PipelineConfig => ({
  sketchModel: 'gpt-image-2',
  upscaleModel: 'seedvr',
  planModel: 'gpt-5-6-luna',
  svgModel: 'local',
  tutorialModel: 'gpt-5-6-luna',
  sketchPrompt: DEFAULT_SKETCH_PROMPT,
  planPrompt: DEFAULT_PLAN_PROMPT,
  svgPrompt: DEFAULT_SVG_PROMPT,
  tutorialPrompt: DEFAULT_TUTORIAL_PROMPT,
  sketchQuality: 'low',
  sketchSize: '1024x1024',
  sketchFormat: 'png',
  sketchNumImages: 1,
  upscaleSettings: { ...DEFAULT_UPSCALE_SETTINGS },
  svgSettings: { ...DEFAULT_SVG_SETTINGS },
  vectorizeSettings: { ...DEFAULT_VECTORIZE_SETTINGS },
});
