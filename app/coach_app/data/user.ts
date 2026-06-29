import { coachImages } from '~/coach_app/data/images';
import type { CurrentLesson, DailyChallenge, UserProfile } from '~/coach_app/types';

export const userProfile: UserProfile = {
  name: 'Кирилл',
  level: 7,
  streak: 12,
  overallProgress: 21,
};

export const currentLesson: CurrentLesson = {
  title: 'Большая буква А',
  glyph: 'А',
  progress: 70,
  image: coachImages.currentLesson,
  lessonNumber: 2,
};

export const dailyChallenge: DailyChallenge = {
  task: 'Напишите слово «Мир» с ровным наклоном и одинаковыми интервалами',
  xp: 50,
  image: coachImages.challenge,
};
