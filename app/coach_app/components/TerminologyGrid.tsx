import type { TheoryTerm } from '~/coach_app/types';

type TerminologyGridProps = {
  terms: TheoryTerm[];
};

export const TerminologyGrid = ({ terms }: TerminologyGridProps) => (
  <div className='coach-terminology-grid'>
    {terms.map((item) => (
      <div key={item.id} className='coach-terminology-grid__item'>
        <p className='coach-terminology-grid__term'>{item.term}</p>
        <p className='coach-terminology-grid__def'>{item.definition}</p>
      </div>
    ))}
  </div>
);
