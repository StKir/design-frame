export const ChatComposer = () => (
  <div className='border-t border-[rgba(0,0,0,0.06)] bg-white/70 px-3 py-3 backdrop-blur-md'>
    <div className='flex items-center gap-2'>
      <input
        type='text'
        readOnly
        placeholder='Спросите про букву А...'
        className='h-10 flex-1 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 text-[13px] coach-text outline-none placeholder:text-[rgba(28,28,30,0.35)]'
      />
      <button
        type='button'
        className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C1C1E] text-white'
        aria-label='Отправить'
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
          <path
            d='M2.5 8L13.5 3L9 8L13.5 13L2.5 8Z'
            stroke='currentColor'
            strokeWidth='1.3'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  </div>
);
