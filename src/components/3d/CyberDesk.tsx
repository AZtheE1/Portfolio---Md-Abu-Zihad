import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CyberDesk: React.FC = () => {
  const screenLightRef = useRef<THREE.PointLight>(null);

  // Subtle flicker on the laptop screen glow
  useFrame((state) => {
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 8) * 0.15;
    }
  });

  return (
    <group position={[0, -0.7, 0]}>
      {/* Heavy Steel Cyber Desk Surface */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.4, 0.08, 1.6]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cyber Desk Edge Neon Strip */}
      <mesh position={[0, 0, 0.81]}>
        <boxGeometry args={[3.42, 0.03, 0.02]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-1.5, -0.45, 0.6]} castShadow>
        <boxGeometry args={[0.08, 0.9, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[1.5, -0.45, 0.6]} castShadow>
        <boxGeometry args={[0.08, 0.9, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[-1.5, -0.45, -0.6]} castShadow>
        <boxGeometry args={[0.08, 0.9, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[1.5, -0.45, -0.6]} castShadow>
        <boxGeometry args={[0.08, 0.9, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      {/* Laptop Workstation */}
      <group position={[0, 0.08, 0.2]}>
        {/* Laptop Base & Keyboard */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.65, 0.02, 0.45]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Laptop Screen (angled 105 degrees) */}
        <group position={[0, 0.01, -0.22]} rotation={[-0.3, 0, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.65, 0.4, 0.02]} />
            <meshStandardMaterial color="#05070f" metalness={0.9} />
          </mesh>
          {/* Active Terminal Display Matrix */}
          <mesh position={[0, 0.2, 0.012]}>
            <planeGeometry args={[0.6, 0.35]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <pointLight
            ref={screenLightRef}
            position={[0, 0.2, 0.2]}
            color="#00f0ff"
            intensity={1.2}
            distance={2}
          />
        </group>
      </group>
    </group>
  );
};
