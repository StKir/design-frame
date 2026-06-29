import { getDrinkById } from '~/cantata_app/data/drinks';
import type { RecentOrder } from '~/cantata_app/types';

import { IconRepeat } from '~/cantata_app/components/icons';

type RecentOrderCardProps = {
  order: RecentOrder;
  onRepeat: (drinkId: string) => void;
};

export const RecentOrderCard = ({ order, onRepeat }: RecentOrderCardProps) => {
  const drink = getDrinkById(order.drinkId);

  return (
    <div className='cantata-rcard'>
      <div className='cantata-rcard__thumb'>
        {drink?.image ? (
          <img src={drink.image} alt={order.label} />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-2xl'>☕</div>
        )}
      </div>
      <div className='cantata-rcard__body'>
        <div>
          <div className='cantata-rcard__name'>{order.label}</div>
          <div className='cantata-rcard__price'>от {order.priceFrom} ₽</div>
        </div>
        <button
          type='button'
          onClick={() => onRepeat(order.drinkId)}
          className='cantata-rcard__cta'
        >
          <IconRepeat /> Повторить
        </button>
      </div>
    </div>
  );
};
