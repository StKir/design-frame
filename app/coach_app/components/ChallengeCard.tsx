import { CoachImage } from '~/coach_app/components/CoachImage';
import type { DailyChallenge } from '~/coach_app/types';

type ChallengeCardProps = {
  challenge: DailyChallenge;
};

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => (
  <div className='coach-home-challenge coach-glass-card overflow-hidden'>
    <div className='coach-home-challenge__media'>
      <CoachImage src={challenge.image} alt='Задание дня' rounded='rounded-none' />
    </div>
    <div className='coach-home-challenge__body'>
      <div className='coach-home-challenge__top'>
        <span className='coach-home-challenge__badge'>Задание дня</span>
        <span className='coach-home-challenge__xp'>+{challenge.xp} XP</span>
      </div>
      <p className='coach-home-challenge__task'>{challenge.task}</p>
      <button type='button' className='coach-home-challenge__action'>
        Начать
      </button>
    </div>
  </div>
);
