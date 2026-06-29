import type { TimerDrill } from '~/coach_app/types';

type TimerDrillBlockProps = {
  drill: TimerDrill;
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const TimerDrillBlock = ({ drill }: TimerDrillBlockProps) => (
  <div className='coach-glass-card p-4'>
    <div className='flex items-start justify-between gap-3'>
      <div>
        <p className='text-[14px] font-medium coach-text'>{drill.title}</p>
        <p className='mt-1 text-[12px] leading-relaxed coach-text-muted'>{drill.instruction}</p>
      </div>
      <div className='coach-timer-ring'>
        <span className='coach-timer-ring__value'>{formatTime(drill.durationSeconds)}</span>
      </div>
    </div>
    <div className='coach-timer-bar mt-3'>
      <div className='coach-timer-bar__fill' style={{ width: '0%' }} />
    </div>
  </div>
);
