import { useEffect, useState } from 'react';

function canUseWebGL() {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return Boolean(context);
  } catch (_error) {
    return false;
  }
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(canUseWebGL());
  }, []);

  return supported;
}
