import type { ChatMessage } from '~/vault_app/types';

import { IconSpark } from '~/vault_app/components/icons';

type ChatBubbleProps = {
  message: ChatMessage;
};

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`vault-chat-bubble-wrap ${isUser ? 'vault-chat-bubble-wrap--user' : ''}`}>
      <div className={`vault-chat-bubble ${isUser ? 'vault-chat-bubble--user' : 'vault-chat-bubble--ai'}`}>
        <p className='vault-chat-bubble__text'>{message.text}</p>
        {message.sources && message.sources.length > 0 && (
          <div className='vault-chat-sources'>
            {message.sources.map((source) => (
              <span key={source} className='vault-chat-source'>
                <IconSpark />
                {source}
              </span>
            ))}
          </div>
        )}
        <span className='vault-chat-bubble__time vault-tabular'>{message.time}</span>
      </div>
    </div>
  );
};
