import type { Mode, ModeId } from '~/tempkey_app/data/modes';

type ModePickerProps = {
  modes: Mode[];
  activeId: ModeId;
  onChange: (id: ModeId) => void;
};

export const ModePicker = ({ modes, activeId, onChange }: ModePickerProps) => (
  <div className="tempkey-mode-picker" role="tablist" aria-label="Режим игры">
    {modes.map((mode) => {
      const active = mode.id === activeId;

      return (
        <button
          key={mode.id}
          type="button"
          role="tab"
          aria-selected={active}
          className={`tempkey-mode${active ? ' tempkey-mode--active' : ''}`}
          onClick={() => onChange(mode.id)}
        >
          <span className="tempkey-mode__label">{mode.label}</span>
          <span className="tempkey-mode__hint">{mode.hint}</span>
        </button>
      );
    })}
  </div>
);
