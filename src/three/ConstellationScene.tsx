import { useMemo, useRef } from 'react';
import { Line } from '@react-three/drei';
import { type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { littleThingsStars, type LittleThingId } from '../data/apologyContent';
import { setHoverCursor } from '../hooks/useHoverCursor';
import { damp } from '../lib/math';

interface ConstellationSceneProps {
  opacity: number;
  activeStarIds: LittleThingId[];
  highlightedStar: LittleThingId | null;
  disconnected: boolean;
  reconnecting: boolean;
  interactive: boolean;
  reducedMotion: boolean;
  viewport: 'phone' | 'tablet' | 'desktop';
  onActivateStar: (star: LittleThingId) => void;
  onHighlightStar: (star: LittleThingId | null) => void;
}

const desktopStarPositions: Record<LittleThingId, [number, number, number]> = {
  college: [-2.15, 0.64, -0.2],
  study: [-1.42, 1.28, 0.28],
  food: [-0.72, 0.82, 0.1],
  gym: [0.05, 1.42, -0.18],
  talks: [0.86, 0.88, 0.22],
  teasing: [1.68, 1.18, -0.08],
  complaining: [2.02, 0.28, 0.2],
  nothing: [0.56, -0.26, -0.14],
  laughing: [-1.14, -0.03, 0.18],
};

const phoneStarPositions: Record<LittleThingId, [number, number, number]> = {
  college: [-1.18, 0.56, -0.1],
  study: [-0.78, 1.18, 0.18],
  food: [-0.2, 0.78, 0.08],
  gym: [0.28, 1.34, -0.12],
  talks: [0.78, 0.86, 0.16],
  teasing: [1.16, 0.32, -0.06],
  complaining: [0.48, -0.16, 0.12],
  nothing: [-0.12, -0.48, -0.08],
  laughing: [-0.9, -0.1, 0.12],
};

const tabletStarPositions: Record<LittleThingId, [number, number, number]> = {
  college: [-1.68, 0.62, -0.16],
  study: [-1.05, 1.24, 0.24],
  food: [-0.42, 0.82, 0.1],
  gym: [0.26, 1.42, -0.16],
  talks: [0.92, 0.88, 0.22],
  teasing: [1.48, 0.48, -0.08],
  complaining: [1.28, -0.12, 0.18],
  nothing: [0.18, -0.46, -0.12],
  laughing: [-1.02, -0.06, 0.16],
};

function getStarPositions(viewport: 'phone' | 'tablet' | 'desktop') {
  if (viewport === 'phone') return phoneStarPositions;
  if (viewport === 'tablet') return tabletStarPositions;
  return desktopStarPositions;
}

function BrightStar({
  id,
  position,
  opacity,
  activated,
  highlighted,
  interactive,
  reducedMotion,
  onActivateStar,
  onHighlightStar,
}: {
  id: LittleThingId;
  position: [number, number, number];
  opacity: number;
  activated: boolean;
  highlighted: boolean;
  interactive: boolean;
  reducedMotion: boolean;
  onActivateStar: (star: LittleThingId) => void;
  onHighlightStar: (star: LittleThingId | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.4 + position[0]) * 0.12;
    const target = activated || highlighted ? 1.35 * pulse : pulse;
    meshRef.current.scale.setScalar(damp(meshRef.current.scale.x, target, 7, delta));
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    onActivateStar(id);
    onHighlightStar(id);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    setHoverCursor(true);
    onHighlightStar(id);
  };

  const handlePointerOut = () => {
    if (!interactive) return;
    setHoverCursor(false);
    if (!activated) onHighlightStar(null);
  };

  return (
    <group position={position} onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <mesh visible={interactive}>
        <sphereGeometry args={[0.25, 12, 8]} />
        <meshBasicMaterial transparent opacity={0.001} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial
          color={activated || highlighted ? '#fff3c9' : '#d9ecff'}
          transparent
          opacity={opacity * (activated ? 1 : 0.72)}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.17, 18, 12]} />
        <meshBasicMaterial
          color={activated || highlighted ? '#f7c978' : '#86bfff'}
          transparent
          opacity={opacity * (activated || highlighted ? 0.18 : 0.09)}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function DistantStars({ count, opacity, reducedMotion }: { count: number; opacity: number; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 7.5;
      values[index * 3 + 1] = (Math.random() - 0.3) * 4.8;
      values[index * 3 + 2] = -1.6 - Math.random() * 4.2;
    }
    return values;
  }, [count]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.z += delta * (reducedMotion ? 0.002 : 0.012);
    pointsRef.current.position.x = damp(pointsRef.current.position.x, pointer.x * 0.08, 2.8, delta);
    pointsRef.current.position.y = damp(pointsRef.current.position.y, pointer.y * 0.05, 2.8, delta);
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#b8d8ff"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={opacity * 0.34}
        depthWrite={false}
      />
    </points>
  );
}

export function ConstellationScene({
  opacity,
  activeStarIds,
  highlightedStar,
  disconnected,
  reconnecting,
  interactive,
  reducedMotion,
  viewport,
  onActivateStar,
  onHighlightStar,
}: ConstellationSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const activeSet = useMemo(() => new Set(activeStarIds), [activeStarIds]);
  const constellationReady = activeStarIds.length >= 4;
  const starPositions = getStarPositions(viewport);
  const groupScale = viewport === 'phone' ? 0.94 : viewport === 'tablet' ? 0.98 : 1;
  const groupY = viewport === 'phone' ? 0.06 : -0.12;
  const distantStarCount = reducedMotion ? 50 : viewport === 'phone' ? 90 : viewport === 'tablet' ? 120 : 150;

  const orderedActivePoints = useMemo(() => {
    const ids = littleThingsStars
      .map((star) => star.id)
      .filter((id) => (constellationReady ? activeSet.has(id) : false));
    return ids.map((id) => starPositions[id]);
  }, [activeSet, constellationReady, starPositions]);

  const brokenSegments = useMemo(() => {
    const fallback = littleThingsStars.slice(0, 6).map((star) => starPositions[star.id]);
    const points = orderedActivePoints.length >= 4 ? orderedActivePoints : fallback;
    return [points.slice(0, 2), points.slice(3, 5), points.slice(5, 7)].filter((segment) => segment.length > 1);
  }, [orderedActivePoints, starPositions]);

  const reconnectingSegments = useMemo(
    () => [
      [starPositions.college, starPositions.study],
      [starPositions.nothing, starPositions.laughing],
    ],
    [starPositions],
  );

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;
    const parallax = viewport === 'desktop' ? 1 : 0.45;
    groupRef.current.rotation.y = damp(groupRef.current.rotation.y, pointer.x * 0.06 * parallax, 2.4, delta);
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, -pointer.y * 0.035 * parallax, 2.4, delta);
  });

  if (opacity <= 0.012) return null;

  return (
    <group ref={groupRef} position={[0, groupY, 0]} scale={groupScale}>
      <DistantStars count={distantStarCount} opacity={opacity} reducedMotion={reducedMotion} />

      {littleThingsStars.map((star) => {
        const activated = activeSet.has(star.id);
        return (
          <BrightStar
            key={star.id}
            id={star.id}
            position={starPositions[star.id]}
            opacity={opacity}
            activated={activated}
            highlighted={highlightedStar === star.id}
            interactive={interactive}
            reducedMotion={reducedMotion}
            onActivateStar={onActivateStar}
            onHighlightStar={onHighlightStar}
          />
        );
      })}

      {constellationReady && !disconnected && !reconnecting ? (
        <Line points={orderedActivePoints} color="#f5d393" lineWidth={1.05} transparent opacity={opacity * 0.54} />
      ) : null}

      {disconnected
        ? brokenSegments.map((segment, index) => (
            <Line
              key={`broken-${index}`}
              points={segment}
              color="#8fb8ff"
              lineWidth={0.72}
              transparent
              opacity={opacity * 0.23}
            />
          ))
        : null}

      {reconnecting
        ? reconnectingSegments.map((segment, index) => (
            <Line
              key={`reconnect-${index}`}
              points={segment}
              color="#f6d89a"
              lineWidth={0.78}
              transparent
              opacity={opacity * 0.34}
            />
          ))
        : null}
    </group>
  );
}
