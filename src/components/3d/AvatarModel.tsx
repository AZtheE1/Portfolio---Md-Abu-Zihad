import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarModelProps {
  modelUrl?: string;
  isTyping?: boolean;
}

export const AvatarModel: React.FC<AvatarModelProps> = ({
  modelUrl = '/models/avatar.glb',
  isTyping = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Bone | null>(null);

  // Fallback parametric procedural avatar if custom GLB isn't placed in /models yet
  const headMeshRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  // 4.2 Cursor Tracking: map mouse coordinates to head rotation
  useFrame((state) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    if (headBoneRef.current) {
      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.y,
        mouseX * 0.7,
        0.1
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.x,
        -mouseY * 0.5,
        0.1
      );
    } else if (headMeshRef.current) {
      headMeshRef.current.rotation.y = THREE.MathUtils.lerp(
        headMeshRef.current.rotation.y,
        mouseX * 0.6,
        0.08
      );
      headMeshRef.current.rotation.x = THREE.MathUtils.lerp(
        headMeshRef.current.rotation.x,
        -mouseY * 0.4,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Procedural High-Detail Cyber Avatar Character */}
      {/* Torso / Cyber Jacket */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.28, 0.7, 16]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Cyber Collar with Neon Accents */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[0.18, 0.03, 16, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Head with Cursor Tracking */}
      <group ref={headMeshRef} position={[0, 0.15, 0]}>
        {/* Head Base */}
        <mesh castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Cyber Visor / Eyes */}
        <mesh position={[0, 0.03, 0.17]}>
          <boxGeometry args={[0.26, 0.07, 0.08]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>

        {/* Headset / Comm Device */}
        <mesh position={[0.23, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-0.23, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Cyber Hands Typing on Laptop */}
      <group position={[0, -0.45, 0.35]}>
        <mesh position={[-0.2, 0, 0]}>
          <boxGeometry args={[0.09, 0.05, 0.14]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <boxGeometry args={[0.09, 0.05, 0.14]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
