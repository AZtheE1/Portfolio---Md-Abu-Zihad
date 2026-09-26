/*
  Crime Scene Investigation Board & Cyber Room Environment
  - Full 3D room with walls, floor, ceiling, neon edges
  - Decorative shelves, monitors, neon signs
  - Dynamic sticky notes from case study data
  - Holographic project cards
  - Rich colorful volumetric lighting
*/

import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, Billboard, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════
//  ROOM GEOMETRY — Walls, Floor, Ceiling, Neon Strips
// ═══════════════════════════════════════════════════

function CyberRoom() {
  const neonRef1 = useRef();
  const neonRef2 = useRef();

  // Pulse the neon strips
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (neonRef1.current) neonRef1.current.material.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.5;
    if (neonRef2.current) neonRef2.current.material.emissiveIntensity = 1.2 + Math.sin(t * 1.5 + 1) * 0.4;
  });

  return (
    <group>
      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#0a0e1a" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* Floor grid overlay */}
      <gridHelper args={[12, 20, '#00f0ff', '#131830']} position={[0, 0.005, 0]} />

      {/* ── Back Wall ── */}
      <mesh position={[0, 2.5, -4.5]} receiveShadow>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial color="#080c18" roughness={0.9} />
      </mesh>

      {/* ── Left Wall ── */}
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#0a0f1e" roughness={0.85} />
      </mesh>

      {/* ── Right Wall ── */}
      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#0a0f1e" roughness={0.85} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#060a14" roughness={0.95} />
      </mesh>

      {/* ═══ Neon Edge Strips ═══ */}
      {/* Floor-wall junction — cyan */}
      <mesh ref={neonRef1} position={[0, 0.02, -4.48]}>
        <boxGeometry args={[12, 0.04, 0.02]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
      </mesh>
      {/* Ceiling junction — purple */}
      <mesh ref={neonRef2} position={[0, 4.98, -4.48]}>
        <boxGeometry args={[12, 0.04, 0.02]} />
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={1.5} />
      </mesh>
      {/* Left wall bottom neon — red */}
      <mesh position={[-5.98, 0.02, 0]}>
        <boxGeometry args={[0.02, 0.04, 10]} />
        <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={1.5} />
      </mesh>
      {/* Right wall bottom neon — cyan */}
      <mesh position={[5.98, 0.02, 0]}>
        <boxGeometry args={[0.02, 0.04, 10]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
      </mesh>

      {/* ═══ Decorative Elements ═══ */}

      {/* Left wall shelf */}
      <mesh position={[-5.85, 2.2, -1.5]} castShadow>
        <boxGeometry args={[0.15, 0.06, 1.2]} />
        <meshStandardMaterial color="#1a1f33" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Items on shelf */}
      <mesh position={[-5.75, 2.38, -1.8]}>
        <boxGeometry args={[0.12, 0.3, 0.08]} />
        <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-5.75, 2.35, -1.3]}>
        <cylinderGeometry args={[0.06, 0.06, 0.22, 8]} />
        <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={0.4} />
      </mesh>

      {/* Right wall decorative monitor */}
      <group position={[5.8, 2.8, -1]}>
        <mesh>
          <boxGeometry args={[0.06, 0.8, 1.2]} />
          <meshStandardMaterial color="#0f1428" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[-0.035, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.1, 0.7]} />
          <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Right wall second monitor */}
      <group position={[5.8, 2.8, 1.5]}>
        <mesh>
          <boxGeometry args={[0.06, 0.6, 0.9]} />
          <meshStandardMaterial color="#0f1428" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.035, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.8, 0.5]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Back wall "ZIHAD" neon sign */}
      <Text
        position={[3.5, 4.0, -4.42]}
        fontSize={0.35}
        color="#ff003c"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#ff003c"
      >
        ZIHAD.DEV
      </Text>
      {/* Neon sign glow light */}
      <pointLight position={[3.5, 4.0, -4.0]} color="#ff003c" intensity={3} distance={4} />

      {/* Ceiling light panels */}
      <mesh position={[-2, 4.95, -1]}>
        <boxGeometry args={[1.5, 0.04, 0.3]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[2, 4.95, 1]}>
        <boxGeometry args={[1.5, 0.04, 0.3]} />
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

// ═══════════════════════════════════════════════════
//  NEON GLOW HALO (around selected sticky notes)
// ═══════════════════════════════════════════════════

const NeonGlowHalo = React.memo(function NeonGlowHalo({ color }) {
  const haloRef = useRef();

  useFrame((state) => {
    if (haloRef.current) {
      const scale = 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      haloRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={haloRef} position={[0, 0, -0.01]}>
      <planeGeometry args={[1.4, 0.9]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});

// ═══════════════════════════════════════════════════
//  STICKY NOTE COMPONENT
// ═══════════════════════════════════════════════════

const StickyNote = React.memo(function StickyNote({
  id, title, category, color, position, zoomTarget, onZoom, isActive,
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isSelected = isActive;

  useFrame((state) => {
    if (meshRef.current) {
      const idleSway = Math.sin(state.clock.elapsedTime * 2.2 + position[0]) * 0.05;
      const targetRotationY = hovered || isSelected ? 0.35 : idleSway;
      const targetScale = hovered || isSelected ? 1.15 : 1.0;

      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.12);
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
    }
  });

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onZoom(zoomTarget, id);
  }, [onZoom, zoomTarget, id]);

  return (
    <group position={position}>
      {(hovered || isSelected) && <NeonGlowHalo color={color} />}

      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.22, 0.76, 0.04]} />
        <meshStandardMaterial
          color={hovered || isSelected ? color : '#1a1f33'}
          emissive={hovered || isSelected ? color : '#0b1025'}
          emissiveIntensity={hovered || isSelected ? 1.5 : 0.4}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>

      {/* Title */}
      <Text position={[0, 0.05, 0.04]} fontSize={0.075} color={hovered || isSelected ? '#ffffff' : '#e2e8f0'} anchorX="center" anchorY="middle" maxWidth={1.05}>
        {title}
      </Text>

      {/* Category badge */}
      <Text position={[0, -0.2, 0.04]} fontSize={0.05} color={color} anchorX="center" anchorY="middle">
        {`[ ${category.toUpperCase()} ]`}
      </Text>

      {/* Red string to board center */}
      <line>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, -position[0], -position[1] - 0.4, -position[2] + 0.3]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff003c" linewidth={2} opacity={0.75} transparent />
      </line>

      {/* Click hint overlay */}
      <Html position={[0, 0, 0.05]} center distanceFactor={6} transform pointerEvents={hovered ? 'auto' : 'none'}>
        <div
          onClick={handleClick}
          className={`cursor-pointer px-4 py-2 rounded-lg transition-all text-center select-none ${
            hovered ? 'opacity-100 ring-2 ring-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'opacity-0'
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
});

// ═══════════════════════════════════════════════════
//  HOLOGRAPHIC PROJECT CARD
// ═══════════════════════════════════════════════════

const HologramCard = React.memo(function HologramCard({ study, position, onClose }) {
  if (!study) return null;

  const { title, description, tags, category, role, date, liveUrl, githubUrl, hologramColor } = study.data;
  const color = hologramColor || '#00f0ff';

  return (
    <Billboard position={[position[0], position[1] + 0.2, position[2] + 0.5]} follow={true}>
      <Html transform center distanceFactor={3.2} zIndexRange={[100, 0]}>
        <div className="w-[420px] max-w-[90vw] bg-[#05070f]/95 border-2 rounded-xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden font-mono text-xs select-none animate-fadeIn"
          style={{ borderColor: color, boxShadow: `0 0 40px ${color}60` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent pointer-events-none opacity-40 animate-pulse" />

          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
              <span className="font-bold text-sm tracking-wide" style={{ color }}>HOLOGRAPHIC ARCHIVE</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="px-2 py-0.5 rounded bg-red-900/30 text-red-400 border border-red-500/40 hover:bg-red-500 hover:text-white transition-colors text-xs font-bold pointer-events-auto cursor-pointer"
            >
              [ CLOSE ]
            </button>
          </div>

          <div className="space-y-3 relative z-10">
            <div>
              <div className="text-[10px] text-slate-400">{category} &bull; {date}</div>
              <h3 className="text-base font-bold text-white mt-0.5">{title}</h3>
              <div className="text-[11px] font-semibold mt-0.5" style={{ color }}>{role}</div>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed border-l-2 pl-2" style={{ borderColor: `${color}80` }}>{description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]">#{tag}</span>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 pointer-events-auto">
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded text-slate-950 font-bold hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ backgroundColor: color }}>
                  Live Demo &rarr;
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded border border-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer">
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </Html>
    </Billboard>
  );
});

// ═══════════════════════════════════════════════════
//  MAIN ENVIRONMENT EXPORT
// ═══════════════════════════════════════════════════

export function Environment({ zoomTo, activeProject = null, caseStudies = [], onClose }) {
  const noteConfigs = useMemo(() => {
    const defaultPositions = [
      { x: -1.5, y: 1.1 },
      { x: 0, y: 1.2 },
      { x: 1.5, y: 1.0 },
      { x: -0.8, y: 0.5 },
      { x: 0.8, y: 0.6 },
    ];

    return caseStudies.map((study, idx) => {
      const coords = study.data.coordinates || defaultPositions[idx] || { x: (idx - 1) * 1.5, y: 0.9 };
      const z = coords.z || -2.3;
      const notePosition = [coords.x, coords.y, z];

      return {
        study,
        position: notePosition,
        zoomTarget: {
          position: [coords.x, coords.y, z + 1.3],
          target: notePosition,
        },
      };
    });
  }, [caseStudies]);

  const activeStudy = caseStudies.find(s => s.slug === activeProject);
  const activeConfig = noteConfigs.find(c => c.study.slug === activeProject);

  return (
    <group>
      {/* Full Cyber Room */}
      <CyberRoom />

      {/* ── Crime Scene Investigation Board ── */}
      <group position={[0, 0.9, -2.5]}>
        {/* Board Frame — slightly brighter so it's visible */}
        <mesh receiveShadow position={[0, 0, -0.05]}>
          <boxGeometry args={[5.2, 2.4, 0.08]} />
          <meshStandardMaterial color="#141a2e" roughness={0.8} metalness={0.3} />
        </mesh>
        {/* Cork Surface */}
        <mesh receiveShadow position={[0, 0, 0.01]}>
          <planeGeometry args={[5.0, 2.2]} />
          <meshStandardMaterial color="#1a1510" roughness={0.95} />
        </mesh>
        {/* Top neon accent bar */}
        <mesh position={[0, 1.15, 0.02]}>
          <boxGeometry args={[5.0, 0.04, 0.02]} />
          <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={2} />
        </mesh>
        {/* Bottom neon accent bar */}
        <mesh position={[0, -1.15, 0.02]}>
          <boxGeometry args={[5.0, 0.04, 0.02]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
        </mesh>
        {/* Banner */}
        <Text position={[0, 0.95, 0.03]} fontSize={0.09} color="#ff003c" anchorX="center" anchorY="middle">
          CRIME SCENE INVESTIGATION // CLASSIFIED ARCHIVES
        </Text>
      </group>

      {/* Board light so notes are visible */}
      <pointLight position={[0, 1.5, -1.5]} color="#ffffff" intensity={3} distance={5} />
      <pointLight position={[-1.5, 1.0, -1.8]} color="#00f0ff" intensity={1.5} distance={3} />
      <pointLight position={[1.5, 1.0, -1.8]} color="#7000ff" intensity={1.5} distance={3} />

      {/* ── Dynamic Sticky Notes ── */}
      {noteConfigs.map(({ study, position, zoomTarget }) => (
        <StickyNote
          key={study.slug}
          id={study.slug}
          title={study.data.title}
          category={study.data.category}
          color={study.data.hologramColor || '#00f0ff'}
          position={position}
          zoomTarget={zoomTarget}
          onZoom={zoomTo}
          isActive={activeProject === study.slug}
        />
      ))}

      {/* ── Holographic Project Card ── */}
      {activeStudy && activeConfig && (
        <HologramCard study={activeStudy} position={activeConfig.position} onClose={onClose} />
      )}
    </group>
  );
}

export default React.memo(Environment);
