import { CoachImage } from '~/coach_app/components/CoachImage';
import type { CurrentLesson } from '~/coach_app/types';

type HomeContinueHeroProps = {
  lesson: CurrentLesson;
  lessonNumber: number;
  lessonTotal: number;
};

export const HomeContinueHero = ({ lesson, lessonNumber, lessonTotal }: HomeContinueHeroProps) => (
  <section className='coach-home-hero coach-glass-card overflow-hidden'>
    <div className='coach-home-hero__media'>
      <CoachImage src={lesson.image} alt={lesson.title} rounded='rounded-none' />
      <div className='coach-home-hero__gradient' aria-hidden='true' />
    </div>

    <div className='coach-home-hero__body'>
      <div className='coach-home-hero__meta'>
        <span className='coach-home-hero__badge'>Урок {lessonNumber} · {lessonTotal}</span>
        <span className='coach-home-hero__progress-text'>{lesson.progress}%</span>
      </div>

      <div className='coach-home-hero__main'>
        <span className='coach-home-hero__glyph'>{lesson.glyph}</span>
        <div>
          <p className='coach-home-hero__label'>Продолжить</p>
          <h2 className='coach-home-hero__title'>{lesson.title}</h2>
        </div>
      </div>

      <div className='coach-home-hero__bar'>
        <div className='coach-home-hero__bar-fill' style={{ width: `${lesson.progress}%` }} />
      </div>

      <button type='button' className='coach-home-hero__cta'>
        Продолжить урок
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
          <path
            d='M6 3L12 8L6 13'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  </section>
);
