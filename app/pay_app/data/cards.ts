import type { PaymentCard } from '~/pay_app/types';

export const paymentCards: PaymentCard[] = [
  {
    id: 'card-1',
    label: 'Основная',
    last4: '4276',
    balance: 42580,
    type: 'debit',
  },
  {
    id: 'card-2',
    label: 'Зарплатная',
    last4: '8912',
    balance: 128400,
    type: 'debit',
  },
  {
    id: 'card-3',
    label: 'Кредитная',
    last4: '3301',
    balance: 85000,
    type: 'credit',
  },
];

export const getCardById = (id: string): PaymentCard | undefined =>
  paymentCards.find((card) => card.id === id);

export const formatCardBalance = (balance: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(balance);
