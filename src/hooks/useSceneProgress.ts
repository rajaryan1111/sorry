import { useEffect, useState } from 'react';

interface SceneProgress {
  activeScene: number;
  scrollProgress: number;
  sectionProgress: number;
}

export function useSceneProgress(sceneTotal: number): SceneProgress {
  const [state, setState] = useState<SceneProgress>({
    activeScene: 0,
    scrollProgress: 0,
    sectionProgress: 0,
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const scrollProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-scene-index]'),
      );

      let activeScene = 0;
      let closest = Number.POSITIVE_INFINITY;
      let sectionProgress = 0;

      sections.forEach((section) => {
        const index = Number(section.dataset.sceneIndex || 0);
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.36);

        if (distance < closest) {
          closest = distance;
          activeScene = index;
          sectionProgress = Math.min(
            Math.max((window.innerHeight * 0.45 - rect.top) / rect.height, 0),
            1,
          );
        }
      });

      setState((previous) => {
        if (
          previous.activeScene === activeScene &&
          Math.abs(previous.scrollProgress - scrollProgress) < 0.001 &&
          Math.abs(previous.sectionProgress - sectionProgress) < 0.001
        ) {
          return previous;
        }

        return {
          activeScene: Math.min(activeScene, sceneTotal - 1),
          scrollProgress,
          sectionProgress,
        };
      });
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [sceneTotal]);

  return state;
}
