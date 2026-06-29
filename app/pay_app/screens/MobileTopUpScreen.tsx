import { BackButton } from '~/pay_app/components/BackButton';
import { AmountInput } from '~/pay_app/components/AmountInput';
import { BankSelector } from '~/pay_app/components/BankSelector';
import { PhoneInput } from '~/pay_app/components/PhoneInput';
import { PrimaryButton } from '~/pay_app/components/PrimaryButton';
import { ScreenShell } from '~/pay_app/components/ScreenShell';
import { getBankById } from '~/pay_app/data/banks';
import type { BankId } from '~/pay_app/types';

type MobileTopUpScreenProps = {
  defaultBankId?: BankId;
};

const operators = ['МТС', 'Билайн', 'МегаФон', 'Tele2'];

export const MobileTopUpScreen = ({ defaultBankId = 'sber' }: MobileTopUpScreenProps) => {
  const bank = getBankById(defaultBankId);

  return (
    <ScreenShell bank={bank}>
      <div className='pay-header'>
        <BackButton />
        <span className='pay-header__title'>Пополнить телефон</span>
      </div>
      <BankSelector activeBankId={defaultBankId} />
      <div style={{ padding: '0 16px 14px' }}>
        <div className='pay-field__label'>Оператор</div>
        <div className='pay-operator-grid'>
          {operators.map((operator, index) => (
            <button
              key={operator}
              type='button'
              className={`pay-operator-chip ${index === 0 ? 'pay-operator-chip--active' : ''}`}
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
      <div className='pay-form-stack'>
        <PhoneInput value='+7 (916) 555-12-34' label='Номер телефона' readOnly />
        <AmountInput value='300 ₽' label='Сумма пополнения' readOnly />
      </div>
      <div className='pay-glass-solid pay-stub-card'>
        <div className='pay-stub-card__desc'>Списание с карты •••• 4276 · без комиссии</div>
      </div>
      <div style={{ padding: '0 16px 24px' }}>
        <PrimaryButton>Пополнить</PrimaryButton>
      </div>
    </ScreenShell>
  );
};
