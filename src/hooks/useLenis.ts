import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis(disabled = false) {
  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      smoothWheel: true,
    });

    return () => {
      lenis.destroy();
    };
  }, [disabled]);
}
