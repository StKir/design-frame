import { useState, type MouseEvent } from 'react';

import type { Drink } from '~/cantata_app/types';

type DrinkCardProps = {
  drink: Drink;
  index: number;
  onSelect: (id: string) => void;
};

export const DrinkCard = ({ drink, index, onSelect }: DrinkCardProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (event: MouseEvent) => {
    event.stopPropagation();
    setLiked((prev) => !prev);
  };

  return (
    <div
      className='cantata-fade-up cantata-card-press relative aspect-[3/4] w-full overflow-hidden rounded-[20px] shadow-[0px_4px_20px_rgba(48,48,48,0.1)]'
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <button
        type='button'
        onClick={() => onSelect(drink.id)}
        className='absolute inset-0 w-full'
        aria-label={drink.name}
      >
        {drink.image ? (
          <img
            src={drink.image}
            alt={drink.name}
            className='h-full w-full object-cover transition-transform duration-300 active:scale-110'
          />
        ) : (
          <div
            className='flex h-full w-full items-center justify-center'
            style={{
              background: `linear-gradient(145deg, ${drink.pastelAccent} 0%, #F8F4EB 45%, #EAF0F9 100%)`,
            }}
          >
            <span className='text-4xl opacity-40'>☕</span>
          </div>
        )}
      </button>

      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(48,48,48,0.88)] via-[rgba(48,48,48,0.25)] to-transparent' />

      <button
        type='button'
        onClick={handleLike}
        aria-label={liked ? 'Убрать из избранного' : 'В избранное'}
        className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-sm transition active:scale-95 ${
          liked
            ? 'border-[#EA7171] bg-[rgba(234,113,113,0.35)] text-[#EA7171]'
            : 'border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.2)] text-white/80'
        }`}
      >
        <svg width='12' height='12' viewBox='0 0 16 16' fill={liked ? 'currentColor' : 'none'}>
          <path
            d='M8 13.5L3.5 9.2C2.2 8 1.5 6.5 1.5 5.1 1.5 3.2 2.9 1.8 4.7 1.8c1.1 0 2.1.5 2.8 1.3L8 3.6l.5-.5C9.2 2.3 10.2 1.8 11.3 1.8 13.1 1.8 14.5 3.2 14.5 5.1c0 1.4-.7 2.9-2 4.1L8 13.5z'
            stroke='currentColor'
            strokeWidth='1.2'
          />
        </svg>
      </button>

      <div className='cantata-glass-panel absolute inset-x-0 bottom-0 px-3 py-3'>
        <button
          type='button'
          onClick={() => onSelect(drink.id)}
          className='w-full text-left'
        >
          <p className='mb-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-white/50'>
            {drink.category}
          </p>
          <h3 className='line-clamp-2 text-[13px] font-bold uppercase leading-[1.1] tracking-wide text-white'>
            {drink.name}
          </h3>
          <p className='mt-1.5 text-[17px] font-bold tabular-nums leading-none text-[#FE9A2E] drop-shadow-[0_1px_4px_rgba(254,154,46,0.4)]'>
            {drink.basePrice} ₽
          </p>
        </button>
      </div>
    </div>
  );
};
