import { IconGridView, IconListView, IconSort } from '~/vault_app/components/icons';

type DriveToolbarProps = {
  count: number;
};

export const DriveToolbar = ({ count }: DriveToolbarProps) => (
  <div className='vault-drive-toolbar'>
    <span className='vault-drive-toolbar__count vault-tabular'>
      {count} {count === 1 ? 'файл' : count < 5 ? 'файла' : 'файлов'}
    </span>
    <div className='vault-drive-toolbar__actions'>
      <button type='button' className='vault-icon-btn vault-icon-btn--sm' aria-label='Сортировка'>
        <IconSort />
      </button>
      <button type='button' className='vault-icon-btn vault-icon-btn--sm vault-icon-btn--active' aria-label='Список'>
        <IconListView />
      </button>
      <button type='button' className='vault-icon-btn vault-icon-btn--sm' aria-label='Сетка'>
        <IconGridView />
      </button>
    </div>
  </div>
);
