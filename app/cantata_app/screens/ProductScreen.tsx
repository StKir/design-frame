import { useMemo, useState } from 'react';

import { getDrinkMedia, getVolumePrice } from '~/cantata_app/data/drinks';
import type { Drink, DrinkSize } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IconCartAdd, IconHeart } from '~/cantata_app/components/icons';
import { ProductHeroStories } from '~/cantata_app/components/ProductHeroStories';
import { VolumeChip } from '~/cantata_app/components/VolumeChip';

const VOLUME_OPTIONS = [300, 400];

const buildSizeOptions = (drink: Drink): DrinkSize[] =>
  VOLUME_OPTIONS.map((volume) => {
    const existing = drink.sizes.find((size) => size.volume === volume);

    if (existing) {
      return existing;
    }

    const base = drink.sizes[0];
    const ratio = volume / base.volume;

    return {
      volume,
      calories: Math.round(base.calories * ratio),
    };
  });

type ProductScreenProps = {
  drink: Drink;
  onBack: () => void;
  onChooseIngredients: (volume: number) => void;
  onAddToCart: (volume: number) => void;
};

export const ProductScreen = ({
  drink,
  onBack,
  onChooseIngredients,
  onAddToCart,
}: ProductScreenProps) => {
  const sizeOptions = useMemo(() => buildSizeOptions(drink), [drink]);
  const heroMedia = useMemo(() => getDrinkMedia(drink), [drink]);

  const [selectedVolume, setSelectedVolume] = useState(() => drink.sizes[0]?.volume ?? 300);

  const volumePrice = getVolumePrice(drink, selectedVolume);

  return (
    <div className='cantata-product-screen'>
      <div className='cantata-product-hero cantata-hero-shimmer'>
        {heroMedia.length > 0 ? (
          <ProductHeroStories media={heroMedia} alt={drink.name} drink={drink} />
        ) : (
          <div
            className='absolute inset-0'
            style={{
              background: `linear-gradient(160deg, ${drink.pastelAccent} 0%, #F8F4EB 40%, #EAF0F9 100%)`,
            }}
          />
        )}
        <div className='cantata-phero__fade' />
      </div>

      <header className='cantata-shdr cantata-shdr--float'>
        <BackButton onClick={onBack} variant='ghost' />
        <div className='w-[38px]' />
        <button type='button' className='cantata-hbtn cantata-hbtn--ghost' aria-label='В избранное'>
          <IconHeart />
        </button>
      </header>

      <div className='cantata-product-footer'>
        <div className='cantata-product-hero-caption'>
          <p className='cantata-product-hero-caption__category'>{drink.category} · Авторское меню</p>
          <h1 className='cantata-product-hero-caption__title'>{drink.displayName}</h1>
          <p className='cantata-product-hero-caption__desc'>{drink.description}</p>
        </div>

        <div className='cantata-product-bottom-sheet cantata-psheet'>
          <div className='cantata-product-bottom-sheet__volumes'>
            {sizeOptions.map((size) => (
              <VolumeChip
                key={size.volume}
                volume={size.volume}
                price={getVolumePrice(drink, size.volume)}
                selected={selectedVolume === size.volume}
                onSelect={setSelectedVolume}
              />
            ))}
          </div>

          <button
            type='button'
            onClick={() => onChooseIngredients(selectedVolume)}
            className='cantata-secondary-cta'
          >
            Выбрать ингредиенты
          </button>

          <CtaButton onClick={() => onAddToCart(selectedVolume)}>
            <IconCartAdd />
            В корзину · {volumePrice} ₽
          </CtaButton>
        </div>
      </div>
    </div>
  );
};
