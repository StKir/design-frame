import type { Container } from '~/vault_app/types';

export const containers: Container[] = [
  {
    id: 'contracts-2024',
    name: 'Договоры 2024',
    description: 'Архив подписанных договоров, актов и допсоглашений с клиентами',
    sourcesCount: 12,
    createdAt: '14 мар',
    role: 'work',
  },
  {
    id: 'recipes',
    name: 'Рецепты и заметки',
    description: 'Кулинарные рецепты, списки покупок и заметки с фото продуктов',
    sourcesCount: 8,
    createdAt: '2 фев',
    role: 'personal',
  },
  {
    id: 'market-research',
    name: 'Исследование рынка',
    description: 'Отчёты, презентации и конспекты по анализу конкурентов Q1',
    sourcesCount: 24,
    createdAt: '28 янв',
    role: 'shared',
  },
  {
    id: 'lecture-notes',
    name: 'Лекции по ML',
    description: 'Конспекты лекций, слайды и распознанные формулы из тетради',
    sourcesCount: 16,
    createdAt: '10 янв',
    role: 'personal',
  },
];

export const activeContainer = containers[0];
