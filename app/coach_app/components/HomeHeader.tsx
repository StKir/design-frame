import type { UserProfile } from '~/coach_app/types';

type HomeHeaderProps = {
  profile: UserProfile;
  courseTitle: string;
  courseProgress: number;
};

export const HomeHeader = ({ profile, courseTitle, courseProgress }: HomeHeaderProps) => (
  <header className='coach-home-header'>
    <div>
      <p className='coach-home-header__greeting'>Доброе утро</p>
      <h1 className='coach-home-header__name'>{profile.name}</h1>
      <p className='coach-home-header__course'>{courseTitle}</p>
    </div>

    <div className='coach-home-header__stats'>
      <div className='coach-home-header__pill'>
        <span className='coach-home-header__pill-value'>{profile.streak}</span>
        <span className='coach-home-header__pill-label'>дней</span>
      </div>
      <div className='coach-home-header__pill coach-home-header__pill--dark'>
        <span className='coach-home-header__pill-value'>Ур. {profile.level}</span>
      </div>
    </div>

    <div className='coach-home-header__progress'>
      <div className='coach-home-header__progress-top'>
        <span className='coach-section-label'>Прогресс курса</span>
        <span className='coach-home-header__progress-value'>{courseProgress}%</span>
      </div>
      <div className='coach-progress-bar'>
        <div className='coach-progress-bar__fill' style={{ width: `${courseProgress}%` }} />
      </div>
    </div>
  </header>
);
