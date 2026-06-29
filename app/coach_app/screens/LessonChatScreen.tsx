import { ChatBubble } from '~/coach_app/components/ChatBubble';
import { ChatComposer } from '~/coach_app/components/ChatComposer';
import { LessonHeader } from '~/coach_app/components/LessonHeader';
import { LessonSubnav } from '~/coach_app/components/LessonSubnav';
import { ScreenShell } from '~/coach_app/components/ScreenShell';
import { StatusBar } from '~/coach_app/components/StatusBar';
import { uppercaseLetterA } from '~/coach_app/data/lesson';

export const LessonChatScreen = () => {
  const lesson = uppercaseLetterA;

  return (
    <ScreenShell footer={<ChatComposer />}>
      <StatusBar />

      <LessonHeader title={lesson.title} badge='AI-чат' progress={lesson.progress} />

      <p className='mb-4 text-[13px] coach-text-muted'>
        Задайте вопрос о наклоне, порядке штрихов или ошибках в вашей букве.
      </p>

      <div className='space-y-3 pb-4'>
        {lesson.chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>

      <LessonSubnav active='chat' />

      <div className='pb-4' />
    </ScreenShell>
  );
};
