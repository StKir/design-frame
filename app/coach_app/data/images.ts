const img = (id: string, width = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const coachImages = {
  fallback:
    'https://avatars.mds.yandex.net/i?id=6a6d63ce5147d7f67c4eacd47d6b6ae4_l-5228110-images-thumbs&n=13',
  avatar: img('1500648767791-00dcc994a43e', 400),
  courseHero: img('1455390582262-044cdead277a', 900),
  currentLesson: img('1517971071642-34a2d3ecc9cd', 900),
  challenge: img('1491841550275-ad7854e35ca6', 600),
  lessonDemo: img('1517971129774-8a2b38fa128e', 900),
  practice: img('1517842645767-c639042777db', 900),
  aiReviewUpload: img('1455390582262-044cdead277a', 900),
  gallery: {
    letterA: img('1517971129774-8a2b38fa128e', 400),
    letterB: img('1517971071642-34a2d3ecc9cd', 400),
    hello: img('1455390582262-044cdead277a', 400),
  },
  lessons: {
    intro: img('1491841550275-ad7854e35ca6', 400),
    'letter-a': img('1517971129774-8a2b38fa128e', 400),
    'letter-b': img('1517971071642-34a2d3ecc9cd', 400),
    'letter-c': img('1455390582262-044cdead277a', 400),
    'letter-d': img('1517842645767-c639042777db', 400),
    'letter-e': img('1491841550275-ad7854e35ca6', 400),
    'letter-f': img('1517971129774-8a2b38fa128e', 400),
    'word-hello': img('1517971071642-34a2d3ecc9cd', 400),
  },
  buildSteps: [
    img('1455390582262-044cdead277a', 300),
    img('1517971129774-8a2b38fa128e', 300),
    img('1517842645767-c639042777db', 300),
  ],
  mistakes: [
    { src: img('1491841550275-ad7854e35ca6', 300), position: '35% 45%' },
    { src: img('1517971071642-34a2d3ecc9cd', 300), position: '55% 50%' },
    { src: img('1517971129774-8a2b38fa128e', 300), position: 'center' },
  ],
} as const;

export const getLessonImage = (lessonId: string) =>
  coachImages.lessons[lessonId as keyof typeof coachImages.lessons] ?? coachImages.fallback;
