import type { CSSProperties } from 'react';

import { IconPlus } from '~/pay_app/components/icons';
import { getBankById } from '~/pay_app/data/banks';
import type { BankId } from '~/pay_app/types';

type BankSelectorProps = {
  activeBankId?: BankId;
};

export const BankSelector = ({ activeBankId = 'sber' }: BankSelectorProps) => {
  const bank = getBankById(activeBankId);

  return (
    <div className='pay-bank-scroll pay-hide-scrollbar'>
      <button
        type='button'
        className='pay-bank-chip pay-bank-chip--active'
        style={{ '--pay-bank-accent': bank.accent } as CSSProperties}
      >
        <span className='pay-bank-chip__avatar' style={{ background: bank.accent }}>
          {bank.initials}
        </span>
        {bank.shortName}
      </button>
      <button type='button' className='pay-bank-chip pay-bank-chip--add' aria-label='Добавить банк'>
        <span className='pay-bank-chip__avatar pay-bank-chip__avatar--add'>
          <IconPlus size={16} />
        </span>
      </button>
    </div>
  );
};
