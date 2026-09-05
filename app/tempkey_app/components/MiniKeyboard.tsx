const rows = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
] as const;

type MiniKeyboardProps = {
  nextKey: string;
};

export const MiniKeyboard = ({ nextKey }: MiniKeyboardProps) => {
  const target = nextKey.toLowerCase();
  const spaceNext = target === ' ';

  return (
    <div className="tempkey-keyboard" aria-hidden="true">
      {rows.map((row) => (
        <div key={row.join('')} className="tempkey-keyboard__row">
          {row.map((key) => (
            <span
              key={key}
              className={`tempkey-key${key === target ? ' tempkey-key--next' : ''}`}
            >
              {key}
            </span>
          ))}
        </div>
      ))}
      <div className="tempkey-keyboard__row">
        <span className="tempkey-key tempkey-key--wide">⌫</span>
        <span
          className={`tempkey-key tempkey-key--space${spaceNext ? ' tempkey-key--next' : ''}`}
        >
          пробел
        </span>
        <span className="tempkey-key tempkey-key--wide">↵</span>
      </div>
    </div>
  );
};
