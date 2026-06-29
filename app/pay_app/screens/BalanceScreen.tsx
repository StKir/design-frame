import { BackButton } from '~/pay_app/components/BackButton';
import { BankSelector } from '~/pay_app/components/BankSelector';
import { PrimaryButton } from '~/pay_app/components/PrimaryButton';
import { ScreenShell } from '~/pay_app/components/ScreenShell';
import { getBankById } from '~/pay_app/data/banks';
import type { BankId } from '~/pay_app/types';

type BalanceScreenProps = {
  defaultBankId?: BankId;
};

export const BalanceScreen = ({ defaultBankId = 'sber' }: BalanceScreenProps) => {
  const bank = getBankById(defaultBankId);

  return (
    <ScreenShell bank={bank}>
      <div className='pay-header'>
        <BackButton />
        <span className='pay-header__title'>Баланс</span>
      </div>
      <BankSelector activeBankId={defaultBankId} />
      <div className='pay-balance-amount'>42 580 ₽</div>
      <p className='pay-balance-hint'>•••• 4276 · Основная карта</p>
      <div className='pay-glass-solid pay-stub-card'>
        <div className='pay-stub-card__title'>Запрос через SMS</div>
        <div className='pay-stub-card__desc'>
          Отправьте «БАЛАНС» на номер {bank.smsNumber} — банк пришлёт остаток по карте.
        </div>
        <div className='pay-sms-card__text' style={{ marginTop: 12 }}>
          БАЛАНС
        </div>
      </div>
      <div style={{ padding: '0 16px 24px' }}>
        <PrimaryButton>Запросить баланс</PrimaryButton>
      </div>
    </ScreenShell>
  );
};
