import { PhoneFrame } from '~/components/phone-frame';

import { CourseScreen } from '~/coach_app/screens/CourseScreen';
import { ExerciseBlocksScreen } from '~/coach_app/screens/ExerciseBlocksScreen';
import { ExerciseScreen } from '~/coach_app/screens/ExerciseScreen';
import { HomeScreen } from '~/coach_app/screens/HomeScreen';
import { LessonChatScreen } from '~/coach_app/screens/LessonChatScreen';
import { LessonScreen } from '~/coach_app/screens/LessonScreen';
import { MiniTestScreen } from '~/coach_app/screens/MiniTestScreen';
import { ProfileScreen } from '~/coach_app/screens/ProfileScreen';

import './coach.css';

export const CoachFrame = () => (
  <div className='coach-root coach-showcase grid grid-cols-2 gap-10'>
    <PhoneFrame label='Главная'>
      <HomeScreen />
    </PhoneFrame>
    <PhoneFrame label='Курс'>
      <CourseScreen />
    </PhoneFrame>
    <PhoneFrame label='Урок · Теория'>
      <LessonScreen />
    </PhoneFrame>
    <PhoneFrame label='Упражнение'>
      <ExerciseScreen />
    </PhoneFrame>
    <PhoneFrame label='Типы упражнений'>
      <ExerciseBlocksScreen />
    </PhoneFrame>
    <PhoneFrame label='Мини-тест'>
      <MiniTestScreen />
    </PhoneFrame>
    <PhoneFrame label='AI Чат'>
      <LessonChatScreen />
    </PhoneFrame>
    <PhoneFrame label='Профиль'>
      <ProfileScreen />
    </PhoneFrame>
  </div>
);
