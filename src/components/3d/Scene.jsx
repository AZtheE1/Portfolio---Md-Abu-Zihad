/*
  Scene.jsx — Production 3D Portfolio Scene
  - Full colorful cyber room with volumetric neon lighting
  - All state lives INSIDE the Canvas (no WebGL context loss)
  - Memoized GLB models
  - CameraControls with cinematic zoom
  - Spatial audio integration
  - Floating particle atmosphere
  - Idle camera breathing
*/

import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, ContactShadows, Html } from '@react-three/drei';

import Avatar from './Avatar';
import Desk from './Desk';
import Chair from './Chair';
import Laptop from './Laptop';
import Environment from './Environment';
import Particles from './Particles';
import ThreeErrorBoundary from './ThreeErrorBoundary';

const MemoAvatar = React.memo(Avatar);
const MemoDesk = React.memo(Desk);
const MemoChair = React.memo(Chair);
const MemoLaptop = React.memo(Laptop);

// ─── Loading Screen ────────────────────────────────
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

// ─── Subtle Camera Idle Breathing ──────────────────
function CameraBreathing({ enabled }) {
  useFrame((state) => {
    if (!enabled) return;
    const t = state.clock.elapsedTime;
    state.camera.position.y += Math.sin(t * 0.4) * 0.0002;
    state.camera.position.x += Math.sin(t * 0.3) * 0.00015;
  });
  return null;
}

// ─── Laptop Screen Glow Flicker ───────────────────
function LaptopScreenGlow() {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 3 + Math.sin(state.clock.elapsedTime * 8) * 0.5;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0.4, 1.25, -0.35]}
      color="#00f0ff"
      intensity={3}
      distance={3}
    />
  );
}

// ─── Main Scene Content (inside Canvas) ───────────
function SceneContent({ caseStudies = [], cyberAudio = null }) {
  const cameraControlsRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const defaultCameraPos = [0, 1.8, 4.2];
  const defaultCameraTarget = [0.2, 0.4, 0];

  // Cinematic zoom using CameraControls Promise API
  const zoomTo = useCallback(({ position, target }, id) => {
    if (cameraControlsRef.current) {
      setIsZoomed(true);
      if (cyberAudio) cyberAudio.playHologramOpen();

      cameraControlsRef.current.setLookAt(
        position[0], position[1], position[2],
        target[0], target[1], target[2],
        true
      ).then(() => {
        if (id) setActiveProject(id);
      });
    }
  }, [cyberAudio]);

  // Reset camera
  const resetToDesk = useCallback(() => {
    setActiveProject(null);
    setIsZoomed(false);
    if (cyberAudio) cyberAudio.playHologramClose();

    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        defaultCameraPos[0], defaultCameraPos[1], defaultCameraPos[2],
        defaultCameraTarget[0], defaultCameraTarget[1], defaultCameraTarget[2],
        true
      );
    }
  }, [cyberAudio]);

  // Periodic typing audio
  useEffect(() => {
    if (!cyberAudio) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.45) cyberAudio.playKeyClick();
    }, 1200);
    return () => clearInterval(interval);
  }, [cyberAudio]);

  // Calibrated production positions
  const avatarPos = [0.40, -0.20, 0.56];
  const avatarRotY = -2.50;
  const avatarScale = 1.50;
  const laptopPos = [0.40, 1.07, -0.56];
  const laptopRotY = -1.50;
  const laptopScale = 0.55;
  const deskPos = [0.00, 0.00, -0.50];
  const deskScale = 2.50;
  const chairPos = [0.41, -0.01, 0.99];
  const chairRotY = -3.14;
  const chairScale = 1.35;

  return (
    <>
      {/* ── 2D HUD Overlays ── */}
      <Html
        wrapperClass="ui-layer"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 50 }}
      >
        {isZoomed && (
          <div className="absolute top-6 left-6 z-30 animate-fadeIn" style={{ pointerEvents: 'auto' }}>
            <button
              onClick={resetToDesk}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#05070f]/90 hover:bg-slate-900 border border-[#00f0ff]/60 hover:border-[#00f0ff] text-[#00f0ff] font-mono text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all cursor-pointer backdrop-blur-md"
            >
              <span>&larr;</span>
              <span>BACK TO DESK</span>
            </button>
          </div>
        )}

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-full text-xs font-mono text-slate-300 pointer-events-none flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>
            {isZoomed
              ? 'INSPECTING CLASSIFIED NOTE • CLICK [BACK TO DESK] TO RETURN'
              : 'CLICK ANY NOTE ON THE BOARD TO GLIDE CAMERA'}
          </span>
        </div>
      </Html>

      {/* ═══ LIGHTING — Bright, Colorful, Volumetric ═══ */}
      
      {/* Global ambient — bright enough to see everything */}
      <ambientLight intensity={0.6} />
      
      {/* Main directional light (sun-like) */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      
      {/* Key fill light from front-right */}
      <directionalLight position={[3, 4, 6]} intensity={0.8} color="#e0e8ff" />

      {/* Overhead room light (warm) */}
      <pointLight position={[0, 4.5, 0]} color="#ffffff" intensity={4} distance={12} />
      
      {/* Cyan accent — desk area */}
      <pointLight position={[0, 2, 1]} color="#00f0ff" intensity={2} distance={8} />
      
      {/* Purple accent — left side */}
      <pointLight position={[-4, 2.5, -1]} color="#7000ff" intensity={2} distance={8} />
      
      {/* Red accent — right side */}
      <pointLight position={[4, 1.5, -2]} color="#ff003c" intensity={1.5} distance={6} />
      
      {/* Green accent — floor bounce */}
      <pointLight position={[0, 0.3, 2]} color="#00ff66" intensity={0.5} distance={5} />

      {/* Laptop screen glow flicker */}
      <LaptopScreenGlow />

      {/* ── Floating Particles ── */}
      <Particles />

      {/* ── Camera Breathing ── */}
      <CameraBreathing enabled={!isZoomed} />

      {/* ── 3D Scene Content ── */}
      <Suspense fallback={<Loader />}>
        <group position={[0, -1, 0]}>
          {/* Crime Scene Board + Room */}
          <ThreeErrorBoundary name="Environment">
            <Environment
              zoomTo={zoomTo}
              activeProject={activeProject}
              caseStudies={caseStudies}
              onClose={resetToDesk}
            />
          </ThreeErrorBoundary>

          {/* Desk */}
          <ThreeErrorBoundary name="Desk">
            <group position={deskPos} scale={deskScale}>
              <MemoDesk />
            </group>
          </ThreeErrorBoundary>

          {/* Laptop */}
          <ThreeErrorBoundary name="Laptop">
            <group position={laptopPos} rotation={[0, laptopRotY, 0]} scale={laptopScale}>
              <MemoLaptop />
            </group>
          </ThreeErrorBoundary>

          {/* Chair */}
          <ThreeErrorBoundary name="Chair">
            <group position={chairPos} rotation={[0, chairRotY, 0]} scale={chairScale}>
              <MemoChair />
            </group>
          </ThreeErrorBoundary>

          {/* Avatar */}
          <ThreeErrorBoundary name="Avatar">
            <group position={avatarPos} rotation={[0, avatarRotY, 0]} scale={avatarScale}>
              <MemoAvatar />
            </group>
          </ThreeErrorBoundary>

          {/* Floor Shadow */}
          <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={12} blur={2.4} far={4} />
        </group>
      </Suspense>

      {/* ── Camera Controls ── */}
      <CameraControls
        ref={cameraControlsRef}
        maxPolarAngle={Math.PI / 2 - 0.02}
        minDistance={1.2}
        maxDistance={8.0}
        dollyToCursor={true}
      />
    </>
  );
}

// ─── Scene Wrapper ─────────────────────────────────
export default function Scene({ caseStudies = [], cyberAudio = null }) {
  return (
    <div className="w-full h-full relative canvas-container">
      <Canvas
        camera={{ position: [0, 1.8, 4.2], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color('#05070f');
        }}
      >
        <SceneContent caseStudies={caseStudies} cyberAudio={cyberAudio} />
      </Canvas>
    </div>
  );
}

// Need THREE for scene background
import * as THREE from 'three';