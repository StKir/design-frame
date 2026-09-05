import { useState } from 'react';

import { DrawingViewport } from '~/origami_app/components/DrawingViewport';
import { LayeredDrawing } from '~/origami_app/components/LayeredDrawing';
import { StepDock } from '~/origami_app/components/StepDock';
import { getTutorial } from '~/origami_app/data/tutorials';

type GuideScreenProps = {
  tutorialId: string;
  onBack?: () => void;
};

export const GuideScreen = ({ tutorialId, onBack }: GuideScreenProps) => {
  const tutorial = getTutorial(tutorialId);
  const [step, setStep] = useState(0);
  const [isolate, setIsolate] = useState(false);
  const current = tutorial.steps[step];

  return (
    <div className="atelier-root">
      <div className="atelier-grain" aria-hidden="true" />

      <header className="atelier-header">
        {onBack && (
          <button
            type="button"
            className="atelier-back"
            aria-label="К выбору рисунка"
            onClick={onBack}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M8.5 2.5L4 7l4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div className="atelier-header-shell">
          <div className="atelier-header-core">
            <p className="atelier-kicker">{String(step + 1).padStart(2, '0')}</p>
            <div className="atelier-copy">
              <p className="atelier-eyebrow">{tutorial.subtitle}</p>
              <h1 className="atelier-title">{tutorial.title}</h1>
            </div>
          </div>
        </div>
      </header>

      <DrawingViewport isolate={isolate} onIsolate={() => setIsolate((value) => !value)}>
        <LayeredDrawing tutorial={tutorial} step={step} isolate={isolate} />
      </DrawingViewport>

      <StepDock
        step={step}
        total={tutorial.steps.length}
        title={current.name}
        hint={current.body}
        onStep={setStep}
      />
    </div>
  );
};
