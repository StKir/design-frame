import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type StepDockProps = {
  step: number;
  total: number;
  title: string;
  hint: string;
  onStep: (index: number) => void;
};

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2.2 2.2l7.6 7.6M9.8 2.2l-7.6 7.6"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
    />
  </svg>
);

const Chevron = ({ dir }: { dir: 'prev' | 'next' }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    {dir === 'prev' ? (
      <path
        d="M8.5 2.5L4 7l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M5.5 2.5L10 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

export const StepDock = ({ step, total, title, hint, onStep }: StepDockProps) => {
  const isFirst = step === 0;
  const isLast = step === total - 1;
  const pagerRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const [tip, setTip] = useState({ left: 50, arrow: 0 });
  const [tipExpanded, setTipExpanded] = useState(false);

  const syncTooltip = () => {
    const pager = pagerRef.current;
    const button = activeRef.current;
    const bubble = tipRef.current;
    if (!pager || !button || !bubble) return;
    const pagerBox = pager.getBoundingClientRect();
    const buttonBox = button.getBoundingClientRect();
    const tipWidth = bubble.offsetWidth;
    const center = buttonBox.left + buttonBox.width / 2 - pagerBox.left;
    const half = tipWidth / 2;
    const left = Math.min(pagerBox.width - half, Math.max(half, center));
    setTip({ left, arrow: center - left });
  };

  useEffect(() => {
    setTipExpanded(false);
    activeRef.current?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [step]);

  useLayoutEffect(() => {
    syncTooltip();
    const pager = pagerRef.current;
    const observer = pager ? new ResizeObserver(syncTooltip) : null;
    if (pager) observer?.observe(pager);
    const frame = requestAnimationFrame(() => requestAnimationFrame(syncTooltip));
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [step, title, hint, tipExpanded]);

  return (
    <div className="atelier-dock-shell">
      <div className="atelier-pager" ref={pagerRef}>
        <div
          key={step}
          ref={tipRef}
          className={`atelier-tooltip${tipExpanded ? ' is-expanded' : ''}`}
          style={{
            left: `${tip.left}px`,
            ['--arrow-shift' as string]: `${tip.arrow}px`,
          }}
          role="button"
          tabIndex={0}
          aria-expanded={tipExpanded}
          onClick={() => setTipExpanded((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setTipExpanded((value) => !value);
            }
          }}
        >
          <div className="atelier-tooltip-core">
            <div className="atelier-tooltip-head">
              <p className="atelier-tooltip-kicker">Этап {String(step + 1).padStart(2, '0')}</p>
              {tipExpanded && (
                <button
                  type="button"
                  className="atelier-tooltip-close"
                  aria-label="Свернуть пояснение"
                  onClick={(event) => {
                    event.stopPropagation();
                    setTipExpanded(false);
                  }}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <p className="atelier-tooltip-title">{title}</p>
            {tipExpanded && <p className="atelier-tooltip-body">{hint}</p>}
          </div>
          <span className="atelier-tooltip-arrow" aria-hidden="true" />
        </div>

        <div
          className="atelier-steps"
          role="tablist"
          aria-label="Этапы рисунка"
          onScroll={syncTooltip}
        >
          {Array.from({ length: total }, (_, index) => {
            const active = index === step;
            return (
              <button
                key={index}
                ref={active ? activeRef : undefined}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Этап ${index + 1}`}
                className={`atelier-step${active ? ' is-active' : ''}`}
                onClick={() => {
                  if (active) {
                    setTipExpanded(true);
                    return;
                  }
                  onStep(index);
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      <div className="atelier-cta-row">
        <button
          type="button"
          className="atelier-ghost"
          disabled={isFirst}
          onClick={() => onStep(step - 1)}
        >
          <span className="atelier-ghost-icon">
            <Chevron dir="prev" />
          </span>
          Назад
        </button>
        <button
          type="button"
          className="atelier-cta group"
          disabled={isLast}
          onClick={() => onStep(step + 1)}
        >
          <span>{isLast ? 'Готово' : 'Далее'}</span>
          <span className="atelier-cta-icon">
            <Chevron dir="next" />
          </span>
        </button>
      </div>
    </div>
  );
};
