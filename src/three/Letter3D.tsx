import { useMemo, useRef } from 'react';
import { Float } from '@react-three/drei';
import { type ThreeEvent, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { setHoverCursor } from '../hooks/useHoverCursor';
import { damp } from '../lib/math';

interface Letter3DProps {
  opacity: number;
  open: boolean;
  interactive: boolean;
  reducedMotion: boolean;
  isCompact: boolean;
  onOpenLetter: () => void;
}

function useFlapGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.25, 0);
    shape.lineTo(0, 0.76);
    shape.lineTo(1.25, 0);
    shape.lineTo(-1.25, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);
}

function useSideGeometry(direction: 'left' | 'right') {
  return useMemo(() => {
    const sign = direction === 'left' ? -1 : 1;
    const shape = new THREE.Shape();
    shape.moveTo(sign * 1.25, -0.72);
    shape.lineTo(0, -0.1);
    shape.lineTo(sign * 1.25, 0.72);
    shape.lineTo(sign * 1.25, -0.72);
    return new THREE.ShapeGeometry(shape);
  }, [direction]);
}

export function Letter3D({ opacity, open, interactive, reducedMotion, isCompact, onOpenLetter }: Letter3DProps) {
  const flapGeometry = useFlapGeometry();
  const leftGeometry = useSideGeometry('left');
  const rightGeometry = useSideGeometry('right');
  const flapRef = useRef<THREE.Group>(null);
  const paperRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const floatIntensity = isCompact ? 0.02 : 0.045;
  const rotationIntensity = isCompact ? 0.012 : 0.035;
  const letterScale = isCompact ? 0.86 : 1.15;
  const letterY = isCompact ? -0.48 : -0.35;

  useFrame(({ clock }, delta) => {
    const speed = reducedMotion ? 12 : 4.8;
    if (flapRef.current) {
      flapRef.current.rotation.x = damp(flapRef.current.rotation.x, open ? -2.48 : 0.02, speed, delta);
    }
    if (paperRef.current) {
      paperRef.current.position.y = damp(paperRef.current.position.y, open ? 0.56 : -0.1, speed, delta);
      paperRef.current.scale.y = damp(paperRef.current.scale.y, open ? 1 : 0.64, speed, delta);
    }
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * (isCompact ? 0.025 : 0.055);
      groupRef.current.position.y = letterY + Math.sin(clock.elapsedTime * 0.48) * (isCompact ? 0.012 : 0.03);
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    onOpenLetter();
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    setHoverCursor(true);
  };

  const handlePointerOut = () => setHoverCursor(false);

  if (opacity <= 0.012) return null;

  return (
    <Float speed={0.7} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <group
        ref={groupRef}
        position={[0, letterY, 0]}
        rotation={[-0.08, 0, 0]}
        scale={letterScale}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh ref={paperRef} position={[0, -0.1, -0.04]} castShadow>
          <boxGeometry args={[2.08, 1.42, 0.018]} />
          <meshStandardMaterial
            color="#f4ead4"
            emissive="#8f7449"
            emissiveIntensity={0.05}
            roughness={0.74}
            transparent
            opacity={opacity * (open ? 0.94 : 0.1)}
          />
        </mesh>

        <mesh position={[0, 0, 0.015]} castShadow>
          <boxGeometry args={[2.58, 1.52, 0.05]} />
          <meshStandardMaterial
            color="#b88f63"
            emissive="#7d5633"
            emissiveIntensity={0.12}
            roughness={0.68}
            transparent
            opacity={opacity * 0.84}
          />
        </mesh>
        <mesh geometry={leftGeometry} position={[0, 0, 0.056]}>
          <meshStandardMaterial color="#d0a979" roughness={0.7} transparent opacity={opacity * 0.92} />
        </mesh>
        <mesh geometry={rightGeometry} position={[0, 0, 0.058]}>
          <meshStandardMaterial color="#c59d70" roughness={0.7} transparent opacity={opacity * 0.92} />
        </mesh>
        <group ref={flapRef} position={[0, 0.74, 0.08]}>
          <mesh geometry={flapGeometry} castShadow>
            <meshStandardMaterial
              color="#e0bf8d"
              emissive="#926236"
              emissiveIntensity={0.1}
              roughness={0.66}
              side={THREE.DoubleSide}
              transparent
              opacity={opacity * 0.94}
            />
          </mesh>
        </group>
        <mesh position={[0, -0.08, 0.11]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshStandardMaterial
            color="#f0d18d"
            emissive="#f4c56f"
            emissiveIntensity={0.42}
            roughness={0.42}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>
        <pointLight color="#ffd99c" position={[0, 0.2, 0.5]} intensity={opacity * 0.48} distance={2.8} />
      </group>
    </Float>
  );
}
