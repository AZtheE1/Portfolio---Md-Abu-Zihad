import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Avatar } from './3d/Avatar';
import { CyberDesk } from './3d/CyberDesk';
import { HologramModal } from './3d/HologramModal';
import { cyberAudio } from '../utils/cyberAudio';

interface SceneItem {
  slug: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    category: string;
    role: string;
    date: string;
    liveUrl?: string;
    githubUrl?: string;
    hologramColor?: string;
    coordinates?: { x: number; y: number; z: number };
  };
}

interface RoomSceneProps {
  caseStudies: SceneItem[];
}

// Luminous Holographic Halo / Glow Ring for Project Pins
function NeonGlowHalo({ color }: { color: string }) {
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (haloRef.current) {
      const scale = 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      haloRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={haloRef} position={[0, 0, -0.01]}>
      <planeGeometry args={[1.35, 0.88]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 4.3 Crime Scene Sticky Note with Physics Sway & Spatial Audio
function CrimeScenePin({
  position,
  color,
  title,
  category,
  onClick,
  isSelected,
}: {
  position: [number, number, number];
  color: string;
  title: string;
  category: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Dynamic physics sway (pendulum simulation)
      const idleSway = Math.sin(state.clock.elapsedTime * 2.2 + position[0] * 1.5) * 0.06;
      const targetRotationY = hovered ? 0.38 : idleSway;
      const targetScale = hovered || isSelected ? 1.18 : 1.0;

      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.12
      );
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.12
      );
    }
  });

  return (
    <group position={position}>
      {/* Luminous Neon Halo */}
      {(hovered || isSelected) && <NeonGlowHalo color={color} />}

      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          setHovered(true);
          cyberAudio.playKeyClick();
        }}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.22, 0.76, 0.05]} />
        <meshStandardMaterial
          color={hovered || isSelected ? color : '#111827'}
          emissive={hovered || isSelected ? color : '#0b0f19'}
          emissiveIntensity={hovered || isSelected ? 1.5 : 0.25}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>

      {/* Hologram Title Label */}
      <Text
        position={[0, 0.05, 0.04]}
        fontSize={0.08}
        color={hovered || isSelected ? '#ffffff' : '#cbd5e1'}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.05}
      >
        {title}
      </Text>

      {/* Category sub-badge */}
      <Text
        position={[0, -0.2, 0.04]}
        fontSize={0.055}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {`[ ${category.toUpperCase()} ]`}
      </Text>

      {/* Crime Scene Red String Connection to Origin */}
      <line>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                0, 0, 0,
                -position[0], -position[1] - 0.4, -position[2] + 0.3
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff003c" linewidth={2} opacity={0.75} transparent />
      </line>
    </group>
  );
}

// Corkboard Crime Scene Backing Wall
function CrimeSceneBoard() {
  return (
    <group position={[0, 1.0, -2.5]}>
      <mesh receiveShadow position={[0, 0, -0.05]}>
        <boxGeometry args={[5.2, 2.4, 0.06]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.2} />
      </mesh>
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[5.0, 2.2]} />
        <meshStandardMaterial color="#1e1b18" roughness={0.95} />
      </mesh>
      <Text
        position={[0, 0.95, 0.02]}
        fontSize={0.09}
        color="#ff003c"
        anchorX="center"
        anchorY="middle"
      >
        CRIME SCENE INVESTIGATION // CLASSIFIED ARCHIVES
      </Text>
    </group>
  );
}

// Cinematic Camera Controller
function CameraController({ selectedPinCoords }: { selectedPinCoords: [number, number, number] | null }) {
  useFrame((state) => {
    if (selectedPinCoords) {
      const targetPos = new THREE.Vector3(
        selectedPinCoords[0],
        selectedPinCoords[1],
        selectedPinCoords[2] + 1.2
      );
      state.camera.position.lerp(targetPos, 0.05);
      state.camera.lookAt(selectedPinCoords[0], selectedPinCoords[1], selectedPinCoords[2]);
    } else {
      const defaultPos = new THREE.Vector3(0, 0.6, 4.0);
      state.camera.position.lerp(defaultPos, 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export const RoomCanvas: React.FC<RoomSceneProps> = ({ caseStudies }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Periodic typing audio clacks from the developer's laptop
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        cyberAudio.playKeyClick();
      }
    }, 900);
    return () => clearInterval(typingInterval);
  }, []);

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    cyberAudio.playHologramOpen();
  };

  const handleClose = () => {
    setSelectedSlug(null);
    cyberAudio.playHologramClose();
  };

  const selectedStudy = caseStudies.find((s) => s.slug === selectedSlug);
  const selectedCoords: [number, number, number] | null = selectedStudy
    ? [
        selectedStudy.data.coordinates?.x ?? 0,
        selectedStudy.data.coordinates?.y ?? 1.0,
        selectedStudy.data.coordinates?.z ?? -2.3,
      ]
    : null;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.6, 4.0], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color('#05070f');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
        onClick={handleClose}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
        <pointLight position={[0, 2, 0]} color="#00f0ff" intensity={3} distance={10} />
        <pointLight position={[-3, 1, -2]} color="#ff003c" intensity={2} distance={7} />

        {/* Camera Interpolator */}
        <CameraController selectedPinCoords={selectedCoords} />

        {/* Avatar and Cyber Workstation Desk */}
        <group position={[0, -0.7, -0.3]} rotation={[0, 0, 0]} scale={1.2}>
          <Avatar animation="typing" />
        </group>
        <CyberDesk />

        {/* Crime Scene Board */}
        <CrimeSceneBoard />

        {/* Pinned Case Studies */}
        {caseStudies.map((study, idx) => {
          const coords = study.data.coordinates || {
            x: (idx - 1) * 1.5,
            y: 0.9,
            z: -2.3,
          };
          const isSelected = selectedSlug === study.slug;

          return (
            <group key={study.slug}>
              <CrimeScenePin
                position={[coords.x, coords.y, coords.z]}
                color={study.data.hologramColor || '#00f0ff'}
                title={study.data.title}
                category={study.data.category}
                isSelected={isSelected}
                onClick={() => handleSelect(study.slug)}
              />
              {/* Holographic Projection Modal */}
              {isSelected && (
                <group position={[coords.x, coords.y, coords.z]}>
                  <HologramModal
                    study={study}
                    onClose={handleClose}
                  />
                </group>
              )}
            </group>
          );
        })}

        {/* Cyber Grid Floor */}
        <gridHelper args={[24, 24, '#00f0ff', '#1e293b']} position={[0, -1.2, 0]} />

        {/* Orbit Controls */}
        {!selectedSlug && (
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.05}
            minDistance={2.5}
            maxDistance={6.5}
          />
        )}
      </Canvas>

      {/* Floating HUD Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 px-5 py-2 rounded-full text-xs font-mono text-slate-300 pointer-events-none flex items-center gap-3 shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent animate-ping" />
        <span>
          {selectedSlug
            ? 'PRESS [ESC] OR CLICK OUTSIDE TO RETURN TO ROOM'
            : 'CLICK ANY STICKY NOTE TO ZOOM & PROJECT HOLOGRAPHIC ARCHIVE'}
        </span>
      </div>
    </div>
  );
};
