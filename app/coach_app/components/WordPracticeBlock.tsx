import type { WordPractice } from '~/coach_app/types';

type WordPracticeBlockProps = {
  practice: WordPractice;
};

export const WordPracticeBlock = ({ practice }: WordPracticeBlockProps) => (
  <div className='coach-glass-card p-4'>
    <p className='coach-section-label mb-3'>Практика слова</p>
    <p className='mb-3 text-center text-[36px] font-semibold leading-none coach-text'>{practice.word}</p>
    <div className='coach-word-letters'>
      {practice.letters.map((letter, index) => {
        const isActive = index === practice.activeIndex;
        const isDone = index < practice.activeIndex;

        return (
          <div
            key={`${letter}-${index}`}
            className={`coach-word-letters__cell ${
              isActive ? 'coach-word-letters__cell--active' : ''
            } ${isDone ? 'coach-word-letters__cell--done' : ''}`}
          >
            <span className='text-[22px] font-semibold'>{letter}</span>
            {isActive && <span className='coach-word-letters__badge'>Сейчас</span>}
          </div>
        );
      })}
    </div>
  </div>
);
