import type { CSSProperties } from 'react';

import type { Tutorial } from '~/origami_app/data/tutorials';

type LayeredDrawingProps = {
  tutorial: Tutorial;
  step: number;
  isolate: boolean;
};

export const LayeredDrawing = ({ tutorial, step, isolate }: LayeredDrawingProps) => (
  <div className='atelier-stage' aria-hidden='true'>
    <svg viewBox={tutorial.viewBox} preserveAspectRatio='xMidYMid meet'>
      {tutorial.steps.map((drawingStep, index) => {
        const visible = index <= step;
        const current = index === step;
        const dimmed = isolate && visible && !current;

        if (!visible) return null;

        return (
          <g
            key={drawingStep.id}
            className={`atelier-drawing-step${current ? ' is-current' : ''}${dimmed ? ' is-dimmed' : ''}`}
            style={{ '--step-delay': `${index * 36}ms` } as CSSProperties}
          >
            {drawingStep.paths.map((path, pathIndex) => (
              <g
                key={`${drawingStep.id}-${pathIndex}`}
                transform={path.transform}
                style={
                  {
                    '--path-duration': `${path.duration ?? drawingStep.duration ?? 900}ms`,
                    '--path-delay': `${pathIndex * 70}ms`,
                  } as CSSProperties
                }
              >
                <path
                  className='atelier-drawing-trace'
                  d={path.d}
                  pathLength='1'
                  fill='none'
                  stroke={path.stroke ?? '#111111'}
                  strokeWidth={path.strokeWidth ?? 1.8}
                  strokeDasharray={path.strokeDasharray}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  </div>
);
