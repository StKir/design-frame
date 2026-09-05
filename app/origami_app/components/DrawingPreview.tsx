import type { Tutorial } from '~/origami_app/data/tutorials';

type DrawingPreviewProps = {
  tutorial: Tutorial;
};

const MAX_PREVIEW_PATHS = 120;

export const DrawingPreview = ({ tutorial }: DrawingPreviewProps) => {
  const allPaths = tutorial.steps.flatMap((step) =>
    step.paths.map((path, pathIndex) => ({
      key: `${step.id}-${pathIndex}`,
      path,
      weight: path.d.length,
    })),
  );

  const previewPaths =
    allPaths.length <= MAX_PREVIEW_PATHS
      ? allPaths
      : [...allPaths]
          .sort((left, right) => right.weight - left.weight)
          .slice(0, MAX_PREVIEW_PATHS);

  return (
    <div className="atelier-preview-svg" aria-hidden="true">
      <svg viewBox={tutorial.viewBox} preserveAspectRatio="xMidYMid meet">
        {previewPaths.map(({ key, path }) => (
          <g key={key} transform={path.transform}>
            <path
              d={path.d}
              fill="none"
              stroke={path.stroke ?? '#111111'}
              strokeWidth={path.strokeWidth ?? 1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
