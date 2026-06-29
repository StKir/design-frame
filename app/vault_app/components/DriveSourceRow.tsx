import { IconMore } from '~/vault_app/components/icons';
import type { Source } from '~/vault_app/types';

type DriveSourceRowProps = {
  source: Source;
};

const PdfIcon = () => (
  <div className='vault-drive-icon vault-drive-icon--pdf'>
    <span className='vault-drive-icon__badge'>PDF</span>
  </div>
);

const TextIcon = () => (
  <div className='vault-drive-icon vault-drive-icon--text'>T</div>
);

export const DriveSourceRow = ({ source }: DriveSourceRowProps) => {
  const renderIcon = () => {
    if (source.type === 'photo' && source.thumbnail) {
      return <img src={source.thumbnail} alt='' className='vault-drive-thumb' />;
    }
    if (source.type === 'text') {
      return <TextIcon />;
    }
    return <PdfIcon />;
  };

  const renderSubtitle = () => {
    if (source.type === 'pdf') {
      return `${source.fileSize} · ${source.date}`;
    }
    if (source.type === 'photo') {
      return `${source.meta} · ${source.date}`;
    }
    if (source.excerpt) {
      return source.excerpt;
    }
    return source.date;
  };

  return (
    <div className='vault-drive-row'>
      <div className='vault-drive-row__icon'>{renderIcon()}</div>
      <div className='vault-drive-row__body'>
        <div className='vault-drive-row__title'>{source.title}</div>
        <div className='vault-drive-row__meta vault-tabular'>{renderSubtitle()}</div>
      </div>
      <button type='button' className='vault-icon-btn vault-icon-btn--sm vault-drive-row__more' aria-label='Действия'>
        <IconMore />
      </button>
    </div>
  );
};
