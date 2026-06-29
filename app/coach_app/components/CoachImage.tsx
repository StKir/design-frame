import { coachImages } from '~/coach_app/data/images';

type CoachImageProps = {
  src?: string;
  alt: string;
  className?: string;
  rounded?: string;
  objectPosition?: string;
};

export const CoachImage = ({
  src = coachImages.fallback,
  alt,
  className = '',
  rounded = 'rounded-xl',
  objectPosition = 'center',
}: CoachImageProps) => (
  <img
    src={src}
    alt={alt}
    className={`coach-img-cover coach-img-muted ${rounded} ${className}`}
    style={{ objectPosition }}
  />
);
