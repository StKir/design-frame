type IsolateButtonProps = {
  active: boolean;
  onToggle: () => void;
};

export const IsolateButton = ({ active, onToggle }: IsolateButtonProps) => (
  <button
    type="button"
    className={`atelier-isolate${active ? ' is-active' : ''}`}
    aria-pressed={active}
    aria-label={active ? 'Показать все слои' : 'Выделить текущий этап'}
    onClick={onToggle}
  >
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect
        x="2.75"
        y="5.75"
        width="9.5"
        height="9.5"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.15"
        opacity="0.4"
      />
      <rect
        x="5.75"
        y="2.75"
        width="9.5"
        height="9.5"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.15"
      />
    </svg>
  </button>
);
