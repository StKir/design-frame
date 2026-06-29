import { CoachImage } from '~/coach_app/components/CoachImage';
import type { StrokeOrderStep } from '~/coach_app/types';

type StrokeOrderBlockProps = {
  steps: StrokeOrderStep[];
};

export const StrokeOrderBlock = ({ steps }: StrokeOrderBlockProps) => (
  <div className='coach-glass-card p-4'>
    <p className='coach-section-label mb-3'>Порядок штрихов</p>
    <div className='coach-stroke-order'>
      {steps.map((step, index) => (
        <div key={step.id} className='coach-stroke-order__step'>
          <div className='coach-stroke-order__num'>{index + 1}</div>
          <div className='coach-stroke-order__thumb'>
            <CoachImage src={step.image} alt={step.label} rounded='rounded-lg' />
          </div>
          <p className='coach-stroke-order__label'>{step.label}</p>
        </div>
      ))}
    </div>
  </div>
);
