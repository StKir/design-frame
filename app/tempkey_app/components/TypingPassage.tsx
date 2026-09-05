type TypingPassageProps = {
  text: string;
  typedLength: number;
};

export const TypingPassage = ({ text, typedLength }: TypingPassageProps) => (
  <p className="tempkey-passage" aria-label="Текст для набора">
    {text.split('').map((char, index) => {
      let state = '';
      if (index < typedLength) state = ' tempkey-passage__char--done';
      else if (index === typedLength) state = ' tempkey-passage__char--current';

      return (
        <span key={`${index}-${char}`} className={`tempkey-passage__char${state}`}>
          {char}
        </span>
      );
    })}
  </p>
);
