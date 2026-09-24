import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AvatarModel } from './3d/AvatarModel';
import { CyberDesk } from './3d/CyberDesk';
import { HologramModal } from './3d/HologramModal';

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

// 4.3 Crime Scene Sticky Note with Dynamic Physics Sway & Camera Zoom Target
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
      // Dynamic tilt sway on hover or idle breathing
      const idleSway = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
      const targetRotationY = hovered ? 0.35 : idleSway;
      const targetScale = hovered || isSelected ? 1.2 : 1.0;

      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 0.75, 0.04]} />
        <meshStandardMaterial
          color={hovered || isSelected ? color : '#111827'}
          emissive={hovered || isSelected ? color : '#0b0f19'}
          emissiveIntensity={hovered || isSelected ? 0.8 : 0.15}
          roughness={0.3}
          metalness={0.5}
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

      {/* Crime Scene Red String Connection to Desk Center */}
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
        <lineBasicMaterial color="#ff003c" linewidth={2} opacity={0.7} transparent />
      </line>
    </group>
  );
}

// Corkboard Crime Scene Backing Wall
function CrimeSceneBoard() {
  return (
    <group position={[0, 1.0, -2.5]}>
      {/* Board Wooden / Metallic Frame */}
      <mesh receiveShadow position={[0, 0, -0.05]}>
        <boxGeometry args={[5.2, 2.4, 0.06]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.2} />
      </mesh>
      {/* Cork Texture Plate */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[5.0, 2.2]} />
        <meshStandardMaterial color="#1e1b18" roughness={0.95} />
      </mesh>
      {/* Top Banner */}
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

// Camera Rig for Smooth Cinematic Zoom on Project Pin Click
function CameraController({ selectedPinCoords }: { selectedPinCoords: [number, number, number] | null }) {
  useFrame((state) => {
    if (selectedPinCoords) {
      // Smooth interpolation gliding towards the pinned note
      const targetPos = new THREE.Vector3(
        selectedPinCoords[0],
        selectedPinCoords[1],
        selectedPinCoords[2] + 1.2
      );
      state.camera.position.lerp(targetPos, 0.05);
      state.camera.lookAt(selectedPinCoords[0], selectedPinCoords[1], selectedPinCoords[2]);
    } else {
      // Default room view interpolation
      const defaultPos = new THREE.Vector3(0, 0.6, 4.0);
      state.camera.position.lerp(defaultPos, 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export const RoomCanvas: React.FC<RoomSceneProps> = ({ caseStudies }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

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
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color('#05070f');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
        onClick={() => setSelectedSlug(null)}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
        <pointLight position={[0, 2, 0]} color="#00f0ff" intensity={2.5} distance={9} />
        <pointLight position={[-3, 1, -2]} color="#ff003c" intensity={2} distance={7} />

        {/* Cinematic Camera Controller */}
        <CameraController selectedPinCoords={selectedCoords} />

        {/* 4.2 Avatar and AI Desk */}
        <AvatarModel />
        <CyberDesk />

        {/* 4.3 Crime Scene Board with Red Strings & Sticky Notes */}
        <CrimeSceneBoard />

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
                onClick={() => setSelectedSlug(study.slug)}
              />
              {/* 4.4 Hologram Projector on Click */}
              {isSelected && (
                <group position={[coords.x, coords.y, coords.z]}>
                  <HologramModal
                    study={study}
                    onClose={() => setSelectedSlug(null)}
                  />
                </group>
              )}
            </group>
          );
        })}

        {/* Cyber Grid Floor */}
        <gridHelper args={[24, 24, '#00f0ff', '#1e293b']} position={[0, -1.2, 0]} />

        {/* Manual Orbit Navigation when not locked on a pin */}
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
