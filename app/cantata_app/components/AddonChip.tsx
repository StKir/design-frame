import type { Addon } from '~/cantata_app/types';

type AddonChipProps = {
  addon: Addon;
  selected: boolean;
  onToggle: (id: string) => void;
};

export const AddonChip = ({ addon, selected, onToggle }: AddonChipProps) => (
  <button
    type='button'
    onClick={() => onToggle(addon.id)}
    className={`cantata-card-press relative flex min-h-[72px] flex-col items-start justify-between rounded-2xl p-4 text-left transition ${
      selected
        ? 'border border-[#4CBC89] bg-[rgba(76,188,137,0.15)]'
        : 'cantata-glass'
    }`}
  >
    {selected && (
      <span className='absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#4CBC89] text-[10px] text-white'>
        ✓
      </span>
    )}
    <span className='pr-6 text-xs font-semibold uppercase leading-tight tracking-wide text-[rgba(48,48,48,1)]'>
      {addon.name}
    </span>
    <span className='text-sm font-medium text-[rgba(48,48,48,0.6)]'>
      +{addon.price} ₽
    </span>
  </button>
);
