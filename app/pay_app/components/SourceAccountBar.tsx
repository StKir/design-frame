import { formatCardBalance, getCardById, paymentCards } from '~/pay_app/data/cards';
import { IconCard, IconChevronDown } from '~/pay_app/components/icons';

type SourceAccountBarProps = {
  cardId?: string;
};

export const SourceAccountBar = ({ cardId = 'card-1' }: SourceAccountBarProps) => {
  const card = getCardById(cardId) ?? paymentCards[0];

  return (
    <button type='button' className='pay-source-account'>
      <span className='pay-source-account__icon'>
        <IconCard />
      </span>
      <span className='pay-source-account__body'>
        <span className='pay-source-account__label'>Со счёта</span>
        <span className='pay-source-account__value'>
          {card.label} · •••• {card.last4}
        </span>
      </span>
      <span className='pay-source-account__balance'>{formatCardBalance(card.balance)}</span>
      <IconChevronDown />
    </button>
  );
};
