import type { TheoryThesis } from '~/coach_app/types';

type ThesisTagsBlockProps = {
  theses: TheoryThesis[];
};

export const ThesisTagsBlock = ({ theses }: ThesisTagsBlockProps) => (
  <div className='coach-thesis-block'>
    <p className='coach-section-label mb-3'>Основные тезисы</p>
    <div className='coach-thesis-tags'>
      {theses.map((thesis) => (
        <span key={thesis.id} className='coach-thesis-tags__item'>
          {thesis.text}
        </span>
      ))}
    </div>
  </div>
);
