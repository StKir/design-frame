export type ThemeId =
  | 'auto'
  | 'classic'
  | 'technical'
  | 'affirmations'
  | 'poetry'
  | 'news'
  | 'dialogue'
  | 'science';

export type TextTheme = {
  id: ThemeId;
  label: string;
  hint: string;
  span?: 'wide' | 'tall';
};

export const textThemes: TextTheme[] = [
  { id: 'auto', label: 'Авто', hint: 'смешанный подбор', span: 'wide' },
  { id: 'classic', label: 'Классика', hint: 'проза' },
  { id: 'technical', label: 'Технический', hint: 'документы' },
  { id: 'affirmations', label: 'Аффирмации', hint: 'фокус' },
  { id: 'poetry', label: 'Поэзия', hint: 'ритм' },
  { id: 'news', label: 'Новости', hint: 'факты' },
  { id: 'dialogue', label: 'Диалоги', hint: 'речь' },
  { id: 'science', label: 'Наука', hint: 'термины' },
];
