import { CoachImage } from '~/coach_app/components/CoachImage';
import type { TraceTemplate } from '~/coach_app/types';

type TraceTemplateBlockProps = {
  template: TraceTemplate;
};

export const TraceTemplateBlock = ({ template }: TraceTemplateBlockProps) => (
  <div className='coach-glass-card overflow-hidden'>
    <div className='coach-trace-zone'>
      <CoachImage src={template.templateImage} alt={template.title} rounded='rounded-none' />
      <div
        className='coach-trace-zone__overlay'
        style={{ opacity: template.opacity }}
        aria-hidden='true'
      />
      <span className='coach-trace-zone__hint'>Обводите здесь</span>
    </div>
    <div className='p-4'>
      <p className='text-[14px] font-medium coach-text'>{template.title}</p>
      <p className='mt-1 text-[12px] leading-relaxed coach-text-muted'>{template.description}</p>
    </div>
  </div>
);
