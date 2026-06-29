import { FormQuizBlock } from '~/coach_app/components/FormQuizBlock';
import { LessonHeader } from '~/coach_app/components/LessonHeader';
import { LessonSubnav } from '~/coach_app/components/LessonSubnav';
import { RepetitionTracker } from '~/coach_app/components/RepetitionTracker';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { TimerDrillBlock } from '~/coach_app/components/TimerDrillBlock';
import { TraceTemplateBlock } from '~/coach_app/components/TraceTemplateBlock';
import { WarmupListBlock } from '~/coach_app/components/WarmupListBlock';
import { WordPracticeBlock } from '~/coach_app/components/WordPracticeBlock';
import {
  formQuiz,
  repetitionGoal,
  timerDrill,
  traceTemplate,
  warmupStrokes,
  wordPractice,
} from '~/coach_app/data/exerciseBlocks';
import { uppercaseLetterA } from '~/coach_app/data/lesson';

export const ExerciseBlocksScreen = () => {
  const lesson = uppercaseLetterA;

  return (
    <ScreenShell>
      <StatusBar />

      <LessonHeader
        title={lesson.title}
        badge='Типы упражнений'
        progress={lesson.progress}
      />

      <section className='mb-4 space-y-3'>
        <h2 className='coach-section-label'>Обводка</h2>
        <TraceTemplateBlock template={traceTemplate} />
      </section>

      <section className='mb-4 space-y-3'>
        <h2 className='coach-section-label'>Таймер</h2>
        <TimerDrillBlock drill={timerDrill} />
      </section>

      <section className='mb-4 space-y-3'>
        <h2 className='coach-section-label'>Повторы</h2>
        <RepetitionTracker goal={repetitionGoal} />
      </section>

      <section className='mb-4 space-y-3'>
        <h2 className='coach-section-label'>Слово</h2>
        <WordPracticeBlock practice={wordPractice} />
      </section>

      <section className='mb-4 space-y-3'>
        <h2 className='coach-section-label'>Мини-квиз</h2>
        <FormQuizBlock quiz={formQuiz} />
      </section>

      <section className='mb-4 space-y-3'>
        <h2 className='coach-section-label'>Разминка</h2>
        <WarmupListBlock strokes={warmupStrokes} />
      </section>

      <LessonSubnav active='exercise' />

      <div className='pb-8' />
    </ScreenShell>
  );
};
