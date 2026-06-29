import { IconArrowLeft } from '~/pay_app/components/icons';

type BackButtonProps = {
  label?: string;
};

export const BackButton = ({ label = 'Назад' }: BackButtonProps) => (
  <button type='button' className='pay-btn-back' aria-label={label}>
    <IconArrowLeft />
  </button>
);
