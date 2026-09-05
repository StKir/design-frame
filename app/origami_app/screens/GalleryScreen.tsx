import { DrawingPreview } from '~/origami_app/components/DrawingPreview';
import { tutorials, type Tutorial } from '~/origami_app/data/tutorials';

type GalleryScreenProps = {
  onOpen: (id: string) => void;
};

const StudyCard = ({
  tutorial,
  onOpen,
}: {
  tutorial: Tutorial;
  onOpen: (id: string) => void;
}) => (
  <div className={`atelier-study-shell${tutorial.featured ? ' is-featured' : ''}`}>
    <button
      type="button"
      className="atelier-study-core group"
      onClick={() => onOpen(tutorial.id)}
    >
      <div className="atelier-study-preview">
        <DrawingPreview tutorial={tutorial} />
      </div>
      <div className="atelier-study-meta">
        <div className="atelier-study-copy">
          <p className="atelier-study-kicker">{tutorial.kicker}</p>
          <h2 className="atelier-study-title">{tutorial.title}</h2>
          <p className="atelier-study-caption">
            {tutorial.subtitle}
            <span> · {tutorial.steps.length} шагов</span>
          </p>
        </div>
        <span className="atelier-study-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M4 10.5L10 4.5M10 4.5H5.2M10 4.5V9.3"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </button>
  </div>
);

export const GalleryScreen = ({ onOpen }: GalleryScreenProps) => (
  <div className="atelier-root atelier-gallery">
    <div className="atelier-grain" aria-hidden="true" />

    <header className="atelier-gallery-head">
      <div className="atelier-header-shell">
        <div className="atelier-header-core">
          <p className="atelier-kicker">At</p>
          <div className="atelier-copy">
            <p className="atelier-eyebrow">Студия</p>
            <h1 className="atelier-title">Выберите этюд</h1>
          </div>
        </div>
      </div>
    </header>

    <div className="atelier-gallery-body">
      <p className="atelier-gallery-lead">
        Архитектурная графика. Каждая карточка открывает пошаговый рисунок тушью.
      </p>
      <div className="atelier-gallery-grid">
        {tutorials.map((tutorial) => (
          <StudyCard key={tutorial.id} tutorial={tutorial} onOpen={onOpen} />
        ))}
      </div>
    </div>
  </div>
);
