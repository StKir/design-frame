import type { ReactNode } from 'react';

type PhoneFrameProps = {
  children: ReactNode;
  label?: string;
};

export const PhoneFrame = ({ children, label }: PhoneFrameProps) => (
  <div className="flex flex-col items-center gap-3">
    <div className="overflow-hidden rounded-[2.5rem] border-[6px] border-gray-900 bg-gray-900 shadow-2xl dark:border-gray-700">
      <div className="h-[844px] w-[390px] overflow-hidden bg-white">
        {children}
      </div>
    </div>
    {label && (
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
    )}
  </div>
);
