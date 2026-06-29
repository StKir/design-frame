import type { Contact } from '~/pay_app/types';

export const contacts: Contact[] = [
  { id: '1', name: 'Анна Петрова', phone: '+7 (916) 234-56-78' },
  { id: '2', name: 'Дмитрий Козлов', phone: '+7 (903) 111-22-33' },
  { id: '3', name: 'Елена Смирнова', phone: '+7 (925) 987-65-43' },
  { id: '4', name: 'Иван Морозов', phone: '+7 (915) 456-78-90' },
  { id: '5', name: 'Мария Волкова', phone: '+7 (926) 333-44-55' },
  { id: '6', name: 'Сергей Новиков', phone: '+7 (917) 777-88-99' },
  { id: '7', name: 'Ольга Кузнецова', phone: '+7 (903) 222-33-44' },
  { id: '8', name: 'Алексей Фёдоров', phone: '+7 (916) 555-66-77' },
];

export const getContactInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
