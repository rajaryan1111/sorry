import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from '../lib/math';

interface BackgroundParticlesProps {
  count: number;
  reducedMotion: boolean;
}

export function BackgroundParticles({ count, reducedMotion }: BackgroundParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[index * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      values[index * 3 + 1] = Math.cos(phi) * radius * 0.56 + Math.random() * 1.8;
      values[index * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius - 3;
    }

    return values;
  }, [count]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    const speed = reducedMotion ? 0.04 : 0.12;
    pointsRef.current.rotation.y += delta * speed * 0.035;
    pointsRef.current.rotation.x = damp(
      pointsRef.current.rotation.x,
      pointer.y * (reducedMotion ? 0.008 : 0.035),
      2.2,
      delta,
    );
    pointsRef.current.position.x = damp(
      pointsRef.current.position.x,
      pointer.x * (reducedMotion ? 0.04 : 0.18),
      2.6,
      delta,
    );
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a9cfff"
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.34}
        depthWrite={false}
      />
    </points>
  );
}
