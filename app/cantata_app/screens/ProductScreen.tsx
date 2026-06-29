import { useMemo, useState } from 'react';

import { addons } from '~/cantata_app/data/addons';
import { getDrinkMedia, getVolumePrice } from '~/cantata_app/data/drinks';
import type { Drink, DrinkSize, ProductMode } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IngredientRow } from '~/cantata_app/components/IngredientRow';
import { IconCartAdd, IconHeart } from '~/cantata_app/components/icons';
import { ProductHeroStories } from '~/cantata_app/components/ProductHeroStories';
import { VolumeChip } from '~/cantata_app/components/VolumeChip';

const VOLUME_OPTIONS = [300, 400, 500];

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
  mode: ProductMode;
  onBack: () => void;
  onOrder: () => void;
  onAddToCart: (drinkId: string, volume: number, addonIds: string[]) => void;
};

export const ProductScreen = ({
  drink,
  mode,
  onBack,
  onOrder,
  onAddToCart,
}: ProductScreenProps) => {
  const sizeOptions = useMemo(() => buildSizeOptions(drink), [drink]);
  const heroMedia = useMemo(() => getDrinkMedia(drink), [drink]);

  const [selectedVolume, setSelectedVolume] = useState(() => drink.sizes[0]?.volume ?? 300);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const addonsTotal = useMemo(
    () =>
      addons
        .filter((addon) => selectedAddonIds.includes(addon.id))
        .reduce((sum, addon) => sum + addon.price, 0),
    [selectedAddonIds],
  );

  const volumePrice = getVolumePrice(drink, selectedVolume);
  const displayPrice = volumePrice + (mode === 'addons' ? addonsTotal : 0);

  const handlePrimaryAction = () => {
    if (mode === 'addons') {
      onAddToCart(drink.id, selectedVolume, selectedAddonIds);
      return;
    }

    onOrder();
  };

  const handleToggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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
          <p className='cantata-product-hero-caption__category'>
            {mode === 'addons' ? 'Дополнительно' : drink.category}
          </p>
          <h1 className='cantata-product-hero-caption__title'>{drink.displayName}</h1>
        </div>

        <div className='cantata-product-bottom-sheet'>
          {mode === 'detail' ? (
            <>
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

              <CtaButton onClick={handlePrimaryAction}>
                <IconCartAdd />
                Заказать · {displayPrice} ₽
              </CtaButton>
            </>
          ) : (
            <>
              <div className='cantata-product-bottom-sheet__addons cantata-hide-scrollbar'>
                {addons.map((addon) => (
                  <IngredientRow
                    key={addon.id}
                    addon={addon}
                    selected={selectedAddonIds.includes(addon.id)}
                    onToggle={handleToggleAddon}
                  />
                ))}
              </div>

              <CtaButton onClick={handlePrimaryAction}>
                <IconCartAdd />В корзину · {displayPrice} ₽
              </CtaButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
