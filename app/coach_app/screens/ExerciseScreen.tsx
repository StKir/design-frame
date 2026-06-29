import { CoachImage } from '~/coach_app/components/CoachImage';
import { ExerciseGuide } from '~/coach_app/components/ExerciseGuide';
import { LessonHeader } from '~/coach_app/components/LessonHeader';
import { LessonSubnav } from '~/coach_app/components/LessonSubnav';
import { PhotoUploadZone } from '~/coach_app/components/PhotoUploadZone';
import { PrimaryButton } from '~/coach_app/components/PrimaryButton';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { uppercaseLetterA } from '~/coach_app/data/lesson';

export const ExerciseScreen = () => {
  const lesson = uppercaseLetterA;

  return (
    <ScreenShell>
      <StatusBar />

      <LessonHeader
        title={lesson.title}
        badge='Упражнение'
        stepLabel={`${lesson.currentStep} из ${lesson.totalSteps} шагов`}
        progress={lesson.progress}
      />

      <section className='mb-4'>
        <h2 className='coach-section-label mb-3'>Пошаговая практика</h2>
        <ExerciseGuide steps={lesson.exerciseSteps} activeIndex={1} />
      </section>

      <section className='coach-glass-card mb-4 overflow-hidden'>
        <div className='h-[100px]'>
          <CoachImage src={lesson.practiceImage} alt='Образец для практики' rounded='rounded-none' />
        </div>
        <div className='p-4'>
          <p className='coach-section-label'>Задание</p>
          <p className='mt-2 text-[15px] font-medium coach-text'>{lesson.practiceTask}</p>
        </div>
      </section>

      <section className='mb-4'>
        <h2 className='coach-section-label mb-3'>Проверка работы</h2>
        <PhotoUploadZone />
        <div className='mt-3'>
          <PrimaryButton>Отправить на проверку</PrimaryButton>
        </div>
      </section>

      <LessonSubnav active='exercise' />

      <div className='pb-8' />
    </ScreenShell>
  );
};
