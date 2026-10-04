import { useRef } from 'react';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from '../lib/math';

interface SeedlingSceneProps {
  opacity: number;
  growing: boolean;
  reducedMotion: boolean;
}

export function SeedlingScene({ opacity, growing, reducedMotion }: SeedlingSceneProps) {
  const stemRef = useRef<THREE.Mesh>(null);
  const leftLeafRef = useRef<THREE.Mesh>(null);
  const rightLeafRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const target = growing ? 1 : 0.04;
    const speed = reducedMotion ? 12 : 2.8;

    if (stemRef.current) {
      const next = damp(stemRef.current.scale.y, target, speed, delta);
      stemRef.current.scale.y = next;
      stemRef.current.position.y = 0.18 + next * 0.28;
    }

    const leafTarget = growing ? 1 : 0.02;
    [leftLeafRef.current, rightLeafRef.current].forEach((leaf) => {
      if (!leaf) return;
      const next = damp(leaf.scale.x, leafTarget, speed, delta);
      leaf.scale.set(next, next, next);
    });

    if (glowRef.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.2) * 0.08;
      glowRef.current.scale.setScalar(damp(glowRef.current.scale.x, growing ? pulse : 0.8, 3.2, delta));
    }
  });

  if (opacity <= 0.012) return null;

  return (
    <group position={[0, -1.28, 0]}>
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.45, 1.58, 0.08, 80]} />
        <meshStandardMaterial color="#050910" roughness={0.92} transparent opacity={opacity * 0.9} />
      </mesh>
      <Line
        points={[
          [-0.7, 0.015, 0.1],
          [-0.34, 0.028, -0.03],
          [-0.08, 0.02, 0.05],
          [0.22, 0.028, -0.02],
          [0.58, 0.018, 0.08],
        ]}
        color="#5a6f8d"
        lineWidth={0.8}
        transparent
        opacity={opacity * 0.52}
      />
      <mesh ref={glowRef} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.3, 32, 16]} />
        <meshBasicMaterial color="#bfe7aa" transparent opacity={opacity * (growing ? 0.08 : 0.03)} depthWrite={false} />
      </mesh>
      <mesh ref={stemRef} position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.025, 0.62, 14]} />
        <meshStandardMaterial color="#7fd07c" emissive="#3f8e42" emissiveIntensity={0.18} transparent opacity={opacity} />
      </mesh>
      <mesh ref={leftLeafRef} position={[-0.12, 0.72, 0]} rotation={[0.2, 0.1, 0.9]} scale={0.02} castShadow>
        <sphereGeometry args={[0.13, 24, 16]} />
        <meshStandardMaterial color="#8bd88a" emissive="#4e934d" emissiveIntensity={0.16} transparent opacity={opacity} />
      </mesh>
      <mesh ref={rightLeafRef} position={[0.13, 0.62, 0.02]} rotation={[0.08, -0.24, -0.86]} scale={0.02} castShadow>
        <sphereGeometry args={[0.12, 24, 16]} />
        <meshStandardMaterial color="#a3e5a0" emissive="#4e934d" emissiveIntensity={0.14} transparent opacity={opacity} />
      </mesh>
      <pointLight color="#bfe7aa" position={[0, 0.58, 0.4]} intensity={opacity * (growing ? 0.82 : 0.18)} distance={3.1} />
    </group>
  );
}
