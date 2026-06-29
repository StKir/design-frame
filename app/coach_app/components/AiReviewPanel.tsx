import { CoachImage } from '~/coach_app/components/CoachImage';
import type { AiReview } from '~/coach_app/types';

type AiReviewPanelProps = {
  review: AiReview;
  image: string;
};

export const AiReviewPanel = ({ review, image }: AiReviewPanelProps) => (
  <div className='coach-glass-card p-4'>
    <p className='coach-section-label'>AI-разбор</p>

    <div className='coach-upload-zone mt-3'>
      <div className='h-[140px]'>
        <CoachImage src={image} alt='Загруженная работа' rounded='rounded-xl' />
      </div>
      <p className='py-3 text-center text-[11px] coach-text-faint'>Фото практического листа</p>
    </div>

    <div className='mt-4 rounded-xl border border-[rgba(0,0,0,0.06)] bg-[#FAFAF9] p-4'>
      <div className='flex items-baseline gap-2'>
        <span className='text-[26px] font-semibold tracking-[-0.02em] coach-text'>
          {review.score}/{review.maxScore}
        </span>
        <span className='text-[12px] coach-text-muted'>оценка</span>
      </div>
      <ul className='mt-3 space-y-2'>
        {review.feedback.map((item) => (
          <li
            key={item.id}
            className={`text-[12px] ${item.positive ? 'coach-text' : 'coach-text-faint'}`}
          >
            {item.positive ? '✓' : '✗'} {item.text}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
