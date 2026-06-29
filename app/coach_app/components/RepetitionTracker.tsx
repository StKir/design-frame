import type { RepetitionGoal } from '~/coach_app/types';

type RepetitionTrackerProps = {
  goal: RepetitionGoal;
};

export const RepetitionTracker = ({ goal }: RepetitionTrackerProps) => {
  const progress = Math.round((goal.current / goal.target) * 100);

  return (
    <div className='coach-glass-card p-4'>
      <div className='flex items-center justify-between'>
        <p className='text-[14px] font-medium coach-text'>{goal.label}</p>
        <p className='text-[13px] font-semibold coach-text'>
          {goal.current}
          <span className='coach-text-faint'> / {goal.target}</span>
        </p>
      </div>
      <div className='coach-rep-dots mt-3'>
        {Array.from({ length: goal.target }, (_, i) => (
          <span
            key={i}
            className={`coach-rep-dots__dot ${i < goal.current ? 'coach-rep-dots__dot--filled' : ''}`}
          />
        ))}
      </div>
      <div className='coach-progress-bar mt-3'>
        <div className='coach-progress-bar__fill' style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
