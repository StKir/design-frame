type LessonSubnavProps = {
  active: 'theory' | 'exercise' | 'chat';
};

const items = [
  { id: 'theory' as const, label: 'Теория' },
  { id: 'exercise' as const, label: 'Практика' },
  { id: 'chat' as const, label: 'AI-чат' },
];

export const LessonSubnav = ({ active }: LessonSubnavProps) => (
  <div className='mt-4 flex gap-1 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/60 p-1'>
    {items.map((item) => (
      <div
        key={item.id}
        className={`flex-1 rounded-lg py-2 text-center text-[11px] font-medium ${
          active === item.id ? 'bg-[#1C1C1E] text-white' : 'coach-text-muted'
        }`}
      >
        {item.label}
      </div>
    ))}
  </div>
);
