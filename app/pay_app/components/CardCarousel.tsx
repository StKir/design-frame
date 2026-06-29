import { formatCardBalance, paymentCards } from '~/pay_app/data/cards';
import { IconPlus } from '~/pay_app/components/icons';

type CardCarouselProps = {
  activeCardId?: string;
};

export const CardCarousel = ({ activeCardId = 'card-1' }: CardCarouselProps) => (
  <div className='pay-cards'>
    <div className='pay-cards__scroll pay-hide-scrollbar'>
      {paymentCards.map((card) => (
        <button
          key={card.id}
          type='button'
          className={`pay-card ${card.id === activeCardId ? 'pay-card--active' : ''}`}
        >
          <div className='pay-card__top'>
            <span className='pay-card__label'>{card.label}</span>
            <span className='pay-card__type'>
              {card.type === 'credit' ? 'Кредитная' : 'Дебетовая'}
            </span>
          </div>
          <div className='pay-card__balance'>{formatCardBalance(card.balance)}</div>
          <div className='pay-card__number'>•••• {card.last4}</div>
        </button>
      ))}
      <button type='button' className='pay-card pay-card--add'>
        <span className='pay-card-add__icon'>
          <IconPlus size={24} />
        </span>
        <span className='pay-card-add__label'>Добавить карту</span>
        <span className='pay-card-add__hint'>Последние 4 цифры для SMS</span>
      </button>
    </div>
  </div>
);
