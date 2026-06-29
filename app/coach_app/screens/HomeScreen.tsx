import { BottomTabBar } from '~/coach_app/components/BottomTabBar';
import { ChallengeCard } from '~/coach_app/components/ChallengeCard';
import { HomeContinueHero } from '~/coach_app/components/HomeContinueHero';
import { HomeHeader } from '~/coach_app/components/HomeHeader';
import { HomeJourneyPath } from '~/coach_app/components/HomeJourneyPath';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { WorkGallery } from '~/coach_app/components/WorkGallery';
import { calligraphyBasics } from '~/coach_app/data/course';
import { recentWorks } from '~/coach_app/data/gallery';
import { currentLesson, dailyChallenge, userProfile } from '~/coach_app/data/user';

export const HomeScreen = () => (
  <ScreenShell footer={<BottomTabBar activeTab='home' />}>
    <StatusBar />

    <HomeHeader
      profile={userProfile}
      courseTitle={calligraphyBasics.title}
      courseProgress={calligraphyBasics.progress}
    />

    <HomeContinueHero
      lesson={currentLesson}
      lessonNumber={currentLesson.lessonNumber}
      lessonTotal={calligraphyBasics.lessonCount}
    />

    <section className='coach-home-section'>
      <HomeJourneyPath lessons={calligraphyBasics.lessons} />
    </section>

    <section className='coach-home-section'>
      <ChallengeCard challenge={dailyChallenge} />
    </section>

    <section className='coach-home-section coach-home-section--last'>
      <h2 className='coach-home-section__title mb-3'>Недавние работы</h2>
      <WorkGallery works={recentWorks} />
    </section>
  </ScreenShell>
);
