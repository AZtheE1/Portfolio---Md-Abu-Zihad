import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { useControls, button } from 'leva';

import Avatar from './Avatar';
import Desk from './Desk';
import Chair from './Chair';
import Laptop from './Laptop';

// Professional Cyber Loading Overlay
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 bg-[#05070f]/90 border border-[#00f0ff]/50 rounded-xl backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.3)] font-mono select-none min-w-[260px]">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-[#00f0ff]/20 border-t-[#00f0ff] animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-[#ff003c]/20 border-b-[#ff003c] animate-spin" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="text-xs font-bold text-[#00f0ff] tracking-widest uppercase mb-1">
          Loading 3D Dimension
        </div>
        <div className="text-[10px] text-slate-400">
          Mounting WebGL Buffers...
        </div>
      </div>
    </Html>
  );
}

export default function Scene() {
  // 1. Avatar Controls
  const avatarControls = useControls('🧑 Avatar Positioning', {
    avatarX: { value: 0.40, min: -5, max: 5, step: 0.01 },
    avatarY: { value: -0.20, min: -5, max: 5, step: 0.01 },
    avatarZ: { value: 0.56, min: -5, max: 5, step: 0.01 },
    avatarScale: { value: 1.50, min: 0.2, max: 4, step: 0.05 },
    avatarRotY: { value: -2.50, min: -Math.PI, max: Math.PI, step: 0.05 },
    avatarAnim: { options: ['typing', 'waving'], value: 'typing' },
  });

  // 2. Laptop Controls
  const laptopControls = useControls('💻 Laptop Positioning', {
    laptopX: { value: 0.40, min: -5, max: 5, step: 0.01 },
    laptopY: { value: 1.07, min: -5, max: 5, step: 0.01 },
    laptopZ: { value: -0.56, min: -5, max: 5, step: 0.01 },
    laptopScale: { value: 0.55, min: 0.1, max: 5, step: 0.05 },
    laptopRotY: { value: -1.50, min: -Math.PI, max: Math.PI, step: 0.05 },
  });

  // 3. Desk Controls
  const deskControls = useControls('🪑 Desk Positioning', {
    deskX: { value: 0.00, min: -5, max: 5, step: 0.01 },
    deskY: { value: 0.00, min: -5, max: 5, step: 0.01 },
    deskZ: { value: -0.50, min: -5, max: 5, step: 0.01 },
    deskRotY: { value: 0.00, min: -Math.PI, max: Math.PI, step: 0.05 },
    deskScale: { value: 2.50, min: 0.1, max: 5, step: 0.05 },
  });

  // 4. Chair Controls: perfectly situated at avatar (0.40, 0, 0.56)
  const chairControls = useControls('💺 Chair Positioning', {
    chairX: { value: 0.40, min: -4, max: 4, step: 0.01 },
    chairY: { value: 0.00, min: -3, max: 3, step: 0.01 },
    chairZ: { value: 0.60, min: -4, max: 4, step: 0.01 },
    chairRotY: { value: 0.65, min: -Math.PI, max: Math.PI, step: 0.05 },
    chairScale: { value: 1.00, min: 0.1, max: 3, step: 0.05 },
  });

  // Export calibrated values button
  useControls({
    '📋 Log All Coordinates': button(() => {
      console.log('--- CALIBRATED 3D SCENE COORDINATES ---');
      console.log('Avatar:', avatarControls);
      console.log('Laptop:', laptopControls);
      console.log('Desk:', deskControls);
      console.log('Chair:', chairControls);
    }),
  });

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#05070f' }}>
      <Canvas 
        camera={{ position: [0, 2, 4], fov: 50 }} 
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Soft Ambient & Directional Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1.8} castShadow />
        <Environment preset="city" />

        {/* Suspense with custom HTML Loader */}
        <Suspense fallback={<Loader />}>
          <group position={[0, -1, 0]}>
            
            {/* Desk */}
            <group 
              position={[deskControls.deskX, deskControls.deskY, deskControls.deskZ]} 
              rotation={[0, deskControls.deskRotY, 0]} 
              scale={deskControls.deskScale}
            >
              <Desk />
            </group>

            {/* Laptop on Desk surface */}
            <group 
              position={[laptopControls.laptopX, laptopControls.laptopY, laptopControls.laptopZ]} 
              rotation={[0, laptopControls.laptopRotY, 0]} 
              scale={laptopControls.laptopScale}
            >
              <Laptop />
            </group>

            {/* Chair behind Desk - centered right under Avatar */}
            <group 
              position={[chairControls.chairX, chairControls.chairY, chairControls.chairZ]} 
              rotation={[0, chairControls.chairRotY, 0]} 
              scale={chairControls.chairScale}
            >
              <Chair />
            </group>

            {/* Avatar seated in Chair */}
            <group 
              position={[avatarControls.avatarX, avatarControls.avatarY, avatarControls.avatarZ]} 
              rotation={[0, avatarControls.avatarRotY, 0]} 
              scale={avatarControls.avatarScale}
            >
              <Avatar animation={avatarControls.avatarAnim} />
            </group>

            {/* Contact Floor Shadow */}
            <ContactShadows 
              position={[0, 0, 0]} 
              opacity={0.65} 
              scale={12} 
              blur={2.4} 
              far={4} 
            />
          </group>
        </Suspense>

        {/* Orbit Controls with UX bounds */}
        <OrbitControls 
          makeDefault 
          maxPolarAngle={Math.PI / 2 - 0.02} 
          minDistance={1.8}
          maxDistance={7.5}
        />
      </Canvas>
    </div>
  );
}