import { CoachImage } from '~/coach_app/components/CoachImage';
import type { ExerciseStep } from '~/coach_app/types';

type ExerciseGuideProps = {
  steps: ExerciseStep[];
  activeIndex?: number;
};

export const ExerciseGuide = ({ steps, activeIndex = 0 }: ExerciseGuideProps) => (
  <div className='space-y-2'>
    {steps.map((step, index) => {
      const isActive = index === activeIndex;
      const isDone = index < activeIndex;

      return (
        <div
          key={step.id}
          className={`coach-glass-card p-3 ${isActive ? 'ring-1 ring-[rgba(0,0,0,0.12)]' : ''} ${isDone ? 'opacity-60' : ''}`}
        >
          <div className='flex gap-3'>
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                isActive ? 'bg-[#1C1C1E] text-white' : 'border border-[rgba(0,0,0,0.1)] coach-text-muted'
              }`}
            >
              {isDone ? '✓' : index + 1}
            </div>
            <div className='min-w-0 flex-1'>
              <p className='text-[14px] font-medium coach-text'>{step.title}</p>
              <p className='mt-1 text-[12px] leading-relaxed coach-text-muted'>{step.description}</p>
              <p className='mt-2 text-[11px] coach-text-faint'>Совет: {step.tip}</p>
            </div>
            <div className='h-14 w-14 shrink-0 overflow-hidden rounded-lg'>
              <CoachImage src={step.image} alt={step.title} rounded='rounded-lg' />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
