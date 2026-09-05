import type { TextTheme, ThemeId } from '~/tempkey_app/data/themes';

type ThemePickerProps = {
  themes: TextTheme[];
  activeId: ThemeId;
  onChange: (id: ThemeId) => void;
};

export const ThemePicker = ({ themes, activeId, onChange }: ThemePickerProps) => (
  <div className="tempkey-theme-picker" role="listbox" aria-label="Тематика текста">
    {themes.map((theme, index) => {
      const active = theme.id === activeId;
      const spanClass =
        theme.span === 'wide'
          ? ' tempkey-theme--wide'
          : theme.span === 'tall'
            ? ' tempkey-theme--tall'
            : '';

      return (
        <button
          key={theme.id}
          type="button"
          role="option"
          aria-selected={active}
          className={`tempkey-theme${spanClass}${active ? ' tempkey-theme--active' : ''}`}
          style={{ animationDelay: `${80 + index * 45}ms` }}
          onClick={() => onChange(theme.id)}
        >
          <span className="tempkey-theme__core">
            <span className="tempkey-theme__label">{theme.label}</span>
            <span className="tempkey-theme__hint">{theme.hint}</span>
          </span>
        </button>
      );
    })}
  </div>
);
