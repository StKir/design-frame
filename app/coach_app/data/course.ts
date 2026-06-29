import { coachImages, getLessonImage } from '~/coach_app/data/images';
import type { Course } from '~/coach_app/types';

export const calligraphyBasics: Course = {
  id: 'calligraphy-basics',
  title: 'Основы каллиграфии',
  progress: 21,
  lessonCount: 8,
  totalHours: 3,
  coverImage: coachImages.courseHero,
  lessons: [
    { id: 'intro', title: 'Инструменты и посадка', status: 'completed', progress: 100, image: getLessonImage('intro') },
    { id: 'letter-a', title: 'Большая буква А', status: 'current', progress: 70, image: getLessonImage('letter-a') },
    { id: 'letter-b', title: 'Большая буква Б', status: 'locked', progress: 0, image: getLessonImage('letter-b') },
    { id: 'letter-c', title: 'Большая буква В', status: 'locked', progress: 0, image: getLessonImage('letter-c') },
    { id: 'letter-d', title: 'Большая буква Г', status: 'locked', progress: 0, image: getLessonImage('letter-d') },
    { id: 'letter-e', title: 'Связки А-Л-М', status: 'locked', progress: 0, image: getLessonImage('letter-e') },
    { id: 'letter-f', title: 'Ритм строки', status: 'locked', progress: 0, image: getLessonImage('letter-f') },
    { id: 'word-hello', title: 'Слово: МИР', status: 'locked', progress: 0, image: getLessonImage('word-hello') },
  ],
};
