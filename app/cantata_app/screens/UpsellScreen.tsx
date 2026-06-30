import { sweetItems } from '~/cantata_app/data/addons';
import type { Drink } from '~/cantata_app/types';

import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IconCartAdd } from '~/cantata_app/components/icons';

type UpsellScreenProps = {
  drink: Drink;
  onAddSweet: (id: string) => void;
  onSkip: () => void;
};

export const UpsellScreen = ({ drink, onAddSweet, onSkip }: UpsellScreenProps) => (
  <div className='cantata-sc cantata-config-sc'>
    <div className='cantata-config-hero'>
      {drink.image && <img src={drink.image} alt={drink.displayName} />}
    </div>

    <div className='cantata-upsell-sheet cantata-psheet'>
      <div className='cantata-pcategory'>К напитку подойдёт</div>
      <h1 className='cantata-pname cantata-pname--compact'>{drink.displayName}</h1>
      <div className='cantata-upsell-list cantata-hide-scrollbar'>
        {sweetItems.map((item) => (
          <button
            key={item.id}
            type='button'
            onClick={() => onAddSweet(item.id)}
            className='cantata-upsell-card cantata-card-press'
          >
            <span className='cantata-upsell-card__emoji'>{item.emoji}</span>
            <span className='cantata-upsell-card__name'>{item.name}</span>
            <span className='cantata-upsell-card__price'>{item.price} ₽</span>
            <span className='cantata-upsell-card__cta'>В корзину</span>
          </button>
        ))}
      </div>

      <CtaButton onClick={onSkip}>
        <IconCartAdd />
        Пропустить
      </CtaButton>
    </div>
  </div>
);
