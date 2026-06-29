import { coachImages } from '~/coach_app/data/images';
import type {
  FormQuiz,
  MiniTestQuestion,
  RepetitionGoal,
  TimerDrill,
  TraceTemplate,
  WarmupStroke,
  WordPractice,
} from '~/coach_app/types';

export const traceTemplate: TraceTemplate = {
  id: 'trace-a',
  title: 'Обведите букву по шаблону',
  description: 'Положите кальку поверх образца и проведите три штриха в нужном порядке: левая диагональ, правая диагональ, перекладина.',
  templateImage: coachImages.buildSteps[0],
  opacity: 0.35,
};

export const timerDrill: TimerDrill = {
  id: 'warmup-timer',
  title: 'Двухминутная разминка',
  durationSeconds: 120,
  instruction: 'Чередуйте наклонные линии и лёгкие выходы пера, не торопясь и сохраняя одинаковый угол.',
};

export const repetitionGoal: RepetitionGoal = {
  id: 'rep-a',
  target: 10,
  current: 6,
  label: 'Повторы буквы А',
};

export const wordPractice: WordPractice = {
  id: 'word-mir',
  word: 'Мир',
  letters: ['М', 'и', 'р'],
  activeIndex: 1,
};

export const formQuiz: FormQuiz = {
  id: 'quiz-slant',
  question: 'Какая буква А лучше держит наклон 55°?',
  options: [
    {
      id: 'a',
      label: 'Вариант 1',
      image: coachImages.mistakes[0].src,
      correct: false,
    },
    {
      id: 'b',
      label: 'Вариант 2',
      image: coachImages.mistakes[2].src,
      correct: true,
    },
    {
      id: 'c',
      label: 'Вариант 3',
      image: coachImages.mistakes[1].src,
      correct: false,
    },
  ],
};

export const miniTestQuestions: MiniTestQuestion[] = [
  {
    id: 'slant',
    question: 'Какой наклон держим в прописной букве А?',
    options: [
      { id: 'a', text: '35°', correct: false },
      { id: 'b', text: '55°', correct: true },
      { id: 'c', text: '90°', correct: false },
    ],
  },
  {
    id: 'crossbar',
    question: 'Где лучше поставить перекладину?',
    options: [
      { id: 'a', text: 'Чуть выше середины', correct: true },
      { id: 'b', text: 'На базовой линии', correct: false },
      { id: 'c', text: 'В самой вершине', correct: false },
    ],
  },
  {
    id: 'pressure',
    question: 'Когда усиливаем нажим пера?',
    options: [
      { id: 'a', text: 'На движении вверх', correct: false },
      { id: 'b', text: 'На паузе', correct: false },
      { id: 'c', text: 'На движении вниз', correct: true },
    ],
  },
  {
    id: 'guides',
    question: 'Зачем нужны направляющие линии?',
    options: [
      { id: 'a', text: 'Чтобы держать высоту и наклон', correct: true },
      { id: 'b', text: 'Чтобы заменить разминку', correct: false },
      { id: 'c', text: 'Чтобы писать быстрее', correct: false },
    ],
  },
];

export const warmupStrokes: WarmupStroke[] = [
  { id: '1', name: 'Наклонные линии', count: 8 },
  { id: '2', name: 'Лёгкий вход пера', count: 6 },
  { id: '3', name: 'Нажим вниз', count: 6 },
];
