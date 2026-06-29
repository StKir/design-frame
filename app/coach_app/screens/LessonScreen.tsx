import { ChecklistBlock } from '~/coach_app/components/ChecklistBlock';
import { LessonCoverHero } from '~/coach_app/components/LessonCoverHero';
import { LessonSubnav } from '~/coach_app/components/LessonSubnav';
import { MistakeCompare } from '~/coach_app/components/MistakeCompare';
import { PrimaryButton } from '~/coach_app/components/PrimaryButton';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { StrokeOrderBlock } from '~/coach_app/components/StrokeOrderBlock';
import { TerminologyGrid } from '~/coach_app/components/TerminologyGrid';
import { TheoryBlock } from '~/coach_app/components/TheoryBlock';
import { ThesisTagsBlock } from '~/coach_app/components/ThesisTagsBlock';
import { TipCallout } from '~/coach_app/components/TipCallout';
import { VideoPreviewBlock } from '~/coach_app/components/VideoPreviewBlock';
import { uppercaseLetterA } from '~/coach_app/data/lesson';

export const LessonScreen = () => {
  const lesson = uppercaseLetterA;

  return (
    <ScreenShell>
      <StatusBar />

      <LessonCoverHero
        image={lesson.coverImage}
        meta={lesson.meta}
        progress={lesson.progress}
      />

      <p className='mb-4 text-[13px] leading-relaxed coach-text-muted'>{lesson.technique}</p>

      <section className='mb-4'>
        <ThesisTagsBlock theses={lesson.theoryTheses} />
      </section>

      <section className='mb-4 space-y-3'>
        <h2 className='coach-section-label'>Теория</h2>
        {lesson.theorySections.map((section) => (
          <TheoryBlock key={section.id} section={section} />
        ))}
      </section>

      <section className='mb-4'>
        <h2 className='coach-section-label mb-3'>Термины</h2>
        <TerminologyGrid terms={lesson.theoryTerms} />
      </section>

      <section className='mb-4'>
        <StrokeOrderBlock steps={lesson.strokeOrder} />
      </section>

      <section className='mb-4'>
        <VideoPreviewBlock video={lesson.theoryVideo} />
      </section>

      <section className='mb-4'>
        <TipCallout tip={lesson.theoryTip} />
      </section>

      <section className='mb-4'>
        <ChecklistBlock items={lesson.theoryChecklist} />
      </section>

      <section className='mb-4'>
        <h2 className='coach-section-label mb-3'>Типичные ошибки</h2>
        <MistakeCompare mistakes={lesson.mistakes} />
      </section>

      <LessonSubnav active='theory' />

      <div className='pb-8 pt-4'>
        <PrimaryButton>Перейти к практике</PrimaryButton>
      </div>
    </ScreenShell>
  );
};
