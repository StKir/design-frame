import { CoachImage } from '~/coach_app/components/CoachImage';
import type { TheoryVideo } from '~/coach_app/types';

type VideoPreviewBlockProps = {
  video: TheoryVideo;
};

export const VideoPreviewBlock = ({ video }: VideoPreviewBlockProps) => (
  <div className='coach-glass-card overflow-hidden'>
    <div className='coach-video-preview'>
      <CoachImage src={video.thumbnail} alt={video.title} rounded='rounded-none' />
      <div className='coach-video-preview__overlay'>
        <span className='coach-video-preview__play' aria-hidden='true'>
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <path d='M6 4.5L13.5 9L6 13.5V4.5Z' fill='currentColor' />
          </svg>
        </span>
        <span className='coach-video-preview__duration'>{video.duration}</span>
      </div>
    </div>
    <p className='p-4 text-[14px] font-medium coach-text'>{video.title}</p>
  </div>
);
