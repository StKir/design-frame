import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';

import type { Drink, DrinkMedia } from '~/cantata_app/types';

const DEFAULT_IMAGE_DURATION = 5000;

type ProductHeroStoriesProps = {
  media: DrinkMedia[];
  alt: string;
  drink: Drink;
  paused?: boolean;
};

export const ProductHeroStories = ({
  media,
  alt,
  paused = false,
  drink,
}: ProductHeroStoriesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const pointerStartRef = useRef({ time: 0, x: 0 });

  const current = media[activeIndex];
  const isVideo = current?.type === 'video';
  const duration = current?.duration ?? DEFAULT_IMAGE_DURATION;
  const isHoldPaused = paused || isPaused;

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % media.length);
    setProgress(0);
  }, [media.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + media.length) % media.length);
    setProgress(0);
  }, [media.length]);

  useEffect(() => {
    setActiveIndex(0);
    setProgress(0);
  }, [media]);

  useEffect(() => {
    if (isHoldPaused || isVideo || media.length <= 1) {
      return;
    }

    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const nextProgress = Math.min(elapsed / duration, 1);

      setProgress(nextProgress);

      if (nextProgress >= 1) {
        goNext();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, duration, goNext, isHoldPaused, isVideo, media.length]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isVideo) {
      return;
    }

    video.currentTime = 0;

    const handleTimeUpdate = () => {
      if (!video.duration) {
        return;
      }

      setProgress(video.currentTime / video.duration);
    };

    const handleEnded = () => {
      goNext();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (!isHoldPaused) {
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [activeIndex, goNext, isHoldPaused, isVideo]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isVideo) {
      return;
    }

    if (isHoldPaused) {
      video.pause();
      return;
    }

    video.play().catch(() => {});
  }, [isHoldPaused, isVideo]);

  const handleTap = (event: PointerEvent<HTMLDivElement>) => {
    if (media.length <= 1) {
      return;
    }

    const holdDuration = performance.now() - pointerStartRef.current.time;

    if (holdDuration > 250) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;

    if (offsetX < rect.width * 0.35) {
      goPrev();
      return;
    }

    goNext();
  };

  const handleHoldStart = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { time: performance.now(), x: event.clientX };
    setIsPaused(true);
  };

  const handleHoldEnd = () => {
    setIsPaused(false);
  };

  if (!current) {
    return null;
  }

  return (
    <div className='cantata-hero-stories absolute inset-0'>
      {media.length > 1 && (
        <div className='absolute inset-x-3 top-3 z-20 flex gap-1'>
          {media.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className='h-[2px] flex-1 overflow-hidden rounded-full bg-white/30'
            >
              <div
                className='cantata-story-progress h-full rounded-full bg-white'
                style={{
                  width:
                    index < activeIndex
                      ? '100%'
                      : index === activeIndex
                        ? `${progress * 100}%`
                        : '0%',
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className='absolute inset-0'>
        {isVideo ? (
          <video
            ref={videoRef}
            src={current.src}
            className='cantata-product-hero-img'
            playsInline
            muted
            loop={media.length === 1}
          />
        ) : (
          <img src={current.src} alt={alt} className='cantata-product-hero-img' />
        )}
      </div>

      {media.length > 1 && (
        <div
          className='absolute inset-0 z-10 touch-none'
          onPointerDown={handleHoldStart}
          onPointerUp={(event) => {
            handleHoldEnd();
            handleTap(event);
          }}
          onPointerCancel={handleHoldEnd}
          onPointerLeave={handleHoldEnd}
        />
      )}
    </div>
  );
};
