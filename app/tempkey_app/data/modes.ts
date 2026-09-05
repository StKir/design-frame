export type ModeId = 'classic' | 'sprint' | 'zen';

export type Mode = {
  id: ModeId;
  label: string;
  hint: string;
};

export type ModeScore = {
  modeId: ModeId;
  wpm: number;
  accuracy: number;
};

export const modes: Mode[] = [
  { id: 'classic', label: 'Классика', hint: '60 сек' },
  { id: 'sprint', label: 'Спринт', hint: '30 слов' },
  { id: 'zen', label: 'Дзен', hint: 'без таймера' },
];

export const bestScores: ModeScore[] = [
  { modeId: 'classic', wpm: 72, accuracy: 98 },
  { modeId: 'sprint', wpm: 81, accuracy: 95 },
  { modeId: 'zen', wpm: 64, accuracy: 99 },
];
