type SettingsTextareaProps = {
  label: string;
  value: string;
  hint?: string;
};

export const SettingsTextarea = ({ label, value, hint }: SettingsTextareaProps) => (
  <div className='vault-settings-field'>
    <label className='vault-settings-field__label'>{label}</label>
    <div className='vault-settings-textarea'>{value}</div>
    {hint && <p className='vault-settings-field__hint'>{hint}</p>}
  </div>
);

type SettingsSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  format?: (v: number) => string;
};

export const SettingsSlider = ({ label, value, min, max, format }: SettingsSliderProps) => {
  const pct = ((value - min) / (max - min)) * 100;
  const display = format ? format(value) : String(value);

  return (
    <div className='vault-settings-field'>
      <div className='vault-settings-slider__header'>
        <span className='vault-settings-field__label'>{label}</span>
        <span className='vault-settings-slider__value vault-tabular'>{display}</span>
      </div>
      <div className='vault-settings-slider'>
        <div className='vault-settings-slider__track'>
          <div className='vault-settings-slider__fill' style={{ width: `${pct}%` }} />
          <div className='vault-settings-slider__thumb' style={{ left: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
};

type SettingsToggleProps = {
  label: string;
  description?: string;
  enabled: boolean;
};

export const SettingsToggle = ({ label, description, enabled }: SettingsToggleProps) => (
  <div className='vault-settings-toggle'>
    <div className='vault-settings-toggle__info'>
      <span className='vault-settings-toggle__label'>{label}</span>
      {description && <span className='vault-settings-toggle__desc'>{description}</span>}
    </div>
    <div className={`vault-settings-toggle__switch ${enabled ? 'vault-settings-toggle__switch--on' : ''}`}>
      <div className='vault-settings-toggle__knob' />
    </div>
  </div>
);
