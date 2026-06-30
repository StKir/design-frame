import type { CatalogCategory, CatalogTab, CategoryGridItem } from '~/cantata_app/types';

export const categoryGrid: CategoryGridItem[] = [
  {
    id: 'coffee',
    label: 'Кофе',
    count: 12,
    icon: '☕',
    image: 'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.04.22.png',
  },
  {
    id: 'tea',
    label: 'Чай',
    count: 8,
    icon: '🍵',
    image: 'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.35.png',
  },
  {
    id: 'lemonade',
    label: 'Лимонады',
    count: 5,
    icon: '🍋',
    image: 'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.46.png',
  },
  {
    id: 'signature',
    label: 'Авторские',
    count: 10,
    icon: '✨',
    image: 'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.16.png',
  },
];

export const catalogTabs: CatalogTab[] = [
  { id: 'signature', label: 'Авторское', filter: 'signature' },
  { id: 'classic', label: 'Классика', filter: 'coffee' },
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
