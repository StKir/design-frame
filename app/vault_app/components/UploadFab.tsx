import { IconCamera, IconPlus, IconText, IconUpload } from '~/vault_app/components/icons';

export const UploadFab = () => (
  <div className='vault-fab-wrap'>
    <div className='vault-fab-menu'>
      <button type='button' className='vault-fab-menu__item'>
        <span className='vault-fab-menu__icon'>
          <IconCamera />
        </span>
        Фото
      </button>
      <button type='button' className='vault-fab-menu__item'>
        <span className='vault-fab-menu__icon'>
          <IconUpload />
        </span>
        Файл
      </button>
      <button type='button' className='vault-fab-menu__item'>
        <span className='vault-fab-menu__icon'>
          <IconText />
        </span>
        Текст
      </button>
    </div>
    <button type='button' className='vault-fab' aria-label='Добавить'>
      <IconPlus />
    </button>
  </div>
);
