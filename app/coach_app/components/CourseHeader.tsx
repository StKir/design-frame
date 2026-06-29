import { LessonProgressBar } from '~/coach_app/components/LessonProgressBar';
import type { Course } from '~/coach_app/types';

type CourseHeaderProps = {
  course: Course;
};

export const CourseHeader = ({ course }: CourseHeaderProps) => (
  <div className='mb-4'>
    <div className='mb-3 flex items-center justify-between text-[12px] coach-text-muted'>
      <span>{course.progress}% пройдено</span>
      <span>
        {course.lessonCount} уроков · {course.totalHours} ч
      </span>
    </div>
    <LessonProgressBar progress={course.progress} />
  </div>
);
