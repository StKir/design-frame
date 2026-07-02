import { addons } from '~/cantata_app/data/addons';
import { getVolumePrice } from '~/cantata_app/data/drinks';
import type { Drink } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IconCartAdd } from '~/cantata_app/components/icons';

type ProductSummaryScreenProps = {
  drink: Drink;
  volume: number;
  addonIds: string[];
  quantity: number;
  onBack: () => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
};

const getAddonName = (id: string) => addons.find((addon) => addon.id === id)?.name;

export const ProductSummaryScreen = ({
  drink,
  volume,
  addonIds,
  quantity,
  onBack,
  onQuantityChange,
  onAddToCart,
}: ProductSummaryScreenProps) => {
  const addonTotal = addons
    .filter((addon) => addonIds.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);
  const unitPrice = getVolumePrice(drink, volume) + addonTotal;
  const total = unitPrice * quantity;
  const milk = addonIds.map(getAddonName).find((name) => name?.includes('Овсяное')) ?? 'Коровье';
  const coffee = addonIds.map(getAddonName).find((name) => name?.includes('Бразилия')) ?? 'Бразилия Можиана';
  const selectedAddons = addons.filter((addon) => addonIds.includes(addon.id));

  return (
    <div className='cantata-sc cantata-config-sc'>
      <header className='cantata-shdr cantata-shdr--float'>
        <BackButton onClick={onBack} variant='ghost' />
        <span className='cantata-htitle cantata-htitle--light'>Ваш выбор</span>
        <div className='w-[38px]' />
      </header>

      <div className='cantata-config-hero'>
        {drink.image && <img src={drink.image} alt={drink.displayName} />}
      </div>

      <div className='cantata-product-summary-sheet cantata-psheet'>
        <div className='cantata-pcategory'>{drink.category} · Авторское меню</div>
        <div className='cantata-summary-title-row'>
          <h1 className='cantata-pname cantata-pname--compact'>{drink.displayName}</h1>
          <span className='cantata-summary-volume'>{volume} мл</span>
        </div>

        <div className='cantata-inggrp'>
          <div className='cantata-inggrp__hd'>Ваш выбор</div>
          <div className='cantata-ingrow'>
            <span className='cantata-ingrow__nm'>Молоко: {milk}</span>
            <span className='cantata-ingrow__free'>Бесплатно</span>
          </div>
          <div className='cantata-ingrow'>
            <span className='cantata-ingrow__nm'>Кофе: {coffee}</span>
            <span className='cantata-ingrow__free'>Бесплатно</span>
          </div>
          {selectedAddons
            .filter((addon) => addon.price > 0 && !addon.name.includes('Овсяное'))
            .map((addon) => (
              <div key={addon.id} className='cantata-ingrow'>
                <span className='cantata-ingrow__nm'>{addon.name}</span>
                <span className='cantata-ingrow__price'>+{addon.price} ₽</span>
              </div>
            ))}
          <div className='cantata-qrow'>
            <span className='cantata-qlabel'>Количество</span>
            <div className='cantata-qstepper'>
              <button
                type='button'
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className='cantata-qbtn'
              >
                −
              </button>
              <span className='cantata-qval'>{quantity}</span>
              <button
                type='button'
                onClick={() => onQuantityChange(quantity + 1)}
                className='cantata-qbtn'
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className='cantata-nutrow'>
          <div className='cantata-nutcell'>
            <span className='cantata-nutval'>197</span>
            <span className='cantata-nutlbl'>ккал</span>
          </div>
          <div className='cantata-nutcell'>
            <span className='cantata-nutval'>8 г</span>
            <span className='cantata-nutlbl'>белки</span>
          </div>
          <div className='cantata-nutcell'>
            <span className='cantata-nutval'>6 г</span>
            <span className='cantata-nutlbl'>жиры</span>
          </div>
          <div className='cantata-nutcell'>
            <span className='cantata-nutval'>24 г</span>
            <span className='cantata-nutlbl'>углев.</span>
          </div>
        </div>

        <CtaButton onClick={onAddToCart}>
          <IconCartAdd />
          В корзину · {total} ₽
        </CtaButton>
      </div>
    </div>
  );
};
