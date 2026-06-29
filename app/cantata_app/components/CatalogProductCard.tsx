import type { Drink } from '~/cantata_app/types';

import { getVolumeLabel } from '~/cantata_app/data/drinks';
import { IconPlus } from '~/cantata_app/components/icons';

type CatalogProductCardProps = {
  drink: Drink;
  onSelect: (id: string) => void;
  onQuickAdd: (id: string) => void;
};

export const CatalogProductCard = ({ drink, onSelect, onQuickAdd }: CatalogProductCardProps) => (
  <div className='cantata-prdcrd'>
    <div className='cantata-prdcrd__pl'>
      <button type='button' onClick={() => onSelect(drink.id)} className='h-full w-full'>
        {drink.image ? (
          <img src={drink.image} alt={drink.displayName} className='h-full w-full object-cover' />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-[var(--bg-cream)] text-3xl opacity-40'>
            ☕
          </div>
        )}
      </button>
    </div>
    <div className='cantata-prdcrd__bd'>
      <button type='button' onClick={() => onSelect(drink.id)} className='w-full text-left'>
        <div className='cantata-prdcrd__cat'>{drink.category}</div>
        <div className='cantata-prdcrd__nm'>{drink.displayName}</div>
        <div className='cantata-prdcrd__vol'>{getVolumeLabel(drink)}</div>
      </button>
      <div className='cantata-prdcrd__ft'>
        <div className='cantata-prdcrd__pr'>от {drink.basePrice} ₽</div>
        <button
          type='button'
          onClick={() => onQuickAdd(drink.id)}
          className='cantata-prdcrd__add'
          aria-label={`Добавить ${drink.displayName}`}
        >
          <IconPlus />
        </button>
      </div>
    </div>
  </div>
);
