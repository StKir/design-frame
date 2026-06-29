import type { MiniTestQuestion } from '~/coach_app/types';

type MiniTestBlockProps = {
  questions: MiniTestQuestion[];
};

export const MiniTestBlock = ({ questions }: MiniTestBlockProps) => (
  <div className='coach-mini-test'>
    {questions.map((item, index) => (
      <section key={item.id} className='coach-mini-test__card coach-glass-card'>
        <div className='coach-mini-test__head'>
          <span className='coach-mini-test__number'>{index + 1}</span>
          <p className='coach-mini-test__question'>{item.question}</p>
        </div>

        <div className='coach-mini-test__tags'>
          {item.options.map((option) => (
            <span key={option.id} className='coach-mini-test__tag'>
              {option.text}
            </span>
          ))}
        </div>
      </section>
    ))}
  </div>
);
