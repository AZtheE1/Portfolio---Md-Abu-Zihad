/*
  Floating Cyber Particles
  Hundreds of glowing dust motes drifting through the room.
  Bright, visible, colorful — not subtle.
*/

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 300;

export default function Particles() {
  const meshRef = useRef();

  const { positions, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const cyanColor = new THREE.Color('#00f0ff');
    const purpleColor = new THREE.Color('#9933ff');
    const greenColor = new THREE.Color('#00ff66');
    const redColor = new THREE.Color('#ff003c');
    const whiteColor = new THREE.Color('#aab4c8');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles within the room volume
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 4.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      speeds[i] = 0.003 + Math.random() * 0.008;

      // Colorful particle distribution
      const r = Math.random();
      const color = r < 0.3 ? cyanColor : r < 0.5 ? purpleColor : r < 0.65 ? greenColor : r < 0.75 ? redColor : whiteColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, speeds, colors };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArray[i * 3 + 1] += speeds[i];
      posArray[i * 3] += Math.sin(t * 0.5 + i) * 0.001;
      posArray[i * 3 + 2] += Math.cos(t * 0.3 + i * 0.5) * 0.0006;

      // Wrap around
      if (posArray[i * 3 + 1] > 4.5) {
        posArray[i * 3 + 1] = 0;
        posArray[i * 3] = (Math.random() - 0.5) * 10;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
