import type { Source } from '~/vault_app/types';

export const sources: Source[] = [
  {
    id: 'src-1',
    containerId: 'contracts-2024',
    type: 'photo',
    title: 'Договор аренды — стр. 1–2',
    meta: 'Распознано · 2 стр.',
    date: '12 мар',
    thumbnail:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&h=120&fit=crop',
  },
  {
    id: 'src-2',
    containerId: 'contracts-2024',
    type: 'pdf',
    title: 'Допсоглашение_№3.pdf',
    fileSize: '1.2 МБ',
    date: '10 мар',
  },
  {
    id: 'src-3',
    containerId: 'contracts-2024',
    type: 'text',
    title: 'Условия оплаты',
    excerpt: 'Оплата производится в течение 10 рабочих дней с момента подписания акта выполненных работ...',
    date: '8 мар',
  },
  {
    id: 'src-4',
    containerId: 'contracts-2024',
    type: 'photo',
    title: 'Акт выполненных работ',
    meta: 'Распознано · 1 стр.',
    date: '5 мар',
    thumbnail:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=120&h=120&fit=crop',
  },
  {
    id: 'src-5',
    containerId: 'contracts-2024',
    type: 'pdf',
    title: 'Договор_поставки_v2.pdf',
    fileSize: '3.4 МБ',
    date: '1 мар',
  },
  {
    id: 'src-6',
    containerId: 'contracts-2024',
    type: 'text',
    title: 'Контакты контрагента',
    excerpt: 'ООО «ТехноСнаб», ИНН 7701234567, юр. адрес: г. Москва, ул. Примерная, д. 15...',
    date: '28 фев',
  },
];
