export type BankId = 'sber' | 'tbank' | 'vtb' | 'alfa' | 'gazprom' | 'raiffeisen';

export type SmsTransferParams = {
  phone: string;
  amount: number;
  cardLast4?: string;
};

export type Bank = {
  id: BankId;
  name: string;
  shortName: string;
  initials: string;
  accent: string;
  glowColor: string;
  smsNumber: string;
  buildSmsText: (params: SmsTransferParams) => string;
};

export type PaymentCard = {
  id: string;
  label: string;
  last4: string;
  balance: number;
  type: 'debit' | 'credit';
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
};

export type TransferFormData = {
  phone: string;
  amount: string;
};

export type QrMode = 'static' | 'dynamic';
