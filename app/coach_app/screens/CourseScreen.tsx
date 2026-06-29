import { BottomTabBar } from '~/coach_app/components/BottomTabBar';
import { CourseHeader } from '~/coach_app/components/CourseHeader';
import { CoachImage } from '~/coach_app/components/CoachImage';
import { LessonRoadmapCard } from '~/coach_app/components/LessonRoadmapCard';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { calligraphyBasics } from '~/coach_app/data/course';

export const CourseScreen = () => (
  <ScreenShell footer={<BottomTabBar activeTab='course' />}>
    <StatusBar />

    <header className='mb-4 flex items-center gap-3 pt-1'>
      <button type='button' className='coach-icon-btn h-9 w-9 shrink-0 coach-text' aria-label='Назад'>
        <svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
          <path
            d='M9 2.5L4.5 7L9 11.5'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <h1 className='text-[20px] font-semibold tracking-[-0.02em] coach-text'>
        {calligraphyBasics.title}
      </h1>
    </header>

    <div className='mb-4 h-[120px] overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)]'>
      <CoachImage src={calligraphyBasics.coverImage} alt={calligraphyBasics.title} rounded='rounded-2xl' />
    </div>

    <CourseHeader course={calligraphyBasics} />

    <div className='flex flex-col gap-2 pb-4'>
      {calligraphyBasics.lessons.map((lesson) => (
        <LessonRoadmapCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  </ScreenShell>
);
