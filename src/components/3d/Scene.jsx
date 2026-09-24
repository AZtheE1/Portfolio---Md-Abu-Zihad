import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Environment as DreiEnvironment, ContactShadows, Html } from '@react-three/drei';
import { useControls, button } from 'leva';

import Avatar from './Avatar';
import Desk from './Desk';
import Chair from './Chair';
import Laptop from './Laptop';
import Environment from './Environment';
import ThreeErrorBoundary from './ThreeErrorBoundary';

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
  const cameraControlsRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Default camera configuration looking at desk/avatar
  const defaultCamera = {
    position: [0, 1.8, 4.2],
    target: [0.2, 0.4, 0],
  };

  // 1. Avatar Controls
  const avatarControls = useControls('🧑 Avatar Positioning', {
    avatarX: { value: 0.40, min: -5, max: 5, step: 0.01 },
    avatarY: { value: -0.20, min: -5, max: 5, step: 0.01 },
    avatarZ: { value: 0.56, min: -5, max: 5, step: 0.01 },
    avatarScale: { value: 1.50, min: 0.2, max: 4, step: 0.05 },
    avatarRotY: { value: -2.50, min: -Math.PI, max: Math.PI, step: 0.05 },
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

  // 4. Chair Controls
  const chairControls = useControls('💺 Chair Positioning', {
    chairX: { value: 0.41, min: -5, max: 5, step: 0.01 },
    chairY: { value: -0.01, min: -5, max: 5, step: 0.01 },
    chairZ: { value: 0.99, min: -5, max: 5, step: 0.01 },
    chairRotY: { value: -3.14, min: -Math.PI, max: Math.PI, step: 0.05 },
    chairScale: { value: 1.35, min: 0.1, max: 5, step: 0.05 },
  });

  // 2 & 3. Smooth Camera Navigation Math using CameraControls
  const zoomTo = ({ position, target }) => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        position[0],
        position[1],
        position[2],
        target[0],
        target[1],
        target[2],
        true // Enables smooth interpolation
      );
      setIsZoomed(true);
    }
  };

  // 6. Reset to default Desk / Room view
  const resetToDesk = () => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        defaultCamera.position[0],
        defaultCamera.position[1],
        defaultCamera.position[2],
        defaultCamera.target[0],
        defaultCamera.target[1],
        defaultCamera.target[2],
        true
      );
      setIsZoomed(false);
    }
  };

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
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070f]">
      {/* 6. 2D HTML Reset Button Overlay */}
      {isZoomed && (
        <div className="absolute top-6 left-6 z-30 animate-fadeIn">
          <button
            onClick={resetToDesk}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#05070f]/90 hover:bg-slate-900 border border-[#00f0ff]/60 hover:border-[#00f0ff] text-[#00f0ff] font-mono text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all cursor-pointer backdrop-blur-md"
          >
            <span>&larr;</span>
            <span>BACK TO DESK</span>
          </button>
        </div>
      )}

      {/* Floating Instructions Badge */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-full text-xs font-mono text-slate-300 pointer-events-none flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
        <span>
          {isZoomed
            ? 'INSPECTING CLASSIFIED NOTE &bull; CLICK [BACK TO DESK] TO RETURN'
            : 'CLICK ANY NOTE ON THE BOARD TO GLIDE CAMERA'}
        </span>
      </div>

      <Canvas 
        camera={{ position: defaultCamera.position, fov: 50 }} 
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Soft Ambient & Directional Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1.8} castShadow />
        <DreiEnvironment preset="city" />

        {/* Suspense with custom HTML Loader */}
        <Suspense fallback={<Loader />}>
          <group position={[0, -1, 0]}>
            
            {/* 4. Crime Scene Board Environment with Click-to-Zoom */}
            <ThreeErrorBoundary name="Environment">
              <Environment zoomTo={zoomTo} />
            </ThreeErrorBoundary>

            {/* Desk */}
            <ThreeErrorBoundary name="Desk">
              <group 
                position={[deskControls.deskX, deskControls.deskY, deskControls.deskZ]} 
                rotation={[0, deskControls.deskRotY, 0]} 
                scale={deskControls.deskScale}
              >
                <Desk />
              </group>
            </ThreeErrorBoundary>

            {/* Laptop on Desk surface */}
            <ThreeErrorBoundary name="Laptop">
              <group 
                position={[laptopControls.laptopX, laptopControls.laptopY, laptopControls.laptopZ]} 
                rotation={[0, laptopControls.laptopRotY, 0]} 
                scale={laptopControls.laptopScale}
              >
                <Laptop />
              </group>
            </ThreeErrorBoundary>

            {/* Chair behind Desk */}
            <ThreeErrorBoundary name="Chair">
              <group 
                position={[chairControls.chairX, chairControls.chairY, chairControls.chairZ]} 
                rotation={[0, chairControls.chairRotY, 0]} 
                scale={chairControls.chairScale}
              >
                <Chair />
              </group>
            </ThreeErrorBoundary>

            {/* Avatar seated in Chair */}
            <ThreeErrorBoundary name="Avatar">
              <group 
                position={[avatarControls.avatarX, avatarControls.avatarY, avatarControls.avatarZ]} 
                rotation={[0, avatarControls.avatarRotY, 0]} 
                scale={avatarControls.avatarScale}
              >
                <Avatar />
              </group>
            </ThreeErrorBoundary>

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

        {/* 1. CameraControls for Cinematic setLookAt transitions */}
        <CameraControls 
          ref={cameraControlsRef} 
          maxPolarAngle={Math.PI / 2 - 0.02} 
          minDistance={1.2}
          maxDistance={8.0}
          dollyToCursor={true}
        />
      </Canvas>
    </div>
  );
}