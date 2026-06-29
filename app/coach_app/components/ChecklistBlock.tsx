import type { TheoryChecklistItem } from '~/coach_app/types';

type ChecklistBlockProps = {
  title?: string;
  items: TheoryChecklistItem[];
};

export const ChecklistBlock = ({ title = 'Перед практикой', items }: ChecklistBlockProps) => (
  <div className='coach-glass-card p-4'>
    <p className='coach-section-label mb-3'>{title}</p>
    <ul className='coach-checklist'>
      {items.map((item) => (
        <li key={item.id} className='coach-checklist__item'>
          <span
            className={`coach-checklist__mark ${item.checked ? 'coach-checklist__mark--done' : ''}`}
            aria-hidden='true'
          >
            {item.checked ? '✓' : ''}
          </span>
          <span className={item.checked ? 'coach-text-muted line-through' : 'coach-text'}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
