import { CoachImage } from '~/coach_app/components/CoachImage';
import type { FormQuiz } from '~/coach_app/types';

type FormQuizBlockProps = {
  quiz: FormQuiz;
};

export const FormQuizBlock = ({ quiz }: FormQuizBlockProps) => (
  <div className='coach-glass-card p-4'>
    <p className='text-[14px] font-medium coach-text'>{quiz.question}</p>
    <div className='coach-quiz-options mt-3'>
      {quiz.options.map((option) => (
        <div
          key={option.id}
          className='coach-quiz-options__item'
        >
          <div className='coach-quiz-options__thumb'>
            <CoachImage src={option.image} alt={option.label} rounded='rounded-md' />
          </div>
          <span className='coach-quiz-options__label'>{option.label}</span>
        </div>
      ))}
    </div>
  </div>
);
