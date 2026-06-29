import { CoachImage } from '~/coach_app/components/CoachImage';
import type { TheorySection } from '~/coach_app/types';

type TheoryBlockProps = {
  section: TheorySection;
};

export const TheoryBlock = ({ section }: TheoryBlockProps) => (
  <div className='coach-glass-card overflow-hidden'>
    <div className='h-[120px]'>
      <CoachImage src={section.image} alt={section.title} rounded='rounded-none' />
    </div>
    <div className='p-4'>
      <h3 className='text-[15px] font-semibold coach-text'>{section.title}</h3>
      <p className='mt-2 text-[13px] leading-relaxed coach-text-muted'>{section.body}</p>
    </div>
  </div>
);
