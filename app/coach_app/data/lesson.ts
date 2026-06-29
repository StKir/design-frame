import { coachImages } from '~/coach_app/data/images';
import type { LessonDetail } from '~/coach_app/types';

export const uppercaseLetterA: LessonDetail = {
  id: 'letter-a',
  title: 'Большая буква А',
  meta: {
    number: 1,
    section: 'Буквы',
    topic: 'Большая буква А',
  },
  currentStep: 3,
  totalSteps: 5,
  progress: 70,
  coverImage: coachImages.lessonDemo,
  technique:
    'В этом уроке вы разберёте классическую прописную А: построение по направляющим, наклон 55°, контраст нажима и положение перекладины. Цель — написать устойчивую букву без завала и лишней ширины.',
  theorySections: [
    {
      id: 'anatomy',
      title: 'Конструкция буквы',
      body: 'Буква строится из двух диагональных штрихов и короткой перекладины. Вершина находится над средней линией, а обе ножки уверенно опираются на базовую линию.',
      image: coachImages.buildSteps[0],
    },
    {
      id: 'slant',
      title: 'Наклон и ритм',
      body: 'Обе диагонали держат одинаковый наклон около 55°. Если одна ножка уходит сильнее, буква сразу выглядит нестабильной и теряет ритм строки.',
      image: coachImages.buildSteps[1],
    },
    {
      id: 'weight',
      title: 'Нажим пера',
      body: 'На нисходящем движении нажим усиливается, на выходе ослабляется. Такой контраст даёт живой каллиграфический характер без тяжёлых пятен.',
      image: coachImages.buildSteps[2],
    },
  ],
  theoryTheses: [
    { id: '1', text: 'Наклон 55°' },
    { id: '2', text: 'Вершина выше средней линии' },
    { id: '3', text: 'Перекладина выше середины' },
    { id: '4', text: 'Два диагональных штриха' },
    { id: '5', text: 'Давление на нисходящем' },
    { id: '6', text: 'Лёгкие направляющие' },
  ],
  theoryTip: {
    id: 'pro-tip',
    text: 'Перед чистовым листом сделайте 3 медленных прохода по воздуху: это помогает запомнить траекторию и не ломать вершину буквы.',
  },
  theoryTerms: [
    { id: 'apex', term: 'Вершина', definition: 'Точка, где сходятся две диагонали' },
    { id: 'crossbar', term: 'Перекладина', definition: 'Короткий штрих между ножками буквы' },
    { id: 'waist', term: 'Средняя линия', definition: 'Ориентир для высоты перекладины' },
    { id: 'base', term: 'Базовая линия', definition: 'Нижняя линия, на которую опирается буква' },
  ],
  theoryChecklist: [
    { id: '1', text: 'Размечены базовая, средняя и верхняя линии', checked: true },
    { id: '2', text: 'Проверен одинаковый наклон диагоналей', checked: true },
    { id: '3', text: 'Перекладина стоит чуть выше центра', checked: false },
    { id: '4', text: 'Нажим усиливается только на движении вниз', checked: false },
  ],
  strokeOrder: [
    { id: '1', label: 'Левая диагональ', image: coachImages.buildSteps[0] },
    { id: '2', label: 'Правая диагональ', image: coachImages.buildSteps[1] },
    { id: '3', label: 'Перекладина', image: coachImages.buildSteps[2] },
  ],
  theoryVideo: {
    id: 'demo-video',
    title: 'Демонстрация: прописная А в три штриха',
    duration: '1:24',
    thumbnail: coachImages.lessonDemo,
  },
  mistakes: [
    {
      id: 'slant',
      label: 'Сбитый наклон',
      correct: false,
      image: coachImages.mistakes[0].src,
      objectPosition: coachImages.mistakes[0].position,
    },
    {
      id: 'spacing',
      label: 'Слишком широкая форма',
      correct: false,
      image: coachImages.mistakes[1].src,
      objectPosition: coachImages.mistakes[1].position,
    },
    {
      id: 'correct',
      label: 'Правильная форма',
      correct: true,
      image: coachImages.mistakes[2].src,
      objectPosition: coachImages.mistakes[2].position,
    },
  ],
  exerciseSteps: [
    {
      id: '1',
      title: 'Разметьте направляющие',
      description: 'Отметьте базовую, среднюю и верхнюю линии, затем добавьте наклонные направляющие под 55°.',
      tip: 'Линии должны быть едва заметными, чтобы не спорить с чистовым штрихом.',
      image: coachImages.buildSteps[0],
    },
    {
      id: '2',
      title: 'Проведите левую диагональ',
      description: 'Начните с вершины и ведите штрих вниз-влево, постепенно усиливая нажим.',
      tip: 'Не ускоряйтесь в конце: ножка должна спокойно прийти на базовую линию.',
      image: coachImages.buildSteps[1],
    },
    {
      id: '3',
      title: 'Добавьте правую диагональ и перекладину',
      description: 'Повторите наклон правой ножки и поставьте перекладину чуть выше середины буквы.',
      tip: 'Перекладину лучше писать одним уверенным движением слева направо.',
      image: coachImages.buildSteps[2],
    },
  ],
  practiceTask: 'Напишите прописную А 10 раз: первые 5 повторов по направляющим, затем 5 повторов без подсказок.',
  practiceImage: coachImages.practice,
  aiReview: {
    score: 8,
    maxScore: 10,
    feedback: [
      { id: '1', text: 'Наклон диагоналей стал ровнее', positive: true },
      { id: '2', text: 'Перекладина стоит на правильной высоте', positive: true },
      { id: '3', text: 'Во втором повторе левая ножка получилась слишком широкой', positive: false },
    ],
  },
  aiReviewImage: coachImages.aiReviewUpload,
  chatMessages: [
    {
      id: '1',
      role: 'assistant',
      time: '10:02',
      text: 'Привет! Я помогу разобрать прописную А. Можешь спросить про наклон, порядок штрихов или типичные ошибки.',
    },
    {
      id: '2',
      role: 'user',
      time: '10:03',
      text: 'Где должна быть перекладина?',
    },
    {
      id: '3',
      role: 'assistant',
      time: '10:03',
      text: 'Ставьте её чуть выше визуального центра. Так верхняя часть остаётся лёгкой, а буква не выглядит тяжёлой.',
    },
    {
      id: '4',
      role: 'user',
      time: '10:04',
      text: 'Диагонали получаются разными. Что проверить?',
    },
    {
      id: '5',
      role: 'assistant',
      time: '10:04',
      text: 'Проверьте, что обе диагонали идут по параллельным направляющим. Сначала ведите движение медленно без нажима, затем повторите с рабочим давлением.',
    },
  ],
};
