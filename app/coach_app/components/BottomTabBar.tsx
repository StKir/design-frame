import type { ReactElement } from 'react';
import type { CoachTab } from '~/coach_app/types';

type BottomTabBarProps = {
  activeTab: CoachTab;
};

const tabs: { id: CoachTab; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'course', label: 'Курс' },
  { id: 'profile', label: 'Профиль' },
];

const IconHome = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
    <path
      d='M4 9.5L11 3.5L18 9.5V17.5C18 18.05 17.55 18.5 17 18.5H14.5V13.5H7.5V18.5H5C4.45 18.5 4 18.05 4 17.5V9.5Z'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinejoin='round'
    />
  </svg>
);

const IconCourse = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
    <rect x='4' y='4' width='6' height='6' rx='1.5' stroke='currentColor' strokeWidth='1.4' />
    <rect x='12' y='4' width='6' height='6' rx='1.5' stroke='currentColor' strokeWidth='1.4' />
    <rect x='4' y='12' width='6' height='6' rx='1.5' stroke='currentColor' strokeWidth='1.4' />
    <path
      d='M15 14.5H18.5M17 13V16'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinecap='round'
    />
  </svg>
);

const IconProfile = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
    <circle cx='11' cy='8' r='3' stroke='currentColor' strokeWidth='1.4' />
    <path
      d='M5 18.5C5 15.5 7.7 13.5 11 13.5C14.3 13.5 17 15.5 17 18.5'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinecap='round'
    />
  </svg>
);

const icons: Record<CoachTab, () => ReactElement> = {
  home: IconHome,
  course: IconCourse,
  profile: IconProfile,
};

export const BottomTabBar = ({ activeTab }: BottomTabBarProps) => (
  <nav className='coach-tab-bar' aria-label='Основная навигация'>
    {tabs.map(({ id, label }) => {
      const Icon = icons[id];
      const isActive = activeTab === id;

      return (
        <div
          key={id}
          className={`coach-tab-bar__item ${isActive ? 'coach-tab-bar__item--active' : ''}`}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className='coach-tab-bar__icon'>
            <Icon />
          </span>
          <span>{label}</span>
        </div>
      );
    })}
  </nav>
);
