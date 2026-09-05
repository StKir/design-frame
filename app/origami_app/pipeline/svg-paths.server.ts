export type ParsedSvgPath = {
  index: number;
  d: string;
  stroke?: string;
  strokeWidth?: number;
  transform?: string;
  bbox: [number, number, number, number];
  length: number;
  yMid: number;
};

export type ParsedSvg = {
  viewBox: string;
  paths: ParsedSvgPath[];
};

const readAttr = (attrs: string, name: string) => {
  const match = attrs.match(new RegExp(`${name}="([^"]*)"`));
  return match?.[1];
};

const estimateBBox = (d: string): [number, number, number, number] => {
  const numbers = d.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
  if (numbers.length < 2) return [0, 0, 0, 0];

  const xs: number[] = [];
  const ys: number[] = [];

  for (let i = 0; i + 1 < numbers.length; i += 2) {
    xs.push(numbers[i]!);
    ys.push(numbers[i + 1]!);
  }

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return [minX, minY, maxX - minX, maxY - minY];
};

export const parseSvgDocument = (svgText: string): ParsedSvg => {
  const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/);
  const width = Number(svgText.match(/\bwidth="(\d+)"/)?.[1] ?? 1024);
  const height = Number(svgText.match(/\bheight="(\d+)"/)?.[1] ?? 1024);
  const viewBox = viewBoxMatch?.[1] ?? `0 0 ${width} ${height}`;

  const paths: ParsedSvgPath[] = [];
  const pathRe = /<path\b([^>]*)\/?>/gi;
  let match: RegExpExecArray | null;

  while ((match = pathRe.exec(svgText))) {
    const attrs = match[1] ?? '';
    const d = readAttr(attrs, 'd');
    if (!d) continue;

    const bbox = estimateBBox(d);
    const strokeWidth = Number(readAttr(attrs, 'stroke-width') ?? readAttr(attrs, 'strokeWidth') ?? 1);

    paths.push({
      index: paths.length,
      d,
      stroke: readAttr(attrs, 'stroke'),
      strokeWidth: Number.isFinite(strokeWidth) ? strokeWidth : undefined,
      transform: readAttr(attrs, 'transform'),
      bbox,
      length: d.length,
      yMid: bbox[1] + bbox[3] / 2,
    });
  }

  return { viewBox, paths };
};

export const buildPathCatalog = (parsed: ParsedSvg) => ({
  viewBox: parsed.viewBox,
  pathCount: parsed.paths.length,
  paths: parsed.paths.map((path) => ({
    i: path.index,
    bbox: path.bbox,
    len: path.length,
    yMid: Math.round(path.yMid),
  })),
});
