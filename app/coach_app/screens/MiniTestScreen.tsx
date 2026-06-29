import { LessonHeader } from '~/coach_app/components/LessonHeader';
import { LessonSubnav } from '~/coach_app/components/LessonSubnav';
import { MiniTestBlock } from '~/coach_app/components/MiniTestBlock';
import { PrimaryButton } from '~/coach_app/components/PrimaryButton';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { miniTestQuestions } from '~/coach_app/data/exerciseBlocks';
import { uppercaseLetterA } from '~/coach_app/data/lesson';

export const MiniTestScreen = () => {
  const lesson = uppercaseLetterA;

  return (
    <ScreenShell>
      <StatusBar />

      <LessonHeader
        title={lesson.title}
        badge='Мини-тест'
        stepLabel='4 вопроса'
        progress={lesson.progress}
      />

      <p className='mb-4 text-[13px] leading-relaxed coach-text-muted'>
        Проверьте, что вы запомнили ключевые правила перед практикой. Выберите один вариант в каждом вопросе.
      </p>

      <MiniTestBlock questions={miniTestQuestions} />

      <LessonSubnav active='exercise' />

      <div className='pb-8 pt-4'>
        <PrimaryButton>Завершить тест</PrimaryButton>
      </div>
    </ScreenShell>
  );
};
