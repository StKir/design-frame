import type { Model } from '~/forma_app/types';

export const models: Model[] = [
  {
    id: '1',
    name: 'Керамическая ваза',
    status: 'ready',
    description:
      'Гладкая белая ваза с узким горлышком. Сканировано из 12 ракурсов.',
    createdAt: '5 июн',
  },
  {
    id: '2',
    name: 'Деревянный стул',
    status: 'loading',
    progress: 67,
  },
  {
    id: '3',
    name: 'Часы настольные',
    status: 'ready',
    description: 'Настольные часы в ретро-стиле с металлическим корпусом.',
    createdAt: '3 июн',
  },
];

export const getReadyModel = () =>
  models.find((model) => model.status === 'ready') ?? models[0];
