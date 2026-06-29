import { coachImages } from '~/coach_app/data/images';
import type { GalleryWork } from '~/coach_app/types';

export const recentWorks: GalleryWork[] = [
  { id: '1', label: 'Буква А', image: coachImages.gallery.letterA },
  { id: '2', label: 'Наклонные штрихи', image: coachImages.gallery.letterB },
  { id: '3', label: 'Слово «Мир»', image: coachImages.gallery.hello },
];
