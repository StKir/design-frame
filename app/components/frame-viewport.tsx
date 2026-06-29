import { Link } from "react-router";

type FrameViewportProps = {
  children: React.ReactNode;
};

export const FrameViewport = ({ children }: FrameViewportProps) => (
  <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 dark:bg-gray-900">
    <Link
      to="/"
      className="mb-6 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      ← Назад
    </Link>
    <div className="overflow-hidden rounded-[2.5rem] border-[6px] border-gray-900 bg-gray-900 shadow-2xl dark:border-gray-700">
      <div className="h-[844px] w-[390px] overflow-y-auto bg-white">
        {children}
      </div>
    </div>
  </div>
);
