import { Fragment } from 'react';

import { CoachImage } from '~/coach_app/components/CoachImage';
import type { LessonSummary } from '~/coach_app/types';

type HomeJourneyPathProps = {
  lessons: LessonSummary[];
};

const getNodeLabel = (lesson: LessonSummary) => {
  const letters: Record<string, string> = {
    'letter-a': 'А',
    'letter-b': 'Б',
    'letter-c': 'В',
    'letter-d': 'Г',
    'letter-e': 'Л',
    'letter-f': 'Р',
  };

  if (letters[lesson.id]) {
    return letters[lesson.id];
  }

  if (lesson.id.startsWith('letter-')) {
    return lesson.id.replace('letter-', '').toUpperCase();
  }

  if (lesson.id === 'intro') {
    return '1';
  }

  return lesson.title.charAt(0);
};

const getShortTitle = (lesson: LessonSummary) => {
  if (lesson.id === 'intro') {
    return 'Введение';
  }

  if (lesson.id.startsWith('letter-')) {
    return `Буква ${getNodeLabel(lesson)}`;
  }

  return lesson.title.replace('Слово: ', '');
};

const CheckIcon = () => (
  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
    <path
      d='M2.5 6L5 8.5L9.5 4'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const LockIcon = () => (
  <svg width='11' height='11' viewBox='0 0 11 11' fill='none' aria-hidden='true'>
    <rect x='2.5' y='5' width='6' height='4' rx='0.8' stroke='currentColor' strokeWidth='1.1' />
    <path
      d='M4 5V3.8C4 3 4.7 2.2 5.5 2.2C6.3 2.2 7 3 7 3.8V5'
      stroke='currentColor'
      strokeWidth='1.1'
    />
  </svg>
);

export const HomeJourneyPath = ({ lessons }: HomeJourneyPathProps) => {
  const completedCount = lessons.filter((lesson) => lesson.status === 'completed').length;

  return (
    <div className='coach-path-track coach-glass-card'>
      <div className='coach-path-track__header'>
        <div>
          <p className='coach-path-track__title'>Ваш путь</p>
          <p className='coach-path-track__subtitle'>
            {completedCount} из {lessons.length} уроков
          </p>
        </div>
        <div className='coach-path-track__meter'>
          <div
            className='coach-path-track__meter-fill'
            style={{ width: `${(completedCount / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      <div className='coach-path-track__scroll'>
        {lessons.map((lesson, index) => {
          const isLast = index === lessons.length - 1;
          const lineDone = lesson.status === 'completed';

          return (
            <Fragment key={lesson.id}>
              <div
                className={`coach-path-track__item coach-path-track__item--${lesson.status}`}
                aria-current={lesson.status === 'current' ? 'step' : undefined}
              >
                {lesson.status === 'current' && (
                  <div className='coach-path-track__preview'>
                    <CoachImage src={lesson.image} alt={lesson.title} rounded='rounded-lg' />
                  </div>
                )}

                <div className='coach-path-track__node-col'>
                  <div className='coach-path-track__node'>
                    {lesson.status === 'completed' && <CheckIcon />}
                    {lesson.status === 'current' && (
                      <span className='coach-path-track__glyph'>{getNodeLabel(lesson)}</span>
                    )}
                    {lesson.status === 'locked' && <LockIcon />}
                    {lesson.status === 'current' && (
                      <span className='coach-path-track__pulse' aria-hidden='true' />
                    )}
                  </div>

                  <p className='coach-path-track__label'>{getShortTitle(lesson)}</p>

                  {lesson.status === 'current' && (
                    <span className='coach-path-track__badge'>{lesson.progress}%</span>
                  )}
                </div>
              </div>

              {!isLast && (
                <div
                  className={`coach-path-track__connector ${lineDone ? 'coach-path-track__connector--done' : ''}`}
                  aria-hidden='true'
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
