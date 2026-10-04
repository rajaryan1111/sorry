import { Suspense, useMemo, useRef } from 'react';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneCount, type EverydayMemoryId, type LittleThingId } from '../data/apologyContent';
import { useIsMobile } from '../hooks/useIsMobile';
import { damp, sceneOpacity } from '../lib/math';
import { BackgroundParticles } from '../three/BackgroundParticles';
import { ConstellationScene } from '../three/ConstellationScene';
import { Letter3D } from '../three/Letter3D';
import { MiniatureWorld } from '../three/MiniatureWorld';
import { SeedlingScene } from '../three/SeedlingScene';
import { TinyStar } from '../three/TinyStar';

interface ExperienceCanvasProps {
  activeScene: number;
  scrollProgress: number;
  reducedMotion: boolean;
  activeStarIds: LittleThingId[];
  highlightedStar: LittleThingId | null;
  letterOpen: boolean;
  lastThingOpen: boolean;
  onMemorySelect: (memory: EverydayMemoryId) => void;
  onActivateStar: (star: LittleThingId) => void;
  onHighlightStar: (star: LittleThingId | null) => void;
  onOpenLetter: () => void;
}

const cameraTargets = [
  { position: [0, 0.18, 6.1], lookAt: [0, 0.02, 0] },
  { position: [3.0, 2.05, 5.65], lookAt: [0, -0.72, 0] },
  { position: [0, 0.78, 5.85], lookAt: [0, 0.55, 0] },
  { position: [0.28, 0.55, 6.35], lookAt: [0, 0.35, 0] },
  { position: [0, 0.28, 5.15], lookAt: [0, -0.08, 0] },
  { position: [0, 0.72, 5.65], lookAt: [0, -0.65, 0] },
] as const;

function CameraRig({ activeScene, reducedMotion }: { activeScene: number; reducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  const lookAtRef = useRef(new THREE.Vector3());

  useFrame((_state, delta) => {
    const target = cameraTargets[activeScene] ?? cameraTargets[0];
    const parallax = reducedMotion ? 0.16 : 1;

    camera.position.x = damp(camera.position.x, target.position[0] + pointer.x * 0.25 * parallax, 2.8, delta);
    camera.position.y = damp(camera.position.y, target.position[1] + pointer.y * 0.14 * parallax, 2.8, delta);
    camera.position.z = damp(camera.position.z, target.position[2], 2.8, delta);

    lookAtRef.current.set(
      target.lookAt[0] + pointer.x * 0.07 * parallax,
      target.lookAt[1] + pointer.y * 0.05 * parallax,
      target.lookAt[2],
    );
    camera.lookAt(lookAtRef.current);
  });

  return null;
}

function SceneStage({
  activeScene,
  scrollProgress,
  reducedMotion,
  activeStarIds,
  highlightedStar,
  letterOpen,
  lastThingOpen,
  onMemorySelect,
  onActivateStar,
  onHighlightStar,
  onOpenLetter,
  particleCount,
}: ExperienceCanvasProps & { particleCount: number }) {
  const sceneValue = scrollProgress * (sceneCount - 1);
  const introOpacity = sceneOpacity(sceneValue, 0, 0.9);
  const everydayOpacity = sceneOpacity(sceneValue, 1, 0.92);
  const littleThingsOpacity = sceneOpacity(sceneValue, 2, 0.94);
  const apologyOpacity = sceneOpacity(sceneValue, 3, 0.92);
  const letterOpacity = sceneOpacity(sceneValue, 4, 0.92);
  const endingOpacity = sceneOpacity(sceneValue, 5, 1.05);

  const constellationOpacity = Math.max(
    littleThingsOpacity,
    apologyOpacity * 0.52,
    endingOpacity * (lastThingOpen ? 0.18 : 0.08),
  );
  const disconnected = activeScene === 3 || apologyOpacity > littleThingsOpacity + 0.18;
  const reconnecting = activeScene === 5 && lastThingOpen;

  const warmIntensity = useMemo(() => (activeScene === 3 ? 0.14 : 0.28), [activeScene]);

  return (
    <>
      <CameraRig activeScene={activeScene} reducedMotion={reducedMotion} />
      <ambientLight intensity={warmIntensity} color="#b9d5ff" />
      <hemisphereLight args={["#7fb4ff", "#05060a", 0.42]} />
      <directionalLight
        position={[3.8, 4.2, 2.2]}
        color="#ffe1a8"
        intensity={activeScene === 3 ? 0.34 : 0.72}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight position={[-2.4, 1.9, 1.4]} color="#8fc7ff" intensity={0.28} distance={6.5} />

      <BackgroundParticles count={particleCount} reducedMotion={reducedMotion} />
      <TinyStar opacity={introOpacity} reducedMotion={reducedMotion} />
      <MiniatureWorld opacity={everydayOpacity} reducedMotion={reducedMotion} onMemorySelect={onMemorySelect} />
      <ConstellationScene
        opacity={constellationOpacity}
        activeStarIds={activeStarIds}
        highlightedStar={highlightedStar}
        disconnected={disconnected && !reconnecting}
        reconnecting={reconnecting}
        interactive={activeScene === 2}
        reducedMotion={reducedMotion}
        onActivateStar={onActivateStar}
        onHighlightStar={onHighlightStar}
      />
      <Letter3D
        opacity={letterOpacity}
        open={letterOpen}
        interactive={activeScene === 4}
        reducedMotion={reducedMotion}
        onOpenLetter={onOpenLetter}
      />
      <SeedlingScene opacity={endingOpacity} growing={lastThingOpen} reducedMotion={reducedMotion} />
    </>
  );
}

export function ExperienceCanvas(props: ExperienceCanvasProps) {
  const isMobile = useIsMobile();
  const particleCount = props.reducedMotion ? 90 : isMobile ? 150 : 340;

  return (
    <Canvas
      className="experience-canvas"
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.15] : [1, 1.6]}
      camera={{ position: [0, 0.18, 6.1], fov: isMobile ? 50 : 44, near: 0.1, far: 40 }}
      gl={{ antialias: !isMobile, alpha: false, powerPreference: 'high-performance' }}
      performance={{ min: 0.55 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#03050d');
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
    >
      <color attach="background" args={["#03050d"]} />
      <fog attach="fog" args={["#03050d", 6, 18]} />
      <Suspense fallback={null}>
        <SceneStage {...props} particleCount={particleCount} />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
