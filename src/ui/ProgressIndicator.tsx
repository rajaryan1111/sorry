import { sceneCount, sceneLabels } from '../data/apologyContent';

interface ProgressIndicatorProps {
  activeScene: number;
  progress: number;
}

export function ProgressIndicator({ activeScene, progress }: ProgressIndicatorProps) {
  const current = Math.min(Math.max(activeScene + 1, 1), sceneCount);

  return (
    <aside className="progress-indicator" aria-label="Experience progress">
      <span className="progress-indicator__count">
        {String(current).padStart(2, '0')} / {String(sceneCount).padStart(2, '0')}
      </span>
      <span className="progress-indicator__label">{sceneLabels[activeScene]}</span>
      <span className="progress-indicator__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </span>
    </aside>
  );
}
