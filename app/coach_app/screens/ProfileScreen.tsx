import { BottomTabBar } from '~/coach_app/components/BottomTabBar';
import { CoachImage } from '~/coach_app/components/CoachImage';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { coachImages } from '~/coach_app/data/images';
import { userProfile } from '~/coach_app/data/user';

const stats = [
  { label: 'Уровень', value: String(userProfile.level) },
  { label: 'Серия', value: `${userProfile.streak} дн.` },
  { label: 'Прогресс', value: `${userProfile.overallProgress}%` },
];

const menuItems = ['Мои работы', 'Достижения', 'Настройки', 'Помощь'];

export const ProfileScreen = () => (
  <ScreenShell footer={<BottomTabBar activeTab='profile' />}>
    <StatusBar />

    <header className='mb-5 pt-1'>
      <h1 className='text-[24px] font-semibold tracking-[-0.02em] coach-text'>Профиль</h1>
    </header>

    <div className='coach-glass-card mb-4 flex items-center gap-4 p-4'>
      <div className='h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[rgba(0,0,0,0.06)]'>
        <CoachImage src={coachImages.avatar} alt='Аватар' rounded='rounded-full' />
      </div>
      <div>
        <p className='text-[17px] font-semibold coach-text'>{userProfile.name}</p>
        <p className='text-[13px] coach-text-muted'>Ученик курса каллиграфии</p>
      </div>
    </div>

    <div className='mb-4 grid grid-cols-3 gap-2'>
      {stats.map((stat) => (
        <div key={stat.label} className='coach-glass-card p-3 text-center'>
          <p className='text-[16px] font-semibold coach-text'>{stat.value}</p>
          <p className='mt-1 text-[10px] uppercase tracking-[0.08em] coach-text-faint'>
            {stat.label}
          </p>
        </div>
      ))}
    </div>

    <div className='coach-glass-card overflow-hidden'>
      {menuItems.map((item, index) => (
        <div
          key={item}
          className={`flex items-center justify-between px-4 py-3.5 ${
            index < menuItems.length - 1 ? 'border-b border-[rgba(0,0,0,0.05)]' : ''
          }`}
        >
          <span className='text-[14px] coach-text'>{item}</span>
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden='true' className='coach-text-faint'>
            <path
              d='M5 3L9 7L5 11'
              stroke='currentColor'
              strokeWidth='1.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      ))}
    </div>

    <div className='pb-4' />
  </ScreenShell>
);
