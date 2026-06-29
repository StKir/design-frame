type LessonHeaderProps = {
  title: string;
  badge: string;
  stepLabel?: string;
  progress: number;
};

export const LessonHeader = ({ title, badge, stepLabel, progress }: LessonHeaderProps) => (
  <header className='mb-4 pt-1'>
    <div className='mb-2 flex items-center justify-between'>
      <span className='rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] coach-text-muted'>
        {badge}
      </span>
      {stepLabel && <span className='text-[12px] coach-text-muted'>{stepLabel}</span>}
    </div>
    <h1 className='text-[20px] font-semibold tracking-[-0.02em] coach-text'>{title}</h1>
    <div className='mt-3'>
      <div className='coach-progress-bar'>
        <div className='coach-progress-bar__fill' style={{ width: `${progress}%` }} />
      </div>
    </div>
  </header>
);
