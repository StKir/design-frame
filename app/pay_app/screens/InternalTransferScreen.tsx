import { BackButton } from '~/pay_app/components/BackButton';
import { BankSelector } from '~/pay_app/components/BankSelector';
import { AmountInput } from '~/pay_app/components/AmountInput';
import { IconChevronRight } from '~/pay_app/components/icons';
import { PrimaryButton } from '~/pay_app/components/PrimaryButton';
import { ScreenShell } from '~/pay_app/components/ScreenShell';
import { getBankById } from '~/pay_app/data/banks';
import type { BankId } from '~/pay_app/types';

type InternalTransferScreenProps = {
  defaultBankId?: BankId;
};

export const InternalTransferScreen = ({ defaultBankId = 'sber' }: InternalTransferScreenProps) => {
  const bank = getBankById(defaultBankId);

  return (
    <ScreenShell bank={bank}>
      <div className='pay-header'>
        <BackButton />
        <span className='pay-header__title'>Между счетами</span>
      </div>
      <BankSelector activeBankId={defaultBankId} />
      <div className='pay-glass-solid pay-stub-card'>
        <div className='pay-select-row'>
          <span className='pay-select-row__label'>Со счёта</span>
          <span className='pay-select-row__value'>
            •••• 4276
            <IconChevronRight />
          </span>
        </div>
        <div className='pay-select-row'>
          <span className='pay-select-row__label'>На счёт</span>
          <span className='pay-select-row__value'>
            •••• 8912
            <IconChevronRight />
          </span>
        </div>
      </div>
      <div className='pay-form-stack'>
        <AmountInput value='5 000 ₽' readOnly />
      </div>
      <div className='pay-glass-solid pay-stub-card'>
        <div className='pay-stub-card__desc'>Комиссия не взимается · перевод моментальный</div>
      </div>
      <div style={{ padding: '0 16px 24px' }}>
        <PrimaryButton>Перевести</PrimaryButton>
      </div>
    </ScreenShell>
  );
};
