type PhotoUploadZoneProps = {
  empty?: boolean;
};

export const PhotoUploadZone = ({ empty = true }: PhotoUploadZoneProps) => (
  <div className='coach-upload-zone flex flex-col items-center justify-center px-4 py-10'>
    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80'>
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true' className='coach-text-muted'>
        <rect x='3' y='5' width='16' height='12' rx='2' stroke='currentColor' strokeWidth='1.3' />
        <circle cx='8' cy='10' r='1.5' stroke='currentColor' strokeWidth='1.3' />
        <path d='M3 15L8 11L13 14L19 9' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' />
      </svg>
    </div>
    <p className='mt-3 text-[14px] font-medium coach-text'>
      {empty ? 'Загрузите работу' : 'Заменить фото'}
    </p>
    <p className='mt-1 text-center text-[12px] coach-text-muted'>
      Сфотографируйте лист с практикой, чтобы получить разбор ошибок
    </p>
  </div>
);
