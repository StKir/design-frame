import { useEffect, useMemo, useState } from 'react';
import { Link, useFetcher, useRevalidator, useSearchParams } from 'react-router';

import type { Route } from './+types/admin.pipeline';
import type { PipelineRun, StageId, StageState } from '~/origami_app/pipeline/types';
import { pipelineAction, pipelineLoader } from '~/origami_app/pipeline/route.server';

import '~/origami_app/pipeline/pipeline.css';

const STAGE_ORDER: StageId[] = ['reference', 'sketch', 'upscale', 'plan', 'svg', 'export', 'source', 'tutorial'];

const RUNNABLE_STAGES: StageId[] = ['sketch', 'upscale', 'plan', 'svg', 'export', 'source', 'tutorial'];

const STAGE_ICONS: Record<StageId, string> = {
  reference: '▣',
  sketch: '✎',
  upscale: '⤢',
  plan: '☰',
  svg: '◇',
  export: '↗',
  source: '{}',
  tutorial: '◆',
};

const COMPACT_STORAGE_KEY = 'pipeline-admin-compact';

const STAGE_SHORT: Record<StageId, string> = {
  reference: 'Реф',
  sketch: 'Скетч',
  upscale: 'Upscale',
  plan: 'План',
  svg: 'SVG',
  export: 'Экспорт',
  source: 'JSON',
  tutorial: 'Урок',
};

const statusLabel: Record<string, string> = {
  idle: 'Ожидает',
  pending: 'В очереди',
  running: 'Генерируется',
  done: 'Готово',
  error: 'Ошибка',
};

const stageHint: Record<StageId, string> = {
  reference: 'Файл на диске',
  sketch: 'gpt-image-2 · ~40–90 сек',
  upscale: 'SeedVR · ~30–90 сек',
  plan: 'gpt-5-6-luna · ~1–3 мин',
  svg: 'Potrace · локально · ~2–15 сек',
  export: 'course/data/{название} · все файлы',
  source: 'source.json · svg + план',
  tutorial: 'gpt-5-6-luna · tutorial.json · ~2–5 мин',
};

const formatDuration = (startedAt?: string, finishedAt?: string) => {
  if (!startedAt) return null;
  const end = finishedAt ? new Date(finishedAt).getTime() : Date.now();
  const seconds = Math.max(0, Math.floor((end - new Date(startedAt).getTime()) / 1000));
  if (seconds < 60) return `${seconds} сек`;
  return `${Math.floor(seconds / 60)} мин ${seconds % 60} сек`;
};

const LiveDuration = ({ startedAt, finishedAt, active }: { startedAt?: string; finishedAt?: string; active?: boolean }) => {
  const [, tick] = useState(0);

  useEffect(() => {
    if (!active || !startedAt) return undefined;
    const id = window.setInterval(() => tick((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [active, startedAt]);

  const label = formatDuration(startedAt, finishedAt);
  if (!label) return null;
  return <span className="pipeline-duration">{label}</span>;
};

const StageDot = ({ status, compact }: { status: string; compact?: boolean }) => (
  <span
    className={`pipeline-dot pipeline-dot--${status} ${compact ? 'pipeline-dot--compact' : ''}`}
    aria-hidden
  />
);

const StageBadge = ({ status, compact }: { status: string; compact?: boolean }) => (
  <span className={`pipeline-badge pipeline-badge--${status} ${compact ? 'pipeline-badge--compact' : ''}`}>
    {(status === 'running' || status === 'pending') && <span className="pipeline-spinner" aria-hidden />}
    {!compact && (statusLabel[status] ?? status)}
  </span>
);

const ArtifactCard = ({
  title,
  icon,
  filename,
  runId,
  kind,
  text,
  stage,
  downloadHref,
  compact,
  defaultOpen = false,
}: {
  title: string;
  icon: string;
  filename?: string;
  runId: string;
  kind: 'image' | 'text' | 'svg';
  text?: string;
  stage: StageState;
  downloadHref?: string;
  compact?: boolean;
  defaultOpen?: boolean;
}) => {
  const url = filename ? `/admin/pipeline/file/${runId}/${filename}` : undefined;
  const href = downloadHref ?? url;
  const isLoading = stage.status === 'pending' || stage.status === 'running';
  const [open, setOpen] = useState(defaultOpen || stage.status === 'running' || stage.status === 'error');

  useEffect(() => {
    if (stage.status === 'running' || stage.status === 'error') {
      setOpen(true);
    }
  }, [stage.status]);

  return (
    <article
      className={`pipeline-artifact ${isLoading ? 'pipeline-artifact--loading' : ''} ${stage.status === 'error' ? 'pipeline-artifact--error' : ''} ${open ? 'pipeline-artifact--open' : 'pipeline-artifact--collapsed'} ${compact ? 'pipeline-artifact--compact' : ''}`}
    >
      <button type="button" className="pipeline-artifact__toggle" onClick={() => setOpen((value) => !value)}>
        <span className="pipeline-artifact__icon" aria-hidden>
          {icon}
        </span>
        <span className="pipeline-artifact__title-wrap">
          <strong>{title}</strong>
          <StageBadge status={stage.status} compact={compact} />
        </span>
        <span className="pipeline-artifact__chevron" aria-hidden>
          {open ? '▾' : '▸'}
        </span>
      </button>

      {open && (
        <div className="pipeline-artifact__body">
          {href && (
            <a className="pipeline-link" href={href} download>
              Скачать
            </a>
          )}

          {isLoading && (
            <div className="pipeline-artifact__loading">
              <span className="pipeline-spinner pipeline-spinner--large" aria-hidden />
              <p>{stage.status === 'pending' ? 'В очереди на генерацию…' : 'GenAPI обрабатывает запрос…'}</p>
              <LiveDuration startedAt={stage.startedAt} active />
            </div>
          )}

          {!filename && !text && !href && !isLoading && stage.status !== 'error' && (
            <p className="pipeline-artifact__empty">Артефакт ещё не создан</p>
          )}

          {stage.status === 'error' && !filename && !text && (
            <p className="pipeline-artifact__empty pipeline-artifact__empty--error">{stage.error ?? 'Ошибка генерации'}</p>
          )}

          {kind === 'image' && url && !isLoading && <img className="pipeline-preview" src={url} alt={title} />}
          {kind === 'svg' && url && !isLoading && (
            <object className="pipeline-preview pipeline-preview--svg" data={url} type="image/svg+xml" aria-label={title} />
          )}
          {kind === 'text' && text && !isLoading && <pre className="pipeline-text">{text}</pre>}
        </div>
      )}
    </article>
  );
};

const PipelineFlow = ({
  run,
  targetStage,
  onTargetChange,
  compact,
}: {
  run: PipelineRun;
  targetStage: StageId;
  onTargetChange: (stageId: StageId) => void;
  compact: boolean;
}) => (
  <div className={`pipeline-flow ${compact ? 'pipeline-flow--compact' : ''}`}>
    {STAGE_ORDER.map((stageId, index) => {
      const stage = run.stages[stageId];
      const isTarget = RUNNABLE_STAGES.includes(stageId) && stageId === targetStage;
      const isBeforeTarget =
        RUNNABLE_STAGES.includes(stageId) &&
        RUNNABLE_STAGES.indexOf(stageId) <= RUNNABLE_STAGES.indexOf(targetStage);
      const isRunnable = RUNNABLE_STAGES.includes(stageId);

      return (
        <div key={stageId} className="pipeline-flow__item">
          {index > 0 && <span className="pipeline-flow__line" aria-hidden />}
          <button
            type="button"
            className={`pipeline-flow__node pipeline-flow__node--${stage.status} ${isTarget ? 'pipeline-flow__node--target' : ''} ${isBeforeTarget ? 'pipeline-flow__node--in-range' : ''}`}
            onClick={() => isRunnable && onTargetChange(stageId)}
            disabled={!isRunnable}
            title={isRunnable ? `${stage.label} · клик — остановить pipeline здесь` : stage.label}
          >
            <span className="pipeline-flow__glyph" aria-hidden>
              {STAGE_ICONS[stageId]}
            </span>
            {!compact && <span className="pipeline-flow__label">{STAGE_SHORT[stageId]}</span>}
            <StageDot status={stage.status} compact={compact} />
          </button>
        </div>
      );
    })}
  </div>
);

const StatusBanner = ({
  run,
  flash,
}: {
  run: PipelineRun;
  flash?: string | null;
}) => {
  const activeStage = STAGE_ORDER.find((stageId) => {
    const status = run.stages[stageId].status;
    return status === 'running' || status === 'pending';
  });

  if (!activeStage && !flash) return null;

  const stage = activeStage ? run.stages[activeStage] : null;

  return (
    <div className={`pipeline-banner ${activeStage ? 'pipeline-banner--active' : 'pipeline-banner--info'}`}>
      {activeStage && stage ? (
        <>
          <span className="pipeline-spinner pipeline-spinner--large" aria-hidden />
          <div>
            <strong>
              {stage.status === 'pending' ? 'Запускается' : 'Сейчас генерируется'}: {stage.label}
            </strong>
            <p>
              {stageHint[activeStage]} · страница обновляется автоматически
              {stage.startedAt && (
                <>
                  {' '}
                  · <LiveDuration startedAt={stage.startedAt} active={stage.status === 'running'} />
                </>
              )}
            </p>
          </div>
        </>
      ) : (
        <p>{flash}</p>
      )}
    </div>
  );
};

export const meta = () => [{ title: 'Pipeline Admin — Atelier' }];

export const loader = ({ request }: Route.LoaderArgs) => pipelineLoader(request);

export const action = ({ request }: Route.ActionArgs) => pipelineAction(request);

export default function AdminPipelinePage({ loaderData }: Route.ComponentProps) {
  const { runs, run, hasApiKey } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const revalidator = useRevalidator();
  const actionFetcher = useFetcher();
  const createFetcher = useFetcher();
  const [compact, setCompact] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(COMPACT_STORAGE_KEY) === '1';
  });
  const [targetStage, setTargetStage] = useState<StageId>('tutorial');
  const [stepsOpen, setStepsOpen] = useState(true);

  useEffect(() => {
    window.localStorage.setItem(COMPACT_STORAGE_KEY, compact ? '1' : '0');
  }, [compact]);

  const isProcessing = useMemo(
    () =>
      Boolean(
        run &&
          STAGE_ORDER.some((stageId) => {
            const status = run.stages[stageId].status;
            return status === 'running' || status === 'pending';
          }),
      ),
    [run],
  );

  const isSubmitting = actionFetcher.state !== 'idle' || createFetcher.state !== 'idle';

  useEffect(() => {
    if (!isProcessing) return undefined;
    const id = window.setInterval(() => {
      if (revalidator.state === 'idle') revalidator.revalidate();
    }, 2500);
    return () => window.clearInterval(id);
  }, [isProcessing, revalidator]);

  const flashMessage = useMemo(() => {
    if (searchParams.get('busy') === '1') return 'Этот прогон уже выполняется — дождитесь завершения.';
    if (searchParams.get('saved') === '1') return 'Настройки сохранены.';
    if (searchParams.get('stopped') === '1') return 'Pipeline остановлен.';
    const started = searchParams.get('started');
    const isPipelineRun = searchParams.get('pipeline') === '1';
    if (started === 'all') return 'Запущен полный pipeline.';
    if (isPipelineRun && started && STAGE_SHORT[started as StageId]) {
      return `Запущен pipeline до этапа: ${STAGE_SHORT[started as StageId]}.`;
    }
    if (started && STAGE_SHORT[started as StageId]) return `Запущен этап: ${STAGE_SHORT[started as StageId]}.`;
    const error = searchParams.get('error');
    if (error) return error;
    return null;
  }, [searchParams]);

  useEffect(() => {
    if (!flashMessage) return undefined;
    const id = window.setTimeout(() => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          ['busy', 'saved', 'created', 'started', 'pipeline', 'stopped', 'error'].forEach((key) => next.delete(key));
          return next;
        },
        { replace: true },
      );
    }, 6000);
    return () => window.clearInterval(id);
  }, [flashMessage, setSearchParams]);

  const anyStageActive = isProcessing || isSubmitting;

  return (
    <main className="pipeline-root">
      <header className="pipeline-header">
        <div>
          <Link to="/" className="pipeline-back">
            ← Design Frames
          </Link>
          <p className="pipeline-kicker">Atelier MVP</p>
          <h1 className="pipeline-title">Pipeline генерации урока</h1>
          <p className="pipeline-subtitle">
            Референс → скетч → upscale → план рисования + SVG → урок
          </p>
        </div>
        {!hasApiKey && (
          <div className="pipeline-alert">
            GENAPI_API_KEY не найден. Скопируйте <code>.env.example</code> в <code>.env</code> и добавьте ключ.
          </div>
        )}
      </header>

      {run && <StatusBanner run={run} flash={!isProcessing ? flashMessage : null} />}
      {!run && flashMessage && <div className="pipeline-banner pipeline-banner--info">{flashMessage}</div>}

      {isSubmitting && (
        <div className="pipeline-banner pipeline-banner--submit">
          <span className="pipeline-spinner pipeline-spinner--large" aria-hidden />
          <strong>Отправляем запрос…</strong>
        </div>
      )}

      <div className="pipeline-layout">
        <aside className="pipeline-sidebar">
          <createFetcher.Form method="post" encType="multipart/form-data" className="pipeline-card">
            <input type="hidden" name="intent" value="create" />
            <h2>Новый прогон</h2>
            <label className="pipeline-field">
              <span>Название</span>
              <input name="title" placeholder="Двухэтажный фасад — этюд 08" required />
            </label>
            <label className="pipeline-field">
              <span>Референс (jpg/png/webp)</span>
              <input type="file" name="reference" accept="image/png,image/jpeg,image/webp" required />
            </label>
            <button type="submit" className="pipeline-button" disabled={!hasApiKey || createFetcher.state !== 'idle'}>
              {createFetcher.state === 'idle' ? 'Создать и загрузить' : 'Загрузка…'}
            </button>
          </createFetcher.Form>

          <section className="pipeline-card">
            <h2>Прогоны</h2>
            <ul className="pipeline-runs">
              {runs.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/admin/pipeline?run=${item.id}`}
                    className={`pipeline-run ${run?.id === item.id ? 'pipeline-run--active' : ''}`}
                  >
                    <strong>{item.title}</strong>
                    <span>{new Date(item.updatedAt).toLocaleString('ru-RU')}</span>
                    <div className={`pipeline-run__stages ${compact ? 'pipeline-run__stages--compact' : ''}`}>
                      {STAGE_ORDER.map((stageId) =>
                        compact ? (
                          <span
                            key={stageId}
                            className={`pipeline-run__chip pipeline-run__chip--${item.stages[stageId].status}`}
                            title={`${STAGE_SHORT[stageId]}: ${statusLabel[item.stages[stageId].status]}`}
                          >
                            {STAGE_ICONS[stageId]}
                          </span>
                        ) : (
                          <StageBadge key={stageId} status={item.stages[stageId].status} />
                        ),
                      )}
                    </div>
                  </Link>
                </li>
              ))}
              {!runs.length && <li className="pipeline-empty">Пока нет прогонов</li>}
            </ul>
          </section>
        </aside>

        {run ? (
          <section className="pipeline-main">
            <div className="pipeline-card">
              <div className="pipeline-toolbar">
                <div>
                  <h2>{run.title}</h2>
                  <p className="pipeline-meta">ID: {run.id}</p>
                  {run.courseDataDir && (
                    <p className="pipeline-meta">
                      Папка: <code>app/origami_app/tutorials/{run.courseDataDir}</code>
                    </p>
                  )}
                </div>
                <div className="pipeline-toolbar__actions">
                  {isProcessing && (
                    <actionFetcher.Form method="post" className="pipeline-run-form">
                      <input type="hidden" name="intent" value="stop-pipeline" />
                      <input type="hidden" name="runId" value={run.id} />
                      <button type="submit" className="pipeline-button pipeline-button--stop" disabled={isSubmitting}>
                        Остановить
                      </button>
                    </actionFetcher.Form>
                  )}
                  <button
                    type="button"
                    className="pipeline-button pipeline-button--ghost"
                    onClick={() => setCompact((value) => !value)}
                  >
                    {compact ? 'Развернуть' : 'Компактно'}
                  </button>
                  <actionFetcher.Form method="post" className="pipeline-run-form">
                    <input type="hidden" name="intent" value="run-all" />
                    <input type="hidden" name="runId" value={run.id} />
                    <input type="hidden" name="targetStageId" value={targetStage} />
                    <button
                      type="submit"
                      className="pipeline-button"
                      disabled={!hasApiKey || anyStageActive || !run.artifacts.reference}
                    >
                      До: {STAGE_SHORT[targetStage]}
                    </button>
                  </actionFetcher.Form>
                </div>
              </div>

              <PipelineFlow
                run={run}
                targetStage={targetStage}
                onTargetChange={setTargetStage}
                compact={compact}
              />

              <p className="pipeline-flow__hint">
                Клик по иконке этапа — выбрать, до куда запускать pipeline. Подсвечены этапы в диапазоне.
              </p>

              <div className="pipeline-steps-wrap">
                <button
                  type="button"
                  className="pipeline-steps-toggle"
                  onClick={() => setStepsOpen((value) => !value)}
                >
                  <span>{stepsOpen ? '▾' : '▸'}</span>
                  <strong>Детали этапов</strong>
                  <span className="pipeline-steps-toggle__meta">{STAGE_ORDER.length} шагов</span>
                </button>

                {stepsOpen && (
              <ol className={`pipeline-steps ${compact ? 'pipeline-steps--compact' : ''}`}>
                {STAGE_ORDER.map((stageId) => {
                  const stage = run.stages[stageId];
                  const artifactReady =
                    stageId === 'reference'
                      ? Boolean(run.artifacts.reference)
                      : stageId === 'upscale'
                        ? Boolean(run.artifacts.upscaledSketch)
                        : stageId === 'export'
                          ? Boolean(run.courseDataDir)
                          : stageId === 'source'
                            ? run.stages.source.status === 'done'
                            : stageId === 'tutorial'
                              ? run.stages.tutorial.status === 'done'
                              : Boolean(run.artifacts[stageId as 'sketch' | 'plan' | 'svg']);

                  const needsApiKey =
                    stageId === 'sketch' ||
                    stageId === 'upscale' ||
                    stageId === 'plan' ||
                    (stageId === 'svg' && run.config.svgModel !== 'local') ||
                    stageId === 'tutorial';
                  const stageBlocked =
                    (stageId === 'sketch' && !run.artifacts.reference) ||
                    (stageId === 'upscale' && !run.artifacts.sketch) ||
                    (stageId === 'plan' && !run.artifacts.sketch) ||
                    (stageId === 'svg' && !(run.artifacts.upscaledSketch ?? run.artifacts.sketch)) ||
                    (stageId === 'export' &&
                      (!run.artifacts.sketch || !run.artifacts.plan || !run.artifacts.svg)) ||
                    (stageId === 'source' && (!run.artifacts.plan || !run.artifacts.svg)) ||
                    (stageId === 'tutorial' && (!run.artifacts.plan || !run.artifacts.svg));

                  return (
                    <li
                      key={stageId}
                      className={`pipeline-step pipeline-step--${stage.status} ${artifactReady ? 'pipeline-step--ready' : ''} ${compact ? 'pipeline-step--compact' : ''}`}
                    >
                      <div className="pipeline-step__head">
                        <div className="pipeline-step__info">
                          <span className="pipeline-step__icon" aria-hidden>
                            {STAGE_ICONS[stageId]}
                          </span>
                          <div>
                          <strong>{compact ? STAGE_SHORT[stageId] : stage.label}</strong>
                          <StageBadge status={stage.status} compact={compact} />
                          {!compact && <p className="pipeline-step__hint">{stageHint[stageId]}</p>}
                          {(stage.startedAt || stage.finishedAt) && (
                            <p className="pipeline-step__time">
                              {stage.startedAt && <>Старт: {new Date(stage.startedAt).toLocaleTimeString('ru-RU')}</>}
                              {stage.startedAt && (stage.status === 'running' || stage.finishedAt) && ' · '}
                              <LiveDuration
                                startedAt={stage.startedAt}
                                finishedAt={stage.finishedAt}
                                active={stage.status === 'running'}
                              />
                              {stage.requestId && <> · request #{stage.requestId}</>}
                            </p>
                          )}
                          </div>
                        </div>
                        <div className="pipeline-step__actions">
                          {stageId !== 'reference' && stage.status !== 'running' && stage.status !== 'pending' && (
                            <actionFetcher.Form method="post">
                              <input type="hidden" name="intent" value="run-stage" />
                              <input type="hidden" name="runId" value={run.id} />
                              <input type="hidden" name="stageId" value={stageId} />
                              <button
                                type="submit"
                                className="pipeline-button pipeline-button--ghost"
                                disabled={(needsApiKey && !hasApiKey) || anyStageActive || stageBlocked}
                              >
                                {stage.status === 'error' ? 'Повторить' : 'Запустить'}
                              </button>
                            </actionFetcher.Form>
                          )}
                          {stage.status === 'error' && (
                            <actionFetcher.Form method="post">
                              <input type="hidden" name="intent" value="reset-stage" />
                              <input type="hidden" name="runId" value={run.id} />
                              <input type="hidden" name="stageId" value={stageId} />
                              <button type="submit" className="pipeline-button pipeline-button--ghost" disabled={anyStageActive}>
                                Сбросить
                              </button>
                            </actionFetcher.Form>
                          )}
                        </div>
                      </div>
                      {stage.error && <p className="pipeline-error">{stage.error}</p>}
                      {artifactReady && stage.status === 'done' && (
                        <p className="pipeline-step__done">
                          {stageId === 'export' || stageId === 'source' || stageId === 'tutorial'
                            ? `Сохранено в course/data`
                            : 'Файл сохранён локально'}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
                )}
              </div>
            </div>

            <details className="pipeline-card pipeline-card--fold">
              <summary>Промпты и настройки</summary>
            <form method="post" className="pipeline-config-form">
              <input type="hidden" name="intent" value="save-config" />
              <input type="hidden" name="runId" value={run.id} />
              <div className="pipeline-grid">
                <label className="pipeline-field">
                  <span>Модель скетча</span>
                  <input name="sketchModel" defaultValue={run.config.sketchModel} />
                </label>
                <label className="pipeline-field">
                  <span>Модель upscale</span>
                  <input name="upscaleModel" defaultValue={run.config.upscaleModel} />
                </label>
                <label className="pipeline-field">
                  <span>Модель плана</span>
                  <input name="planModel" defaultValue={run.config.planModel} />
                </label>
                <label className="pipeline-field">
                  <span>Модель SVG (local · image-2-svg · gpt-5-6-luna)</span>
                  <input name="svgModel" defaultValue={run.config.svgModel} />
                </label>
                <label className="pipeline-field">
                  <span>Модель tutorial JSON</span>
                  <input name="tutorialModel" defaultValue={run.config.tutorialModel ?? 'gpt-5-6-luna'} />
                </label>
                <label className="pipeline-field">
                  <span>Качество скетча</span>
                  <select name="sketchQuality" defaultValue={run.config.sketchQuality ?? 'low'}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </label>
                <label className="pipeline-field">
                  <span>Размер скетча</span>
                  <input name="sketchSize" defaultValue={run.config.sketchSize} />
                </label>
                <label className="pipeline-field">
                  <span>Формат скетча</span>
                  <input name="sketchFormat" defaultValue={run.config.sketchFormat} />
                </label>
                <label className="pipeline-field">
                  <span>Кол-во изображений</span>
                  <input name="sketchNumImages" type="number" min={1} max={1} defaultValue={run.config.sketchNumImages ?? 1} />
                </label>
              </div>
              <label className="pipeline-field">
                <span>Промпт скетча</span>
                <textarea name="sketchPrompt" rows={12} defaultValue={run.config.sketchPrompt} />
              </label>
              <label className="pipeline-field">
                <span>Промпт плана рисования</span>
                <textarea name="planPrompt" rows={12} defaultValue={run.config.planPrompt} />
              </label>
              <label className="pipeline-field">
                <span>Промпт SVG (только для LLM-режима, не local/image-2-svg)</span>
                <textarea name="svgPrompt" rows={14} defaultValue={run.config.svgPrompt} />
              </label>
              <label className="pipeline-field">
                <span>Промпт tutorial JSON (architectural-line-art-json)</span>
                <textarea name="tutorialPrompt" rows={14} defaultValue={run.config.tutorialPrompt} />
              </label>
              <details className="pipeline-details">
                <summary>Настройки SeedVR upscale</summary>
                <textarea
                  name="upscaleSettings"
                  rows={8}
                  defaultValue={JSON.stringify(run.config.upscaleSettings, null, 2)}
                />
              </details>
              <details className="pipeline-details">
                <summary>Настройки Potrace (local vectorize)</summary>
                <textarea
                  name="vectorizeSettings"
                  rows={10}
                  defaultValue={JSON.stringify(run.config.vectorizeSettings, null, 2)}
                />
              </details>
              <details className="pipeline-details">
                <summary>Настройки GenAPI image-2-svg</summary>
                <textarea
                  name="svgSettings"
                  rows={10}
                  defaultValue={JSON.stringify(run.config.svgSettings, null, 2)}
                />
              </details>
              <button type="submit" className="pipeline-button pipeline-button--ghost" disabled={anyStageActive}>
                Сохранить настройки
              </button>
            </form>
            </details>

            <div className={`pipeline-artifacts ${compact ? 'pipeline-artifacts--compact' : ''}`}>
              <ArtifactCard
                title="1. Референс"
                icon={STAGE_ICONS.reference}
                filename={run.artifacts.reference}
                runId={run.id}
                kind="image"
                stage={run.stages.reference}
                compact={compact}
                defaultOpen
              />
              <ArtifactCard
                title="2. Скетч"
                icon={STAGE_ICONS.sketch}
                filename={run.artifacts.sketch}
                runId={run.id}
                kind="image"
                stage={run.stages.sketch}
                compact={compact}
              />
              <ArtifactCard
                title="3. Upscaled скетч"
                icon={STAGE_ICONS.upscale}
                filename={run.artifacts.upscaledSketch}
                runId={run.id}
                kind="image"
                stage={run.stages.upscale}
                compact={compact}
              />
              <ArtifactCard
                title="4. План рисования"
                icon={STAGE_ICONS.plan}
                filename={run.artifacts.plan}
                runId={run.id}
                kind="text"
                text={run.planPreview}
                stage={run.stages.plan}
                compact={compact}
              />
              <ArtifactCard
                title="5. SVG"
                icon={STAGE_ICONS.svg}
                filename={run.artifacts.svg}
                runId={run.id}
                kind="svg"
                stage={run.stages.svg}
                compact={compact}
              />
              <ArtifactCard
                title="6. course/data"
                icon={STAGE_ICONS.export}
                runId={run.id}
                kind="text"
                text={
                  run.courseDataDir
                    ? `Экспорт: app/origami_app/tutorials/${run.courseDataDir}\n\nreference, sketch, upscaled-sketch, plan.md, output.svg, manifest.json, source.json, tutorial.json`
                    : undefined
                }
                downloadHref={
                  run.exportSlug && run.stages.export.status === 'done'
                    ? `/admin/pipeline/course/${run.exportSlug}/manifest.json`
                    : undefined
                }
                stage={run.stages.export}
                compact={compact}
              />
              <ArtifactCard
                title="7. source.json"
                icon={STAGE_ICONS.source}
                runId={run.id}
                kind="text"
                text={run.sourcePreview}
                downloadHref={
                  run.exportSlug && run.stages.source.status === 'done'
                    ? `/admin/pipeline/course/${run.exportSlug}/source.json`
                    : undefined
                }
                stage={run.stages.source}
                compact={compact}
              />
              <ArtifactCard
                title="8. tutorial.json"
                icon={STAGE_ICONS.tutorial}
                runId={run.id}
                kind="text"
                text={
                  run.tutorialPreview
                    ? `${run.tutorialPreview}\n\nОпубликовано: app/origami_app/tutorials/${run.exportSlug ?? '…'}.json`
                    : undefined
                }
                downloadHref={
                  run.exportSlug && run.stages.tutorial.status === 'done'
                    ? `/admin/pipeline/course/${run.exportSlug}/tutorial.json`
                    : undefined
                }
                stage={run.stages.tutorial}
                compact={compact}
              />
            </div>
          </section>
        ) : (
          <section className="pipeline-main pipeline-main--empty">
            <div className="pipeline-card">
              <h2>Выберите прогон или создайте новый</h2>
              <p>Загрузите референс, затем запускайте этапы по одному или весь pipeline сразу.</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
