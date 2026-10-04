import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TinyStarProps {
  opacity: number;
  reducedMotion: boolean;
}

export function TinyStar({ opacity, reducedMotion }: TinyStarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.8) * 0.16;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(pulse);
    }
    if (lightRef.current) {
      lightRef.current.intensity = opacity * (0.75 + pulse * 0.4);
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group>
      <pointLight ref={lightRef} position={[0, 0, 0.2]} color="#c8e2ff" distance={5} intensity={opacity} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshBasicMaterial color="#e9f4ff" transparent opacity={opacity} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="#88c8ff" transparent opacity={opacity * 0.12} depthWrite={false} />
      </mesh>
    </group>
  );
}
