import { QRCodeSVG } from 'qrcode.react';

import { buildQrPayload, formatAmount } from '~/pay_app/data/qr';
import { formatPhoneDisplay } from '~/pay_app/data/banks';
import type { QrMode } from '~/pay_app/types';

type QrDisplayProps = {
  phone: string;
  amount?: number;
  mode: QrMode;
};

export const QrDisplay = ({ phone, amount, mode }: QrDisplayProps) => {
  const payload = buildQrPayload(phone, mode === 'dynamic' ? amount : undefined);

  return (
    <div className='pay-qr-wrap'>
      <span className='pay-qr-badge'>
        {mode === 'static' ? 'Многоразовый QR' : `На сумму ${formatAmount(amount ?? 0)}`}
      </span>

      <div className='pay-qr-box'>
        <QRCodeSVG value={payload} size={200} level='M' />
      </div>

      <div className='pay-qr-meta'>
        <div className='pay-qr-meta__phone'>{formatPhoneDisplay(phone)}</div>
        {mode === 'dynamic' && amount !== undefined && (
          <div className='pay-qr-meta__amount'>{formatAmount(amount)}</div>
        )}
        <p className='pay-qr-meta__hint'>
          {mode === 'static'
            ? 'Отсканируйте любым банковским приложением — номер для перевода подставится автоматически'
            : 'QR для конкретного платежа — сумма зафиксирована'}
        </p>
      </div>
    </div>
  );
};
