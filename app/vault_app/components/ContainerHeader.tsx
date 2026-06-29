import { IconChevronLeft, IconMore } from '~/vault_app/components/icons';

type ContainerHeaderProps = {
  title: string;
  subtitle?: string;
};

export const ContainerHeader = ({ title, subtitle }: ContainerHeaderProps) => (
  <div className='vault-drive-header'>
    <div className='vault-drive-header__top'>
      <button type='button' className='vault-icon-btn' aria-label='Назад'>
        <IconChevronLeft />
      </button>
      <div className='vault-drive-header__title-wrap'>
        <h1 className='vault-drive-header__title'>{title}</h1>
        {subtitle && <p className='vault-drive-header__subtitle'>{subtitle}</p>}
      </div>
      <div className='vault-drive-header__actions'>
        <button type='button' className='vault-icon-btn' aria-label='Ещё'>
          <IconMore />
        </button>
      </div>
    </div>
  </div>
);
