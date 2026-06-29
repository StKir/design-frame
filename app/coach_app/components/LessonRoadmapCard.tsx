import { CoachImage } from '~/coach_app/components/CoachImage';
import { LessonProgressBar } from '~/coach_app/components/LessonProgressBar';
import type { LessonSummary } from '~/coach_app/types';

type LessonRoadmapCardProps = {
  lesson: LessonSummary;
};

const statusIcon = (status: LessonSummary['status']) => {
  if (status === 'completed') {
    return (
      <div className='flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(0,0,0,0.12)] coach-text'>
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
          <path
            d='M2.5 6L5 8.5L9.5 4'
            stroke='currentColor'
            strokeWidth='1.3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    );
  }

  if (status === 'current') {
    return (
      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1C1E]'>
        <svg width='8' height='8' viewBox='0 0 8 8' fill='white' aria-hidden='true'>
          <path d='M1.5 1L7 4L1.5 7V1Z' />
        </svg>
      </div>
    );
  }

  return (
    <div className='flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] coach-text-faint'>
      <svg width='10' height='10' viewBox='0 0 10 10' fill='none' aria-hidden='true'>
        <rect x='2.5' y='4.5' width='5' height='4' rx='0.5' stroke='currentColor' strokeWidth='1' />
        <path
          d='M3.5 4.5V3.5C3.5 2.7 4.2 2 5 2C5.8 2 6.5 2.7 6.5 3.5V4.5'
          stroke='currentColor'
          strokeWidth='1'
        />
      </svg>
    </div>
  );
};

export const LessonRoadmapCard = ({ lesson }: LessonRoadmapCardProps) => {
  const isLocked = lesson.status === 'locked';

  return (
    <div className={`coach-glass-card p-3 ${isLocked ? 'opacity-45' : ''}`}>
      <div className='flex items-center gap-3'>
        <div className='h-11 w-11 shrink-0 overflow-hidden rounded-lg'>
          <CoachImage src={lesson.image} alt={lesson.title} rounded='rounded-lg' />
        </div>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center gap-2'>
            {statusIcon(lesson.status)}
            <p className='truncate text-[14px] font-medium coach-text'>{lesson.title}</p>
          </div>
          {!isLocked && (
            <p className='mt-0.5 text-[11px] coach-text-muted'>{lesson.progress}%</p>
          )}
        </div>
        {isLocked && (
          <span className='text-[10px] uppercase tracking-[0.1em] coach-text-faint'>Скоро</span>
        )}
      </div>
      {!isLocked && (
        <div className='mt-3'>
          <LessonProgressBar progress={lesson.progress} />
        </div>
      )}
    </div>
  );
};
