import { Link } from 'react-router';

type FrameShowcaseViewportProps = {
  children: React.ReactNode;
};

export const FrameShowcaseViewport = ({ children }: FrameShowcaseViewportProps) => (
  <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 dark:bg-gray-900">
    <Link
      to="/"
      className="mb-6 self-start text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      ← Назад
    </Link>
    <div className="w-full overflow-x-auto pb-4">
      <div className="mx-auto w-fit min-w-0 px-2">{children}</div>
    </div>
  </div>
);
