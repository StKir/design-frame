import { buildSmsUri } from '~/pay_app/data/banks';
import type { Bank } from '~/pay_app/types';

import { IconAndroid, IconApple } from '~/pay_app/components/icons';
import { PrimaryButton } from '~/pay_app/components/PrimaryButton';

type SmsPreviewCardProps = {
  bank: Bank;
  smsText: string;
  showSendActions?: boolean;
};

export const SmsPreviewCard = ({ bank, smsText, showSendActions = false }: SmsPreviewCardProps) => {
  const smsUri = buildSmsUri(bank.smsNumber, smsText);

  return (
    <>
      <div className='pay-sms-card'>
        <div className='pay-sms-card__label'>SMS для отправки</div>
        <div className='pay-sms-card__to'>
          Кому: <strong>{bank.smsNumber}</strong> · {bank.name}
        </div>
        <div className='pay-sms-card__text'>{smsText}</div>
      </div>

      {showSendActions && (
        <>
          <div className='pay-platform-hint'>
            <div className='pay-platform-hint__title'>
              <IconAndroid />
              Android
            </div>
            <p className='pay-platform-hint__text'>
              После разрешения SEND_SMS сообщение отправится автоматически в фоне.
            </p>
            <div style={{ marginTop: 10 }}>
              <PrimaryButton href={smsUri}>Отправить SMS</PrimaryButton>
            </div>
          </div>

          <div className='pay-platform-hint' style={{ marginBottom: 20 }}>
            <div className='pay-platform-hint__title'>
              <IconApple />
              iOS
            </div>
            <p className='pay-platform-hint__text'>
              Откроется предзаполненное окно iMessage — нажмите «Отправить» вручную (требование Apple).
            </p>
            <div style={{ marginTop: 10 }}>
              <PrimaryButton href={smsUri}>Открыть Messages</PrimaryButton>
            </div>
          </div>
        </>
      )}
    </>
  );
};
