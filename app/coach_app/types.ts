export type LessonStatus = 'completed' | 'current' | 'locked';

export type LessonSummary = {
  id: string;
  title: string;
  status: LessonStatus;
  progress: number;
  image: string;
};

export type Course = {
  id: string;
  title: string;
  progress: number;
  lessonCount: number;
  totalHours: number;
  coverImage: string;
  lessons: LessonSummary[];
};

export type TheorySection = {
  id: string;
  title: string;
  body: string;
  image: string;
};

export type TheoryThesis = {
  id: string;
  text: string;
};

export type TheoryTip = {
  id: string;
  text: string;
};

export type TheoryTerm = {
  id: string;
  term: string;
  definition: string;
};

export type TheoryChecklistItem = {
  id: string;
  text: string;
  checked?: boolean;
};

export type StrokeOrderStep = {
  id: string;
  label: string;
  image: string;
};

export type TheoryVideo = {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
};

export type ExerciseStep = {
  id: string;
  title: string;
  description: string;
  tip: string;
  image: string;
};

export type TraceTemplate = {
  id: string;
  title: string;
  description: string;
  templateImage: string;
  opacity: number;
};

export type TimerDrill = {
  id: string;
  title: string;
  durationSeconds: number;
  instruction: string;
};

export type RepetitionGoal = {
  id: string;
  target: number;
  current: number;
  label: string;
};

export type WordPractice = {
  id: string;
  word: string;
  letters: string[];
  activeIndex: number;
};

export type FormQuizOption = {
  id: string;
  label: string;
  image: string;
  correct: boolean;
};

export type FormQuiz = {
  id: string;
  question: string;
  options: FormQuizOption[];
};

export type MiniTestOption = {
  id: string;
  text: string;
  correct: boolean;
};

export type MiniTestQuestion = {
  id: string;
  question: string;
  options: MiniTestOption[];
};

export type WarmupStroke = {
  id: string;
  name: string;
  count: number;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
};

export type MistakeExample = {
  id: string;
  label: string;
  correct: boolean;
  image: string;
  objectPosition?: string;
};

export type AiFeedbackItem = {
  id: string;
  text: string;
  positive: boolean;
};

export type AiReview = {
  score: number;
  maxScore: number;
  feedback: AiFeedbackItem[];
};

export type GalleryWork = {
  id: string;
  label: string;
  image: string;
};

export type LessonMeta = {
  number: number;
  section: string;
  topic: string;
};

export type LessonDetail = {
  id: string;
  title: string;
  meta: LessonMeta;
  currentStep: number;
  totalSteps: number;
  progress: number;
  coverImage: string;
  technique: string;
  theorySections: TheorySection[];
  theoryTheses: TheoryThesis[];
  theoryTip: TheoryTip;
  theoryTerms: TheoryTerm[];
  theoryChecklist: TheoryChecklistItem[];
  strokeOrder: StrokeOrderStep[];
  theoryVideo: TheoryVideo;
  mistakes: MistakeExample[];
  exerciseSteps: ExerciseStep[];
  practiceTask: string;
  practiceImage: string;
  aiReview: AiReview;
  aiReviewImage: string;
  chatMessages: ChatMessage[];
};

export type UserProfile = {
  name: string;
  level: number;
  streak: number;
  overallProgress: number;
};

export type CoachTab = 'home' | 'course' | 'profile';

export type DailyChallenge = {
  task: string;
  xp: number;
  image: string;
};

export type CurrentLesson = {
  title: string;
  glyph: string;
  progress: number;
  image: string;
  lessonNumber: number;
};
