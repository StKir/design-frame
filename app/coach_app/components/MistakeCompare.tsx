import { CoachImage } from '~/coach_app/components/CoachImage';
import type { MistakeExample } from '~/coach_app/types';

type MistakeCompareProps = {
  mistakes: MistakeExample[];
};

export const MistakeCompare = ({ mistakes }: MistakeCompareProps) => (
  <div className='grid grid-cols-3 gap-2'>
    {mistakes.map((mistake) => (
      <div
        key={mistake.id}
        className={`overflow-hidden rounded-xl border ${
          mistake.correct ? 'border-[rgba(0,0,0,0.14)]' : 'border-[rgba(0,0,0,0.06)]'
        }`}
      >
        <div className='h-[72px]'>
          <CoachImage
            src={mistake.image}
            alt={mistake.label}
            rounded='rounded-none'
            objectPosition={mistake.objectPosition}
            className={mistake.correct ? '' : 'opacity-70'}
          />
        </div>
        <p className='px-2 py-2 text-center text-[9px] leading-tight coach-text-muted'>
          {mistake.correct ? '✓' : '✗'} {mistake.label}
        </p>
      </div>
    ))}
  </div>
);
