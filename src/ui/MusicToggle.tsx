import { useCallback, useEffect, useRef, useState } from 'react';

interface AmbientEngine {
  context: AudioContext;
  master: GainNode;
  oscillators: OscillatorNode[];
  noise?: AudioBufferSourceNode;
}

function createNoiseBuffer(context: AudioContext) {
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * 0.08;
  }

  return buffer;
}

function createAmbientEngine(): AmbientEngine {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  const context = new AudioCtor();
  const master = context.createGain();
  const filter = context.createBiquadFilter();
  const padGain = context.createGain();
  const noiseGain = context.createGain();
  const oscillators: OscillatorNode[] = [];

  master.gain.value = 0;
  filter.type = 'lowpass';
  filter.frequency.value = 520;
  filter.Q.value = 0.58;
  padGain.gain.value = 0.045;
  noiseGain.gain.value = 0.006;

  [110, 164.8, 220.4].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const voiceGain = context.createGain();
    oscillator.type = index === 1 ? 'triangle' : 'sine';
    oscillator.frequency.value = frequency;
    voiceGain.gain.value = index === 1 ? 0.018 : 0.014;
    oscillator.connect(voiceGain).connect(padGain);
    oscillator.start();
    oscillators.push(oscillator);
  });

  const noise = context.createBufferSource();
  noise.buffer = createNoiseBuffer(context);
  noise.loop = true;
  noise.connect(noiseGain);
  noise.start();

  padGain.connect(filter);
  noiseGain.connect(filter);
  filter.connect(master);
  master.connect(context.destination);

  return { context, master, oscillators, noise };
}

export function MusicToggle() {
  const [enabled, setEnabled] = useState(false);
  const engineRef = useRef<AmbientEngine | null>(null);

  const fadeTo = useCallback((target: number) => {
    const engine = engineRef.current;
    if (!engine) return;

    const { context, master } = engine;
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.linearRampToValueAtTime(target, context.currentTime + 1.1);
  }, []);

  const start = useCallback(async () => {
    if (!engineRef.current) {
      engineRef.current = createAmbientEngine();
    }

    if (engineRef.current.context.state === 'suspended') {
      await engineRef.current.context.resume();
    }

    fadeTo(0.026);
    setEnabled(true);
  }, [fadeTo]);

  const stop = useCallback(() => {
    fadeTo(0);
    setEnabled(false);
  }, [fadeTo]);

  useEffect(() => {
    return () => {
      const engine = engineRef.current;
      if (!engine) return;

      engine.oscillators.forEach((oscillator) => oscillator.stop());
      engine.noise?.stop();
      void engine.context.close();
    };
  }, []);

  return (
    <button
      className="music-toggle"
      type="button"
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute ambient sound' : 'Play optional ambient sound'}
      onClick={() => {
        if (enabled) {
          stop();
        } else {
          void start();
        }
      }}
    >
      <span aria-hidden="true">{enabled ? '🔊' : '🔇'}</span>
      <span className="sr-only">{enabled ? 'Sound on' : 'Sound muted'}</span>
    </button>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
