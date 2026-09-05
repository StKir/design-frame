export type DrawingPath = {
  d: string;
  transform?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  duration?: number;
};

export type TutorialStep = {
  id: string;
  name: string;
  body: string;
  description: string;
  duration?: number;
  paths: DrawingPath[];
};

export type Tutorial = {
  id: string;
  title: string;
  subtitle: string;
  kicker: string;
  featured: boolean;
  viewBox: string;
  steps: TutorialStep[];
};

const modules = import.meta.glob('../tutorials/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Tutorial>;

export const tutorials = Object.values(modules).sort(
  (left, right) => Number(right.featured) - Number(left.featured),
);

export const getTutorial = (id: string) =>
  tutorials.find((tutorial) => tutorial.id === id) ?? tutorials[0];
