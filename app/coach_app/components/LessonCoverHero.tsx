import { CoachImage } from '~/coach_app/components/CoachImage';
import type { LessonMeta } from '~/coach_app/types';

type LessonCoverHeroProps = {
  image: string;
  meta: LessonMeta;
  progress: number;
};

export const LessonCoverHero = ({ image, meta, progress }: LessonCoverHeroProps) => (
  <section className='coach-glass-card coach-lesson-cover mb-4 overflow-hidden'>
    <div className='coach-lesson-cover__media'>
      <CoachImage src={image} alt={meta.topic} rounded='rounded-none' />
      <div className='coach-lesson-cover__gradient' aria-hidden='true' />
    </div>

    <div className='coach-lesson-cover__content'>
      <div className='coach-lesson-cover__fields'>
        <div className='coach-lesson-cover__field'>
          <span className='coach-lesson-cover__label'>Урок</span>
          <span className='coach-lesson-cover__value'>{meta.number}</span>
        </div>
        <div className='coach-lesson-cover__field'>
          <span className='coach-lesson-cover__label'>раздел</span>
          <span className='coach-lesson-cover__value'>{meta.section}</span>
        </div>
        <div className='coach-lesson-cover__field'>
          <span className='coach-lesson-cover__label'>тема</span>
          <h1 className='coach-lesson-cover__value coach-lesson-cover__value--topic'>{meta.topic}</h1>
        </div>
      </div>
      <div className='coach-lesson-cover__progress'>
        <div className='coach-progress-bar'>
          <div className='coach-progress-bar__fill' style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  </section>
);
