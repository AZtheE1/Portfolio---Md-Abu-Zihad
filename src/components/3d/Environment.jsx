/*
Crime Scene Investigation Board & Room Environment
Contains interactive sticky notes with red strings and click-to-zoom triggers.
*/

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

function StickyNote({
  id,
  title,
  category,
  color,
  position,
  zoomTarget,
  onZoom,
  activeId,
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isSelected = activeId === id;

  useFrame((state) => {
    if (meshRef.current) {
      // Dynamic physics sway
      const idleSway = Math.sin(state.clock.elapsedTime * 2.2 + position[0]) * 0.05;
      const targetRotationY = hovered || isSelected ? 0.35 : idleSway;
      const targetScale = hovered || isSelected ? 1.15 : 1.0;

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
      {/* 3D Note Geometry */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onZoom(zoomTarget);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        className="cursor-pointer"
      >
        <boxGeometry args={[1.2, 0.75, 0.04]} />
        <meshStandardMaterial
          color={hovered || isSelected ? color : '#111827'}
          emissive={hovered || isSelected ? color : '#0b0f19'}
          emissiveIntensity={hovered || isSelected ? 1.2 : 0.25}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Note Title */}
      <Text
        position={[0, 0.06, 0.03]}
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
        position={[0, -0.2, 0.03]}
        fontSize={0.055}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {`[ ${category.toUpperCase()} ]`}
      </Text>

      {/* Crime Scene Red String Connection to Desk */}
      <line>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                0, 0, 0,
                -position[0], -position[1] - 0.4, -position[2] + 0.3,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff003c" linewidth={2} opacity={0.75} transparent />
      </line>

      {/* Interactive HTML Card overlay */}
      <Html
        position={[0, 0, 0.05]}
        center
        distanceFactor={6}
        transform
        pointerEvents={hovered || isSelected ? 'auto' : 'none'}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onZoom(zoomTarget);
          }}
          className={`cursor-pointer px-4 py-2 rounded-lg transition-all text-center select-none ${
            hovered || isSelected
              ? 'opacity-100 ring-2 ring-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              : 'opacity-0'
          }`}
          style={{ width: '220px' }}
        >
          <div className="text-[11px] font-mono font-bold text-[#00f0ff] uppercase tracking-wider">
            CLICK TO INSPECT
          </div>
        </div>
      </Html>
    </group>
  );
}

export function Environment({ zoomTo, activeTargetId = null }) {
  // Pre-configured camera targets for Note 1 and Note 2
  // Format: position = camera position right in front of note; target = exact note center
  const note1Config = {
    position: [-1.4, 0.9, -1.0],
    target: [-1.4, 0.9, -2.3],
  };

  const note2Config = {
    position: [1.4, 0.9, -1.0],
    target: [1.4, 0.9, -2.3],
  };

  return (
    <group>
      {/* Crime Scene Investigation Board Background Wall */}
      <group position={[0, 0.9, -2.5]}>
        {/* Frame */}
        <mesh receiveShadow position={[0, 0, -0.05]}>
          <boxGeometry args={[5.2, 2.4, 0.06]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.2} />
        </mesh>
        {/* Cork Texture Plate */}
        <mesh receiveShadow position={[0, 0, 0]}>
          <planeGeometry args={[5.0, 2.2]} />
          <meshStandardMaterial color="#1e1b18" roughness={0.95} />
        </mesh>
        {/* Banner */}
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

      {/* Note 1: Autonomous Drone Swarm */}
      <StickyNote
        id="note-1"
        title="Drone Swarm Telemetry"
        category="3D / Graphics"
        color="#00f0ff"
        position={[-1.4, 0.9, -2.3]}
        zoomTarget={note1Config}
        onZoom={zoomTo}
        activeId={activeTargetId}
      />

      {/* Note 2: Neural Mesh AI Copilot */}
      <StickyNote
        id="note-2"
        title="Neural Mesh AI Copilot"
        category="AI / Systems"
        color="#7000ff"
        position={[1.4, 0.9, -2.3]}
        zoomTarget={note2Config}
        onZoom={zoomTo}
        activeId={activeTargetId}
      />

      {/* Cyber Grid Floor */}
      <gridHelper args={[24, 24, '#00f0ff', '#1e293b']} position={[0, -1.0, 0]} />
    </group>
  );
}

export default Environment;
