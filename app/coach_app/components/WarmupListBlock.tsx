import type { WarmupStroke } from '~/coach_app/types';

type WarmupListBlockProps = {
  strokes: WarmupStroke[];
};

export const WarmupListBlock = ({ strokes }: WarmupListBlockProps) => (
  <div className='coach-glass-card p-4'>
    <p className='coach-section-label mb-3'>Разминочные штрихи</p>
    <ul className='coach-warmup-list'>
      {strokes.map((stroke) => (
        <li key={stroke.id} className='coach-warmup-list__item'>
          <span className='coach-warmup-list__name'>{stroke.name}</span>
          <span className='coach-warmup-list__count'>×{stroke.count}</span>
        </li>
      ))}
    </ul>
  </div>
);
