import { promisify } from 'node:util';

import potrace from 'potrace';
import sharp from 'sharp';

import type { VectorizeSettings } from '~/origami_app/pipeline/types';

const traceAsync = promisify(potrace.trace);

const TURN_POLICY: Record<VectorizeSettings['turnPolicy'], number> = {
  black: potrace.Potrace.TURNPOLICY_BLACK,
  white: potrace.Potrace.TURNPOLICY_WHITE,
  left: potrace.Potrace.TURNPOLICY_LEFT,
  right: potrace.Potrace.TURNPOLICY_RIGHT,
  minority: potrace.Potrace.TURNPOLICY_MINORITY,
  majority: potrace.Potrace.TURNPOLICY_MAJORITY,
};

const normalizeSvg = (rawSvg: string, width: number, height: number) => {
  const pathTags = [...rawSvg.matchAll(/<path\b[^>]*\/?>/gi)].map((match) => match[0]!);

  if (!pathTags.length) {
    throw new Error('Potrace не нашёл контуров — проверьте threshold и исходное изображение');
  }

  const paths = pathTags
    .map((tag) =>
      tag
        .replace(/\sfill="[^"]*"/gi, '')
        .replace(/\sstroke="[^"]*"/gi, '')
        .replace(/\sstroke-width="[^"]*"/gi, '')
        .replace(/\/?>$/, ' fill="#000000"/>'),
    )
    .join('\n  ');

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `  <rect width="100%" height="100%" fill="#FFFFFF"/>`,
    `  ${paths}`,
    `</svg>`,
  ].join('\n');
};

export const vectorizeImageToSvg = async (imageBuffer: Buffer, settings: VectorizeSettings) => {
  const metadata = await sharp(imageBuffer).metadata();
  const width = metadata.width ?? 1024;
  const height = metadata.height ?? 1024;

  let pipeline = sharp(imageBuffer).grayscale().normalize();

  if (settings.blurSigma > 0) {
    pipeline = pipeline.blur(settings.blurSigma);
  }

  const binaryPng = await pipeline.threshold(settings.threshold, { grayscale: false }).png().toBuffer();

  const rawSvg = await traceAsync(binaryPng, {
    color: '#000000',
    background: '#FFFFFF',
    blackOnWhite: true,
    threshold: settings.threshold,
    turdSize: settings.turdSize,
    optTolerance: settings.optTolerance,
    alphamax: settings.alphaMax,
    optCurve: settings.optCurve,
    turnPolicy: TURN_POLICY[settings.turnPolicy],
  });

  return normalizeSvg(rawSvg, width, height);
};

export const isLocalVectorizer = (svgModel: string) => svgModel === 'local';

export const isGenApiVectorizer = (svgModel: string) => svgModel === 'image-2-svg';

export const isLlmVectorizer = (svgModel: string) => !isLocalVectorizer(svgModel) && !isGenApiVectorizer(svgModel);
