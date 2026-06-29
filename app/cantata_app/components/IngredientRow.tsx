import type { Addon } from '~/cantata_app/types';

type IngredientRowProps = {
  addon: Addon;
  selected: boolean;
  onToggle: (id: string) => void;
};

export const IngredientRow = ({ addon, selected, onToggle }: IngredientRowProps) => (
  <button
    type='button'
    onClick={() => onToggle(addon.id)}
    className='cantata-ingrow w-full text-left'
  >
    <span className='cantata-ingrow__nm'>{addon.name}</span>
    {addon.price === 0 ? (
      <span className='cantata-ingrow__free'>Бесплатно</span>
    ) : (
      <span className='cantata-ingrow__price'>+{addon.price} ₽</span>
    )}
    <span
      className={`flex h-[25px] w-[25px] items-center justify-center rounded-[7px] border text-xs ${
        selected
          ? 'border-[var(--cinnamon)] bg-[var(--cinnamon)] text-white'
          : 'border-[var(--line-md)] bg-[var(--bg-cream)] text-[var(--text-sub)]'
      }`}
    >
      {selected ? '✓' : '+'}
    </span>
  </button>
);
