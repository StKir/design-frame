import { BackButton } from '~/pay_app/components/BackButton';
import { BankSelector } from '~/pay_app/components/BankSelector';
import { PhoneInput } from '~/pay_app/components/PhoneInput';
import { PrimaryButton } from '~/pay_app/components/PrimaryButton';
import { QrDisplay } from '~/pay_app/components/QrDisplay';
import { ScreenShell } from '~/pay_app/components/ScreenShell';
import { getBankById } from '~/pay_app/data/banks';
import type { BankId } from '~/pay_app/types';

type QrStaticScreenProps = {
  defaultBankId?: BankId;
};

export const QrStaticScreen = ({ defaultBankId = 'alfa' }: QrStaticScreenProps) => {
  const bank = getBankById(defaultBankId);

  return (
    <ScreenShell bank={bank}>
      <div className='pay-header'>
        <BackButton />
        <span className='pay-header__title'>QR для перевода</span>
      </div>
      <BankSelector activeBankId={defaultBankId} />
      <div className='pay-form-stack'>
        <PhoneInput value='+7 (903) 123-45-67' label='Ваш номер телефона' readOnly />
      </div>
      <QrDisplay phone='+7 (903) 123-45-67' mode='static' />
      <div style={{ padding: '0 16px 24px' }}>
        <PrimaryButton>Поделиться QR</PrimaryButton>
      </div>
    </ScreenShell>
  );
};
