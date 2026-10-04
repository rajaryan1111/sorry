import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { CanvasErrorBoundary } from './components/CanvasErrorBoundary';
import { WebGLFallback } from './components/WebGLFallback';
import { sceneCount, type EverydayMemoryId, type LittleThingId } from './data/apologyContent';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useSceneProgress } from './hooks/useSceneProgress';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { setHoverCursor } from './hooks/useHoverCursor';
import { LittleThingPanel } from './memory/LittleThingPanel';
import { MemoryPanel } from './memory/MemoryPanel';
import { ApologyScene } from './scenes/ApologyScene';
import { EndingScene } from './scenes/EndingScene';
import { EverydayScene } from './scenes/EverydayScene';
import { IntroScene } from './scenes/IntroScene';
import { LetterScene } from './scenes/LetterScene';
import { LittleThingsScene } from './scenes/LittleThingsScene';
import { MusicToggle } from './ui/MusicToggle';
import { ProgressIndicator } from './ui/ProgressIndicator';

const ExperienceCanvas = lazy(() =>
  import('./components/ExperienceCanvas').then((module) => ({ default: module.ExperienceCanvas })),
);

function scrollToScene(index: number, reducedMotion: boolean) {
  const scene = document.querySelector<HTMLElement>(`[data-scene-index="${index}"]`);
  scene?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();
  const { activeScene, scrollProgress } = useSceneProgress(sceneCount);
  const [selectedMemory, setSelectedMemory] = useState<EverydayMemoryId | null>(null);
  const [activeStarIds, setActiveStarIds] = useState<LittleThingId[]>([]);
  const [highlightedStar, setHighlightedStar] = useState<LittleThingId | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterCompleted, setLetterCompleted] = useState(false);
  const [lastThingOpen, setLastThingOpen] = useState(false);

  useLenis(reducedMotion);

  const handleActivateStar = useCallback((star: LittleThingId) => {
    setActiveStarIds((current) => (current.includes(star) ? current : [...current, star]));
    setHighlightedStar(star);
  }, []);

  const handleCloseLetter = useCallback(() => {
    setLetterOpen(false);
    setLetterCompleted(true);
  }, []);

  useEffect(() => {
    if (activeScene !== 1) setSelectedMemory(null);
    if (activeScene !== 2) setHighlightedStar(null);
    setHoverCursor(false);
  }, [activeScene]);

  return (
    <div className={`app app--scene-${activeScene}`}>
      <a className="skip-link" href="#intro-title">
        Skip to content
      </a>

      <div className="canvas-shell" aria-hidden="true">
        {webglSupported ? (
          <CanvasErrorBoundary>
            <Suspense fallback={<WebGLFallback />}>
              <ExperienceCanvas
                activeScene={activeScene}
                scrollProgress={scrollProgress}
                reducedMotion={reducedMotion}
                activeStarIds={activeStarIds}
                highlightedStar={highlightedStar}
                letterOpen={letterOpen}
                lastThingOpen={lastThingOpen}
                onMemorySelect={setSelectedMemory}
                onActivateStar={handleActivateStar}
                onHighlightStar={setHighlightedStar}
                onOpenLetter={() => setLetterOpen(true)}
              />
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <WebGLFallback />
        )}
      </div>

      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="scene-darkener" aria-hidden="true" />
      <ProgressIndicator activeScene={activeScene} progress={scrollProgress} />
      <MusicToggle />

      <main>
        <IntroScene onStart={() => scrollToScene(1, reducedMotion)} />
        <EverydayScene onMemorySelect={setSelectedMemory} />
        <LittleThingsScene activatedCount={activeStarIds.length} onActivateStar={handleActivateStar} />
        <ApologyScene />
        <LetterScene
          letterOpen={letterOpen}
          letterCompleted={letterCompleted}
          onOpenLetter={() => setLetterOpen(true)}
          onCloseLetter={handleCloseLetter}
        />
        <EndingScene lastThingOpen={lastThingOpen} onOpenLastThing={() => setLastThingOpen(true)} />
      </main>

      <MemoryPanel selectedMemory={selectedMemory} onClose={() => setSelectedMemory(null)} />
      <LittleThingPanel highlightedStar={highlightedStar} activatedCount={activeStarIds.length} />
    </div>
  );
}
