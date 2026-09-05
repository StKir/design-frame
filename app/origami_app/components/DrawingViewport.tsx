import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react';

import { IsolateButton } from '~/origami_app/components/IsolateButton';

const MIN_SCALE = 0.28;
const MAX_SCALE = 8;
const ZOOM_STEP = 1.28;
const INITIAL_SCALE = 0.68;
const PAN_SLACK = 1.2;
const GRID_SIZE = 24;

type DrawingViewportProps = {
  children: ReactNode;
  isolate: boolean;
  onIsolate: () => void;
};

type Point = { x: number; y: number };

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

export const DrawingViewport = ({ children, isolate, onIsolate }: DrawingViewportProps) => {
  const [showGrid, setShowGrid] = useState(false);
  const [scaleValue, setScaleValue] = useState(INITIAL_SCALE);
  const frameRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const transform = useRef({ x: 0, y: 0, scale: INITIAL_SCALE });
  const pointers = useRef(new Map<number, Point>());
  const lastPinch = useRef<number | null>(null);
  const lastPan = useRef<Point | null>(null);
  const lastTap = useRef(0);

  const apply = () => {
    const node = worldRef.current;
    if (!node) return;
    const { x, y, scale } = transform.current;
    node.style.width = `${scale * 100}%`;
    node.style.height = `${scale * 100}%`;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (gridRef.current) {
      const size = Math.max(8, Math.min(120, GRID_SIZE * scale));
      gridRef.current.style.setProperty('--grid-size', `${size}px`);
      gridRef.current.style.setProperty('--grid-major-size', `${size * 5}px`);
      gridRef.current.style.setProperty('--grid-offset-x', `${x}px`);
      gridRef.current.style.setProperty('--grid-offset-y', `${y}px`);
    }
  };

  const centerWorld = () => {
    const frame = frameRef.current;
    if (!frame) return;
    const { scale } = transform.current;
    transform.current.x = (frame.clientWidth - frame.clientWidth * scale) / 2;
    transform.current.y = (frame.clientHeight - frame.clientHeight * scale) / 2;
  };

  const clamp = () => {
    const frame = frameRef.current;
    if (!frame) return;
    const width = frame.clientWidth;
    const height = frame.clientHeight;
    const { scale } = transform.current;
    const contentWidth = width * scale;
    const contentHeight = height * scale;
    const slackX = width * PAN_SLACK;
    const slackY = height * PAN_SLACK;
    transform.current.x = Math.min(slackX, Math.max(width - contentWidth - slackX, transform.current.x));
    transform.current.y = Math.min(slackY, Math.max(height - contentHeight - slackY, transform.current.y));
  };

  const zoomAt = (origin: Point, factor: number) => {
    const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, transform.current.scale * factor));
    const ratio = next / transform.current.scale;
    transform.current.x = origin.x - (origin.x - transform.current.x) * ratio;
    transform.current.y = origin.y - (origin.y - transform.current.y) * ratio;
    transform.current.scale = next;
    setScaleValue(next);
    clamp();
    apply();
  };

  const localPoint = (clientX: number, clientY: number): Point => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const centerPoint = (): Point => {
    const frame = frameRef.current;
    if (!frame) return { x: 0, y: 0 };
    return { x: frame.clientWidth / 2, y: frame.clientHeight / 2 };
  };

  useEffect(() => {
    centerWorld();
    apply();
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.0024);
      zoomAt(localPoint(event.clientX, event.clientY), factor);
    };

    frame.addEventListener('wheel', onWheel, { passive: false });
    return () => frame.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, localPoint(event.clientX, event.clientY));
    lastPan.current = localPoint(event.clientX, event.clientY);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      lastPinch.current = distance(a, b);
      lastPan.current = null;
    }
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const point = localPoint(event.clientX, event.clientY);
    pointers.current.set(event.pointerId, point);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const nextDist = distance(a, b);
      if (lastPinch.current) {
        zoomAt(midpoint(a, b), nextDist / lastPinch.current);
      }
      lastPinch.current = nextDist;
      return;
    }

    if (!lastPan.current) return;
    transform.current.x += point.x - lastPan.current.x;
    transform.current.y += point.y - lastPan.current.y;
    lastPan.current = point;
    clamp();
    apply();
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    lastPinch.current = null;
    lastPan.current = null;

    if (pointers.current.size === 0) {
      const now = performance.now();
      if (now - lastTap.current < 280) {
        if (transform.current.scale > INITIAL_SCALE + 0.08) {
          transform.current.scale = INITIAL_SCALE;
          setScaleValue(INITIAL_SCALE);
          centerWorld();
          apply();
        } else {
          zoomAt(localPoint(event.clientX, event.clientY), 2.2);
        }
      }
      lastTap.current = now;
    }
  };

  return (
    <div className="atelier-board-shell">
      <div className="atelier-board-core">
        <div
          ref={frameRef}
          className="atelier-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div ref={worldRef} className="atelier-world">
            {children}
          </div>
        </div>
        {showGrid && (
          <div
            ref={gridRef}
            className="atelier-grid-overlay"
            aria-hidden="true"
            style={
              {
                '--grid-size': `${GRID_SIZE * scaleValue}px`,
                '--grid-major-size': `${GRID_SIZE * scaleValue * 5}px`,
                '--grid-offset-x': `${transform.current.x}px`,
                '--grid-offset-y': `${transform.current.y}px`,
              } as CSSProperties
            }
          />
        )}

        <div className="atelier-tools">
          <IsolateButton active={isolate} onToggle={onIsolate} />
          <button
            type="button"
            className={`atelier-tool atelier-grid-toggle${showGrid ? ' is-active' : ''}`}
            aria-label={showGrid ? 'Выключить разметку' : 'Включить разметку'}
            aria-pressed={showGrid}
            onClick={() => setShowGrid((value) => !value)}
          >
            <span className="atelier-grid-icon" aria-hidden="true" />
          </button>
          <div className="atelier-zoom">
            <button
              type="button"
              className="atelier-tool"
              aria-label="Приблизить"
              onClick={() => zoomAt(centerPoint(), ZOOM_STEP)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 8h9M8 3.5v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              className="atelier-tool"
              aria-label="Отдалить"
              onClick={() => zoomAt(centerPoint(), 1 / ZOOM_STEP)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
