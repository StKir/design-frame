type LessonProgressBarProps = {
  progress: number;
  className?: string;
};

export const LessonProgressBar = ({ progress, className = '' }: LessonProgressBarProps) => (
  <div className={`coach-progress-bar ${className}`}>
    <div className='coach-progress-bar__fill' style={{ width: `${progress}%` }} />
  </div>
);
