import { Link } from 'react-router';

type FrameDesktopViewportProps = {
  children: React.ReactNode;
};

export const FrameDesktopViewport = ({ children }: FrameDesktopViewportProps) => (
  <div className="flex min-h-screen flex-col items-center bg-gray-100 px-6 py-8 dark:bg-gray-900">
    <Link
      to="/"
      className="mb-6 self-start text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      ← Назад
    </Link>
    <div className="w-[min(1440px,calc(100vw-48px))] overflow-hidden rounded-[1.75rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl dark:border-gray-700">
      <div className="h-[min(900px,calc(100vh-120px))] w-full overflow-hidden bg-white">
        {children}
      </div>
    </div>
  </div>
);
