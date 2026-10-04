import { useMemo, useRef, type ReactNode } from 'react';
import { Float, Line } from '@react-three/drei';
import { type ThreeEvent, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type EverydayMemoryId } from '../data/apologyContent';
import { setHoverCursor } from '../hooks/useHoverCursor';

interface MiniatureWorldProps {
  opacity: number;
  reducedMotion: boolean;
  viewport: 'phone' | 'tablet' | 'desktop';
  onMemorySelect: (memory: EverydayMemoryId) => void;
}

function InteractiveShell({
  memory,
  onMemorySelect,
  children,
}: {
  memory: EverydayMemoryId;
  onMemorySelect: (memory: EverydayMemoryId) => void;
  children: ReactNode;
}) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onMemorySelect(memory);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoverCursor(true);
  };

  const handlePointerOut = () => setHoverCursor(false);

  return (
    <group onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      {children}
    </group>
  );
}

function FriendLights({ opacity, reducedMotion }: { opacity: number; reducedMotion: boolean }) {
  const firstRef = useRef<THREE.Group>(null);
  const secondRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0.8 : clock.elapsedTime * 0.28;

    if (firstRef.current) {
      firstRef.current.position.set(Math.sin(time) * 1.45, 0.22, Math.cos(time * 0.82) * 0.86);
    }

    if (secondRef.current) {
      secondRef.current.position.set(
        Math.sin(time + 0.52) * 1.33 + 0.12,
        0.2,
        Math.cos(time * 0.82 + 0.48) * 0.78 + 0.08,
      );
    }
  });

  return (
    <group>
      <group ref={firstRef}>
        <mesh>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshBasicMaterial color="#f2d39a" transparent opacity={opacity} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.16, 16, 12]} />
          <meshBasicMaterial color="#f2d39a" transparent opacity={opacity * 0.12} depthWrite={false} />
        </mesh>
      </group>
      <group ref={secondRef}>
        <mesh>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshBasicMaterial color="#a9d8ff" transparent opacity={opacity} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.16, 16, 12]} />
          <meshBasicMaterial color="#a9d8ff" transparent opacity={opacity * 0.11} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function CollegeCluster({ opacity }: { opacity: number }) {
  return (
    <Float speed={1.2} rotationIntensity={0.035} floatIntensity={0.025}>
      <group position={[-1.42, 0.06, -0.72]}>
        <mesh position={[0, -0.04, 0]} receiveShadow>
          <boxGeometry args={[1.28, 0.08, 0.92]} />
          <meshStandardMaterial color="#15223d" roughness={0.82} transparent opacity={opacity * 0.86} />
        </mesh>
        <mesh position={[0, 0.26, -0.28]} castShadow>
          <boxGeometry args={[1.06, 0.46, 0.09]} />
          <meshStandardMaterial
            color="#21365d"
            emissive="#182947"
            emissiveIntensity={0.22}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, 0.54, -0.28]} castShadow>
          <boxGeometry args={[1.2, 0.08, 0.14]} />
          <meshStandardMaterial color="#c7a96d" metalness={0.1} roughness={0.56} transparent opacity={opacity} />
        </mesh>
        {[-0.42, 0, 0.42].map((x) => (
          <mesh key={x} position={[x, 0.2, 0.03]} castShadow>
            <boxGeometry args={[0.22, 0.08, 0.18]} />
            <meshStandardMaterial color="#8fb4d5" roughness={0.7} transparent opacity={opacity * 0.9} />
          </mesh>
        ))}
        {[-0.46, 0.46].map((x) => (
          <mesh key={x} position={[x, 0.18, -0.54]} castShadow>
            <cylinderGeometry args={[0.035, 0.04, 0.46, 12]} />
            <meshStandardMaterial color="#dacba8" roughness={0.48} transparent opacity={opacity} />
          </mesh>
        ))}
        <mesh position={[0, 0.06, 0.36]}>
          <boxGeometry args={[0.82, 0.03, 0.09]} />
          <meshStandardMaterial color="#f4d487" emissive="#a57329" emissiveIntensity={0.16} transparent opacity={opacity} />
        </mesh>
      </group>
    </Float>
  );
}

function StudyCluster({ opacity }: { opacity: number }) {
  return (
    <Float speed={1.05} rotationIntensity={0.025} floatIntensity={0.018}>
      <group position={[-0.18, 0.08, -1.16]} rotation={[0, -0.18, 0]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.82, 0.06, 0.42]} />
          <meshStandardMaterial color="#263a5d" roughness={0.7} transparent opacity={opacity * 0.9} />
        </mesh>
        <mesh position={[-0.12, 0.13, 0.01]} rotation={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.34, 0.025, 0.3]} />
          <meshStandardMaterial color="#e6d9b8" roughness={0.68} transparent opacity={opacity * 0.88} />
        </mesh>
        <mesh position={[0.17, 0.15, -0.01]} rotation={[0, -0.14, 0]} castShadow>
          <boxGeometry args={[0.36, 0.025, 0.3]} />
          <meshStandardMaterial color="#d8e5f0" roughness={0.68} transparent opacity={opacity * 0.84} />
        </mesh>
        <mesh position={[0.38, 0.19, 0.11]} rotation={[0, 0, -0.34]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 10]} />
          <meshStandardMaterial color="#f0cd82" roughness={0.48} transparent opacity={opacity * 0.86} />
        </mesh>
        <mesh position={[-0.02, 0.18, -0.17]}>
          <boxGeometry args={[0.46, 0.012, 0.018]} />
          <meshStandardMaterial color="#8fb4d5" emissive="#4d7da8" emissiveIntensity={0.15} transparent opacity={opacity * 0.55} />
        </mesh>
      </group>
    </Float>
  );
}

function FoodCluster({ opacity }: { opacity: number }) {
  return (
    <Float speed={1.05} rotationIntensity={0.03} floatIntensity={0.02}>
      <group position={[1.34, 0.08, -0.58]}>
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.08, 32]} />
          <meshStandardMaterial color="#6b4a34" roughness={0.66} transparent opacity={opacity} />
        </mesh>
        <mesh position={[0, 0.03, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.06, 0.26, 16]} />
          <meshStandardMaterial color="#3d2c27" roughness={0.68} transparent opacity={opacity} />
        </mesh>
        {[-0.55, 0.55].map((x) => (
          <group key={x} position={[x, 0.09, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.07, 0.22]} />
              <meshStandardMaterial color="#20314f" roughness={0.64} transparent opacity={opacity * 0.92} />
            </mesh>
            <mesh position={[0, 0.17, -0.1]} castShadow>
              <boxGeometry args={[0.22, 0.27, 0.04]} />
              <meshStandardMaterial color="#29456f" roughness={0.6} transparent opacity={opacity * 0.9} />
            </mesh>
          </group>
        ))}
        {[-0.13, 0.13].map((x) => (
          <mesh key={x} position={[x, 0.22, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.012, 24]} />
            <meshStandardMaterial color="#f4e1b3" emissive="#70592a" emissiveIntensity={0.06} transparent opacity={opacity} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function GymCluster({ opacity }: { opacity: number }) {
  return (
    <Float speed={1.1} rotationIntensity={0.02} floatIntensity={0.018}>
      <group position={[-1.08, 0.08, 1.02]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.82, 0.09, 0.28]} />
          <meshStandardMaterial color="#263f61" roughness={0.58} transparent opacity={opacity} />
        </mesh>
        <mesh position={[0, 0.24, 0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.024, 0.024, 0.95, 16]} />
          <meshStandardMaterial color="#d9e7f7" metalness={0.45} roughness={0.36} transparent opacity={opacity} />
        </mesh>
        {[-0.54, 0.54].map((x) => (
          <mesh key={x} position={[x, 0.24, 0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.08, 18]} />
            <meshStandardMaterial color="#101827" metalness={0.25} roughness={0.5} transparent opacity={opacity} />
          </mesh>
        ))}
        {[[-0.38, -0.27], [0.38, -0.27]].map(([x, z]) => (
          <mesh key={`${x}-${z}`} position={[x, 0.04, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.04, 0.26, 12]} />
            <meshStandardMaterial color="#94b6d8" roughness={0.55} transparent opacity={opacity * 0.82} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function EverydayCluster({ opacity }: { opacity: number }) {
  return (
    <Float speed={1.3} rotationIntensity={0.03} floatIntensity={0.02}>
      <group position={[1.02, 0.12, 1.0]}>
        <mesh position={[0, 0.26, 0]} scale={[1.1, 0.55, 0.05]}>
          <sphereGeometry args={[0.28, 24, 16]} />
          <meshStandardMaterial
            color="#d9edff"
            emissive="#70bfff"
            emissiveIntensity={0.15}
            transparent
            opacity={opacity * 0.24}
            depthWrite={false}
          />
        </mesh>
        {[-0.18, 0, 0.18].map((x) => (
          <mesh key={x} position={[x, 0.27, 0.045]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={opacity * 0.72} />
          </mesh>
        ))}
        <mesh position={[0.32, 0.09, 0.08]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.28, 0.025, 0.025]} />
          <meshStandardMaterial color="#70bfff" emissive="#3f8ecc" emissiveIntensity={0.3} transparent opacity={opacity * 0.65} />
        </mesh>
      </group>
    </Float>
  );
}

export function MiniatureWorld({ opacity, reducedMotion, viewport, onMemorySelect }: MiniatureWorldProps) {
  const pathGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0.025, -0.9),
      new THREE.Vector3(-0.55, 0.03, -0.1),
      new THREE.Vector3(0.6, 0.025, -0.5),
      new THREE.Vector3(1.42, 0.025, 0.32),
      new THREE.Vector3(0.35, 0.03, 1.1),
      new THREE.Vector3(-1.2, 0.025, 0.92),
    ]);
    return new THREE.TubeGeometry(curve, 64, 0.016, 8, false);
  }, []);

  const scale = viewport === 'phone' ? 0.78 : viewport === 'tablet' ? 0.9 : 1;
  const yPosition = viewport === 'phone' ? -1.5 : viewport === 'tablet' ? -1.36 : -1.25;
  const yRotation = viewport === 'phone' ? -0.08 : -0.18;

  if (opacity <= 0.015) return null;

  return (
    <group position={[0, yPosition, 0]} rotation={[0, yRotation, 0]} scale={scale}>
      <mesh receiveShadow position={[0, -0.035, 0]}>
        <cylinderGeometry args={[2.55, 2.7, 0.08, 64]} />
        <meshStandardMaterial
          color="#07111f"
          emissive="#08172c"
          emissiveIntensity={0.28}
          roughness={0.9}
          transparent
          opacity={opacity * 0.86}
        />
      </mesh>
      <mesh geometry={pathGeometry}>
        <meshStandardMaterial color="#e6c484" emissive="#b88735" emissiveIntensity={0.28} transparent opacity={opacity * 0.68} />
      </mesh>
      <Line
        points={[
          [-1.8, 0.08, -0.9],
          [-0.55, 0.09, -0.1],
          [0.6, 0.08, -0.5],
          [1.42, 0.08, 0.32],
          [0.35, 0.09, 1.1],
          [-1.2, 0.08, 0.92],
        ]}
        color="#f6d89a"
        lineWidth={0.75}
        transparent
        opacity={opacity * 0.42}
      />

      <InteractiveShell memory="college" onMemorySelect={onMemorySelect}>
        <CollegeCluster opacity={opacity} />
      </InteractiveShell>
      <InteractiveShell memory="study" onMemorySelect={onMemorySelect}>
        <StudyCluster opacity={opacity} />
      </InteractiveShell>
      <InteractiveShell memory="food" onMemorySelect={onMemorySelect}>
        <FoodCluster opacity={opacity} />
      </InteractiveShell>
      <InteractiveShell memory="gym" onMemorySelect={onMemorySelect}>
        <GymCluster opacity={opacity} />
      </InteractiveShell>
      <InteractiveShell memory="everyday" onMemorySelect={onMemorySelect}>
        <EverydayCluster opacity={opacity} />
      </InteractiveShell>

      <FriendLights opacity={opacity} reducedMotion={reducedMotion} />
    </group>
  );
}
