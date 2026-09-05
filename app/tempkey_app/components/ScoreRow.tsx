type ScoreRowProps = {
  modeLabel: string;
  wpm: number;
  accuracy: number;
};

export const ScoreRow = ({ modeLabel, wpm, accuracy }: ScoreRowProps) => (
  <div className="tempkey-score-row">
    <span className="tempkey-score-row__mode">{modeLabel}</span>
    <div className="tempkey-score-row__stats">
      <span className="tempkey-score-row__wpm">{wpm} wpm</span>
      <span className="tempkey-score-row__acc">{accuracy}%</span>
    </div>
  </div>
);
