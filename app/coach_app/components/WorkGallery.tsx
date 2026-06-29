import { CoachImage } from '~/coach_app/components/CoachImage';
import type { GalleryWork } from '~/coach_app/types';

type WorkGalleryProps = {
  works: GalleryWork[];
};

export const WorkGallery = ({ works }: WorkGalleryProps) => {
  const [featured, ...rest] = works;

  return (
    <div className='coach-home-works'>
      {featured && (
        <div className='coach-home-works__featured coach-glass-card overflow-hidden'>
          <div className='coach-home-works__featured-media'>
            <CoachImage src={featured.image} alt={featured.label} rounded='rounded-none' />
          </div>
          <div className='coach-home-works__featured-body'>
            <p className='coach-section-label'>Последняя работа</p>
            <p className='coach-home-works__featured-title'>{featured.label}</p>
          </div>
        </div>
      )}

      <div className='coach-home-works__grid'>
        {rest.map((work) => (
          <div key={work.id} className='coach-home-works__item coach-glass-card overflow-hidden'>
            <div className='coach-home-works__item-media'>
              <CoachImage src={work.image} alt={work.label} rounded='rounded-none' />
            </div>
            <p className='coach-home-works__item-label'>{work.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
