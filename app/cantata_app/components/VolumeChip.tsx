type VolumeChipProps = {
  volume: number;
  price: number;
  selected: boolean;
  onSelect: (volume: number) => void;
};

export const VolumeChip = ({ volume, price, selected, onSelect }: VolumeChipProps) => (
  <button
    type='button'
    onClick={() => onSelect(volume)}
    className={`cantata-vchip ${selected ? 'cantata-vchip--on' : ''}`}
  >
    <span>{volume} мл</span>
    <span className='cantata-vchip__ml'>{price} ₽</span>
  </button>
);
