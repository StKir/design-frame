import { ChatBubble } from '~/vault_app/components/ChatBubble';
import { ChatComposer } from '~/vault_app/components/ChatComposer';
import { ContainerHeader } from '~/vault_app/components/ContainerHeader';
import { ContainerTabBar } from '~/vault_app/components/ContainerTabBar';
import { ScreenShell } from '~/vault_app/components/ScreenShell';
import { StatusBar } from '~/vault_app/components/StatusBar';
import { activeContainer } from '~/vault_app/data/containers';
import { chatMessages } from '~/vault_app/data/chat';

export const ContainerChatScreen = () => (
  <ScreenShell
    footer={
      <>
        <ChatComposer />
        <ContainerTabBar activeTab='chat' />
      </>
    }
  >
    <StatusBar />
    <ContainerHeader title={activeContainer.name} subtitle='ИИ Чат' />

    <div className='vault-chat-hint px-5'>
      Задавайте вопросы по документам контейнера — ответы с цитированием источников
    </div>

    <div className='vault-chat-messages px-5 pb-4'>
      {chatMessages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
    </div>
  </ScreenShell>
);
