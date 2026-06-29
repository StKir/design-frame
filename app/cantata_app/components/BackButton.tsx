import { IconBack } from '~/cantata_app/components/icons';

type BackButtonProps = {
  onClick: () => void;
  variant?: 'ghost' | 'pill';
};

export const BackButton = ({ onClick, variant = 'ghost' }: BackButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className={`cantata-hbtn ${variant === 'pill' ? 'cantata-hbtn--pill' : 'cantata-hbtn--ghost'}`}
    aria-label='Назад'
  >
    <IconBack />
  </button>
);
