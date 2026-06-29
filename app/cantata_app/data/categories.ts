import type { CatalogTab, CategoryGridItem } from '~/cantata_app/types';

export const categoryGrid: CategoryGridItem[] = [
  { id: 'coffee', label: 'Кофе', count: 12, icon: '☕' },
  { id: 'tea', label: 'Чай', count: 8, icon: '🍵' },
  { id: 'lemonade', label: 'Лимонады', count: 5, icon: '🍋' },
  { id: 'signature', label: 'Авторские', count: 10, icon: '✨' },
];

export const catalogTabs: CatalogTab[] = [
  { id: 'signature', label: 'Авторское', filter: 'signature' },
  { id: 'cappuccino', label: 'Капучино', filter: 'coffee' },
  { id: 'latte', label: 'Латте', filter: 'coffee' },
  { id: 'matcha', label: 'Матча', filter: 'signature' },
  { id: 'tea', label: 'Чай', filter: 'tea' },
  { id: 'lemonade', label: 'Лимонады', filter: 'lemonade' },
];

export const getCategoryTitle = (category: CatalogCategory) => {
  const titles: Record<CatalogCategory, string> = {
    all: 'Все',
    coffee: 'Кофе',
    tea: 'Чай',
    lemonade: 'Лимонады',
    signature: 'Авторские',
  };

  return titles[category];
};
