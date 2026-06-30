import { useMemo } from 'react';

import { addons, ingredientGroups } from '~/cantata_app/data/addons';
import { getVolumePrice } from '~/cantata_app/data/drinks';
import type { Drink } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IconCartAdd, IconPlus } from '~/cantata_app/components/icons';

type IngredientsScreenProps = {
  drink: Drink;
  volume: number;
  selectedAddonIds: string[];
  onBack: () => void;
  onChange: (addonIds: string[]) => void;
  onContinue: () => void;
};

const optionGroupIds: Record<string, string[]> = {
  milk: ['cow-milk', 'oat-milk', 'coconut-milk', 'almond-milk'],
  coffee: ['brazil-coffee', 'ethiopia-coffee', 'colombia-coffee'],
};

export const IngredientsScreen = ({
  drink,
  volume,
  selectedAddonIds,
  onBack,
  onChange,
  onContinue,
}: IngredientsScreenProps) => {
  const basePrice = getVolumePrice(drink, volume);
  const addonsTotal = useMemo(
    () =>
      addons
        .filter((addon) => selectedAddonIds.includes(addon.id))
        .reduce((sum, addon) => sum + addon.price, 0),
    [selectedAddonIds],
  );
  const total = basePrice + addonsTotal;

  const handleToggle = (groupId: string, addonId: string) => {
    const singleGroup = optionGroupIds[groupId];

    if (singleGroup) {
      onChange([...selectedAddonIds.filter((id) => !singleGroup.includes(id)), addonId]);
      return;
    }

    onChange(
      selectedAddonIds.includes(addonId)
        ? selectedAddonIds.filter((id) => id !== addonId)
        : [...selectedAddonIds, addonId],
    );
  };

  return (
    <div className='cantata-sc cantata-config-sc'>
      <header className='cantata-shdr cantata-shdr--float'>
        <BackButton onClick={onBack} variant='ghost' />
        <div className='w-[38px]' />
        <button type='button' onClick={onBack} className='cantata-hbtn cantata-hbtn--ghost' aria-label='Закрыть'>
          <IconPlus className='rotate-45' />
        </button>
      </header>

      <div className='cantata-config-hero'>
        {drink.image && <img src={drink.image} alt={drink.displayName} />}
      </div>

      <div className='cantata-config-sheet'>
        <div className='cantata-config-sheet__handle' />
        <div className='cantata-config-sheet__head'>
          <span>Латте · Авторское меню</span>
          <strong>{drink.displayName}</strong>
        </div>

        <div className='cantata-config-sheet__body cantata-hide-scrollbar'>
          {ingredientGroups.map((group) => (
            <section key={group.id} className='cantata-opt-section'>
              <div className='cantata-opt-section__hd'>{group.title}</div>
              <div className='cantata-opt-scroll cantata-hide-scrollbar'>
                {group.options.map((addon) => {
                  const selected = selectedAddonIds.includes(addon.id);

                  return (
                    <button
                      key={addon.id}
                      type='button'
                      onClick={() => handleToggle(group.id, addon.id)}
                      className={`cantata-opt-card ${selected ? 'cantata-opt-card--on' : ''}`}
                    >
                      <span className='cantata-opt-card__check'>{selected ? '✓' : '+'}</span>
                      <span className='cantata-opt-card__ic'>
                        {group.id === 'milk' ? '🥛' : group.id === 'coffee' ? '☕' : '✨'}
                      </span>
                      <span className='cantata-opt-card__nm'>{addon.name}</span>
                      <span className={addon.price === 0 ? 'cantata-opt-card__pr--free' : 'cantata-opt-card__pr'}>
                        {addon.price === 0 ? 'Бесплатно' : `+${addon.price} ₽`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className='cantata-config-sheet__footer'>
          <div className='cantata-config-sheet__price-row'>
            <span>Базовая цена {basePrice} ₽ + допы {addonsTotal} ₽</span>
            <strong>{total} ₽</strong>
          </div>
          <CtaButton onClick={onContinue}>
            <IconCartAdd />
            Продолжить · {total} ₽
          </CtaButton>
        </div>
      </div>
    </div>
  );
};
