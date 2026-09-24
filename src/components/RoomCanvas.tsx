import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SceneItem {
  slug: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    category: string;
    hologramColor?: string;
    coordinates?: { x: number; y: number; z: number };
  };
}

interface RoomSceneProps {
  caseStudies: SceneItem[];
}

// Interactive Corkboard Sticky Note representation
function CrimeScenePin({
  position,
  color,
  title,
  category,
}: {
  position: [number, number, number];
  color: string;
  title: string;
  category: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Dynamic tilt sway on hover
      const targetRotationY = hovered ? 0.3 : 0;
      const targetScale = hovered ? 1.15 : 1.0;
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
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial
          color={hovered ? color : '#1e293b'}
          emissive={hovered ? color : '#0b0f19'}
          emissiveIntensity={hovered ? 0.6 : 0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Hologram Title Label */}
      <Text
        position={[0, 0.05, 0.04]}
        fontSize={0.09}
        color={hovered ? '#ffffff' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.0}
      >
        {title}
      </Text>

      {/* Category sub-badge */}
      <Text
        position={[0, -0.22, 0.04]}
        fontSize={0.06}
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
            args={[new Float32Array([0, 0, 0, -position[0], -position[1] - 0.5, -position[2]]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff003c" linewidth={2} opacity={0.6} transparent />
      </line>
    </group>
  );
}

// Avatar & Desk placeholder with animated cyber orb
function AvatarDeskNode() {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Desk Base */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.1, 1.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Cyber Core Avatar Node */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh ref={orbRef} position={[0, 0.3, 0]}>
          <octahedronGeometry args={[0.45, 0]} />
          <MeshDistortMaterial
            color="#00f0ff"
            emissive="#7000ff"
            emissiveIntensity={0.5}
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Text
        position={[0, -0.3, 0]}
        fontSize={0.11}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
      >
        DEVELOPER AVATAR ANCHOR
      </Text>
    </group>
  );
}

export const RoomCanvas: React.FC<RoomSceneProps> = ({ caseStudies }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.8, 4.5], fov: 48 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color('#05070f');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[0, 2, 0]} color="#00f0ff" intensity={2} distance={8} />
        <pointLight position={[-3, 1, -2]} color="#ff003c" intensity={1.5} distance={6} />

        {/* Avatar & Central Workstation */}
        <AvatarDeskNode />

        {/* Crime Scene Board Holographic Pins */}
        {caseStudies.map((study, idx) => {
          const coords = study.data.coordinates || {
            x: (idx - 1) * 1.5,
            y: 0.9,
            z: -1.8,
          };
          return (
            <CrimeScenePin
              key={study.slug}
              position={[coords.x, coords.y, coords.z]}
              color={study.data.hologramColor || '#00f0ff'}
              title={study.data.title}
              category={study.data.category}
            />
          );
        })}

        {/* Subtle Cyber Floor Grid */}
        <gridHelper args={[20, 20, '#00f0ff', '#1e293b']} position={[0, -1.2, 0]} />
      </Canvas>

      {/* Floating 3D Navigation Tip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyber-accent animate-ping" />
        <span>HOVER CASE STUDY NOTES &bull; DRAG TO EXPLORE VIRTUAL ROOM</span>
      </div>
    </div>
  );
};
