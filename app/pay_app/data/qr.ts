import { normalizePhone } from '~/pay_app/data/banks';

export const buildQrPayload = (phone: string, amount?: number): string => {
  const normalized = normalizePhone(phone);
  const fullPhone = normalized.length === 10 ? `7${normalized}` : normalized;
  const params = new URLSearchParams({ phone: fullPhone });

  if (amount !== undefined && amount > 0) {
    params.set('sum', String(Math.round(amount * 100)));
  }

  return `paysms://transfer?${params.toString()}`;
};

export const formatAmount = (amount: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(amount);
