import type { ChatMessage } from '~/coach_app/types';

type ChatBubbleProps = {
  message: ChatMessage;
};

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
          isUser
            ? 'bg-[#1C1C1E] text-white'
            : 'border border-[rgba(0,0,0,0.06)] bg-white/90 coach-text'
        }`}
      >
        <p className='text-[13px] leading-relaxed'>{message.text}</p>
        <p className={`mt-1 text-[10px] ${isUser ? 'text-white/50' : 'coach-text-faint'}`}>
          {message.time}
        </p>
      </div>
    </div>
  );
};
