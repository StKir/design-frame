import type { Addon, IngredientGroup, SweetItem } from '~/cantata_app/types';

export const addons: Addon[] = [
  { id: 'cow-milk', name: 'Коровье', price: 0 },
  { id: 'oat-milk', name: 'Овсяное', price: 60 },
  { id: 'coconut-milk', name: 'Кокосовое', price: 60 },
  { id: 'almond-milk', name: 'Миндальное', price: 70 },
  { id: 'brazil-coffee', name: 'Бразилия Можиана', price: 0 },
  { id: 'ethiopia-coffee', name: 'Эфиопия Сидамо', price: 40 },
  { id: 'colombia-coffee', name: 'Колумбия Супремо', price: 0 },
  { id: 'cherry-syrup', name: 'Доп. сироп вишня', price: 50 },
  { id: 'cream', name: 'Взбитые сливки', price: 0 },
  { id: 'ice', name: 'Лёд', price: 0 },
];

export const ingredientGroups: IngredientGroup[] = [
  {
    id: 'milk',
    title: 'Молоко',
    options: addons.filter((addon) =>
      ['cow-milk', 'oat-milk', 'coconut-milk', 'almond-milk'].includes(addon.id),
    ),
  },
  {
    id: 'coffee',
    title: 'Сорт кофе',
    options: addons.filter((addon) =>
      ['brazil-coffee', 'ethiopia-coffee', 'colombia-coffee'].includes(addon.id),
    ),
  },
  {
    id: 'extra',
    title: 'Дополнительно',
    options: addons.filter((addon) => ['cherry-syrup', 'cream', 'ice'].includes(addon.id)),
  },
];

export const sweetItems: SweetItem[] = [
  { id: 'mon-bon', emoji: '🍫', name: 'Мон Бон', price: 95 },
  { id: 'bird-milk', emoji: '🍬', name: 'Птичье молоко', price: 80 },
  { id: 'croissant', emoji: '🥐', name: 'Круассан', price: 150 },
];
