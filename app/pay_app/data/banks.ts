import type { Bank, BankId, SmsTransferParams } from '~/pay_app/types';

export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    return digits.slice(1);
  }

  return digits;
};

export const formatPhoneDisplay = (phone: string): string => {
  const normalized = normalizePhone(phone);

  if (normalized.length !== 10) {
    return phone;
  }

  return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6, 8)}-${normalized.slice(8)}`;
};

const buildSberSms = ({ phone, amount, cardLast4 }: SmsTransferParams): string => {
  const normalized = normalizePhone(phone);
  const parts = ['ПЕРЕВОД'];

  if (cardLast4) {
    parts.push(cardLast4);
  }

  parts.push(normalized, String(Math.round(amount)));

  return parts.join(' ');
};

const buildTbankSms = ({ phone, amount }: SmsTransferParams): string =>
  `pay ${normalizePhone(phone)} ${Math.round(amount)}`;

const buildVtbSms = ({ phone, amount }: SmsTransferParams): string =>
  `p1 ${normalizePhone(phone)} ${Math.round(amount)}`;

const buildAlfaSms = ({ phone, amount }: SmsTransferParams): string =>
  `перевод ${normalizePhone(phone)} ${Math.round(amount)}`;

const buildGazpromSms = ({ phone, amount }: SmsTransferParams): string =>
  `ПЕРЕВОД ${normalizePhone(phone)} ${Math.round(amount)}`;

export const banks: Bank[] = [
  {
    id: 'sber',
    name: 'Сбербанк',
    shortName: 'Сбер',
    initials: 'СБ',
    accent: '#21A038',
    glowColor: 'rgba(33, 160, 56, 0.2)',
    smsNumber: '900',
    buildSmsText: buildSberSms,
  },
  {
    id: 'tbank',
    name: 'Т-Банк',
    shortName: 'Т-Банк',
    initials: 'Т',
    accent: '#FFDD2D',
    glowColor: 'rgba(255, 221, 45, 0.22)',
    smsNumber: '2273',
    buildSmsText: buildTbankSms,
  },
  {
    id: 'vtb',
    name: 'ВТБ',
    shortName: 'ВТБ',
    initials: 'ВТ',
    accent: '#009FDF',
    glowColor: 'rgba(0, 159, 223, 0.18)',
    smsNumber: '1611',
    buildSmsText: buildVtbSms,
  },
  {
    id: 'alfa',
    name: 'Альфа-Банк',
    shortName: 'Альфа',
    initials: 'А',
    accent: '#EF3124',
    glowColor: 'rgba(239, 49, 36, 0.16)',
    smsNumber: '2265',
    buildSmsText: buildAlfaSms,
  },
  {
    id: 'gazprom',
    name: 'Газпромбанк',
    shortName: 'Газпром',
    initials: 'ГП',
    accent: '#003882',
    glowColor: 'rgba(0, 56, 130, 0.16)',
    smsNumber: '900',
    buildSmsText: buildGazpromSms,
  },
  {
    id: 'raiffeisen',
    name: 'Райффайзен',
    shortName: 'Райфф',
    initials: 'РФ',
    accent: '#FEE600',
    glowColor: 'rgba(254, 230, 0, 0.2)',
    smsNumber: '2265',
    buildSmsText: buildAlfaSms,
  },
];

export const getBankById = (id: BankId): Bank => banks.find((bank) => bank.id === id) ?? banks[0];

export const buildSmsUri = (smsNumber: string, body: string): string =>
  `sms:${smsNumber}?body=${encodeURIComponent(body)}`;
