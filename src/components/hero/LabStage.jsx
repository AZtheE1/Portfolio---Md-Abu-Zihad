import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playSound } from '../core/AudioEngine';
import { Terminal, Cpu, Coffee, Sun, Moon, Droplets, Sparkles, Layers, Eye, ChevronDown } from 'lucide-react';
import { Corkboard } from './Corkboard';
import { LaptopTrigger } from './LaptopTrigger';
import { HologramModal } from '../modals/HologramModal';
import { PROJECTS } from '../../data/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LabStage = ({ onOpenTerminal, onOpenHologram, onSelectNote: externalSelectNote }) => {
  const [toastMessage, setToastMessage] = useState(null);
  const [roomTheme, setRoomTheme] = useState('cyberpunk');
  const [coffeeSteam, setCoffeeSteam] = useState(false);
  const [plantWatered, setPlantWatered] = useState(false);

  // Hologram Modal State
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [modalOriginPos, setModalOriginPos] = useState({ x: 50, y: 50 });
  const [isHologramModalOpen, setIsHologramModalOpen] = useState(false);

  // Layer Refs for Parallax & Unfolding ScrollTrigger
  const stageRef = useRef(null);
  const layer0Ref = useRef(null); // Back: Wall & Digital Rain Window (z-index 10)
  const layer1Ref = useRef(null); // Midground: Corkboard & Threads (z-index 20)
  const layer2Ref = useRef(null); // Foreground: Workbench, Laptop, Props, Avatar (z-index 30)
  const avatarHeadRef = useRef(null);

  // 1. Mouse Parallax & Head Gaze Tracking Engine
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // GSAP Layer Parallax Tweens (power1.out elastic motion)
      gsap.to(layer0Ref.current, {
        x: normX * 5,
        y: normY * 5,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto',
      });

      gsap.to(layer1Ref.current, {
        x: normX * 15,
        y: normY * 15,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto',
      });

      gsap.to(layer2Ref.current, {
        x: normX * 30,
        y: normY * 30,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto',
      });

      // Avatar Head Micro-Rotation (-15deg to 15deg)
      if (avatarHeadRef.current) {
        const headRect = avatarHeadRef.current.getBoundingClientRect();
        const headCenterX = headRect.left + headRect.width / 2;
        const deltaX = e.clientX - headCenterX;

        let clampedDeg = Math.max(-15, Math.min(15, deltaX * 0.05));

        gsap.to(avatarHeadRef.current, {
          rotate: clampedDeg,
          duration: 0.5,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Scroll Architecture: Pinned ScrollTrigger Unfolding Timeline
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const stage = stageRef.current;
    if (!stage) return;

    const unfoldTl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    unfoldTl
      // Back lab walls & rain window detach, translate backward & scale down
      .to(layer0Ref.current, {
        opacity: 0,
        scale: 0.8,
        y: -100,
        ease: 'none',
      })
      // Corkboard shifts upward & fades out
      .to(
        layer1Ref.current,
        {
          opacity: 0,
          y: -150,
          ease: 'none',
        },
        '<'
      )
      // Workbench, desk & avatar slide smoothly to bottom-right corner & rotate out of frame
      .to(
        layer2Ref.current,
        {
          xPercent: 100,
          yPercent: 50,
          opacity: 0,
          rotation: 15,
          ease: 'none',
        },
        '<'
      );

    return () => {
      unfoldTl.kill();
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSelectNote = (project, originPos) => {
    setActiveModalProject(project);
    setModalOriginPos(originPos || { x: 50, y: 50 });
    setIsHologramModalOpen(true);
    if (externalSelectNote) externalSelectNote(project, originPos);
  };

  // Easter Egg Props
  const handleCoffeeClick = () => {
    playSound('paperRustle');
    setCoffeeSteam(true);
    showToast('☕ Coffee Refuel: +50% Coding Velocity & Systems Focus!');
    setTimeout(() => setCoffeeSteam(false), 2500);
  };

  const handlePlantClick = () => {
    playSound('paperRustle');
    setPlantWatered(true);
    showToast('🌱 Desk Plant Watered: Synthesizing Oxygen & Clean Energy!');
    setTimeout(() => setPlantWatered(false), 2500);
  };

  const handleLampClick = () => {
    playSound('switchSound');
    const nextTheme = roomTheme === 'cyberpunk' ? 'sterile' : 'cyberpunk';
    setRoomTheme(nextTheme);

    if (nextTheme === 'sterile') {
      showToast('💡 Workstation Lamp: Switched to Sterile Bright Lab Mode');
      document.documentElement.classList.remove('dark');
    } else {
      showToast('🌙 Workstation Lamp: Switched to Moody Cyberpunk Void Mode');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <section
      id="hero"
      ref={stageRef}
      className={`relative h-screen w-screen overflow-hidden select-none transition-colors duration-700 ${
        roomTheme === 'cyberpunk' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'
      }`}
    >
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-slate-950/90 border border-[#00FFD1] text-[#00FFD1] font-mono text-xs shadow-[0_0_20px_rgba(0,255,209,0.3)] animate-bounce flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-spin text-[#00FFD1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hologram Beam Modal */}
      <HologramModal
        isOpen={isHologramModalOpen}
        onClose={() => setIsHologramModalOpen(false)}
        project={activeModalProject || PROJECTS[0]}
        originPos={modalOriginPos}
      />

      {/* ════════════════ LAYER 0 (BACK: z-index 10) ════════════════ */}
      <div
        ref={layer0Ref}
        className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8"
      >
        <div className="relative w-full h-full flex justify-between items-start pt-16">
          <div className="w-48 sm:w-64 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm hidden md:block">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
              <Cpu className="w-4 h-4 text-[#00FFD1] animate-pulse" />
              <span className="font-mono text-[10px] text-slate-300 uppercase tracking-widest font-bold">
                SYSTEM TELEMETRY
              </span>
            </div>
            <div className="space-y-1 font-mono text-[9px] text-slate-400">
              <p>CPU_LOAD: 12% // GPU_ACCEL: ON</p>
              <p>MEMORY_ALLOC: 4.2GB / 32GB</p>
              <p className="text-emerald-400">FRAME_RATE: 60 FPS STABLE</p>
            </div>
          </div>

          {/* Digital Rain Window */}
          <div className="relative w-64 sm:w-80 h-48 rounded-2xl bg-slate-950/90 border-2 border-[#00FFD1]/30 overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="absolute top-2 left-3 flex items-center gap-2 z-10">
              <span className="w-2 h-2 rounded-full bg-[#00FFD1] animate-ping"></span>
              <span className="font-mono text-[9px] text-[#00FFD1] tracking-widest uppercase font-bold">
                LAB WINDOW // DIGITAL RAIN
              </span>
            </div>

            <div className="absolute inset-0 pt-6 px-4 flex justify-between font-mono text-[10px] text-[#00FFD1]/70 leading-none overflow-hidden opacity-80 pointer-events-none">
              <div className="animate-[rainStream_4s_linear_infinite]">010101<br/>101010<br/>00FFD1<br/>ASTRO5<br/>GSAP3</div>
              <div className="animate-[rainStream_3.2s_linear_infinite_0.5s] text-emerald-400">REACT18<br/>TYPESCR<br/>110010<br/>010101<br/>SYSTEM</div>
              <div className="animate-[rainStream_4.5s_linear_infinite_1s]">CYBERP<br/>001100<br/>TAILWI<br/>PARALL<br/>LAB_V2</div>
              <div className="animate-[rainStream_3.8s_linear_infinite_0.2s] text-emerald-300">101010<br/>011001<br/>HOVER<br/>STREAM<br/>001101</div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════ LAYER 1 (MIDGROUND: z-index 20) ════════════════ */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-8 px-4"
      >
        <div className="w-full max-w-4xl transform scale-90 sm:scale-100 transition-transform">
          <Corkboard onSelectNote={handleSelectNote} />
        </div>
      </div>

      {/* ════════════════ LAYER 2 (FOREGROUND: z-index 30) ════════════════ */}
      <div
        ref={layer2Ref}
        className="absolute inset-x-0 bottom-0 z-30 pb-6 px-4 flex flex-col items-center justify-end"
      >
        <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Seated Typing Avatar Node */}
            <div className="relative flex flex-col items-center group">
              <div
                ref={avatarHeadRef}
                className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-slate-950 border-2 border-[#00FFD1]/60 shadow-[0_0_25px_rgba(0,255,209,0.3)] overflow-hidden cursor-pointer"
                title="Seated Developer Avatar // Gaze Tracking Active"
              >
                <video
                  src="/assets/avatar/typing-loop.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>
              <span className="font-mono text-[10px] text-[#00FFD1] mt-2 tracking-widest uppercase font-bold flex items-center gap-1">
                <Eye className="w-3 h-3 text-[#00FFD1] animate-pulse" /> GAZE_TRACKING: ONLINE
              </span>
            </div>

            {/* Laptop Workstation Trigger */}
            <div className="flex flex-col items-center">
              <LaptopTrigger onOpenTerminal={onOpenTerminal} />
            </div>

            {/* Interactive Props (Easter Eggs) */}
            <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
              
              <div
                onClick={handleCoffeeClick}
                className="relative p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#00FFD1] text-amber-400 hover:text-[#00FFD1] cursor-pointer transition-all duration-300 group"
                title="Click Coffee Cup (Refuel Coding Velocity)"
              >
                {coffeeSteam && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-[#00FFD1] animate-bounce">
                    ♨️ STEAM
                  </div>
                )}
                <Coffee className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-[9px] text-slate-400 block text-center mt-1">COFFEE</span>
              </div>

              <div
                onClick={handlePlantClick}
                className="relative p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-400 text-emerald-400 cursor-pointer transition-all duration-300 group"
                title="Click Desk Plant (Water Oxygen Synthesizer)"
              >
                {plantWatered && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-emerald-400 animate-bounce">
                    💧 WATERED
                  </div>
                )}
                <Droplets className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[9px] text-slate-400 block text-center mt-1">PLANT</span>
              </div>

              <div
                onClick={handleLampClick}
                className="relative p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-yellow-400 text-yellow-400 cursor-pointer transition-all duration-300 group"
                title="Click Desk Lamp (Toggle Room Lighting State)"
              >
                {roomTheme === 'cyberpunk' ? (
                  <Moon className="w-6 h-6 group-hover:rotate-45 transition-transform text-[#00FFD1]" />
                ) : (
                  <Sun className="w-6 h-6 group-hover:rotate-45 transition-transform text-amber-500" />
                )}
                <span className="font-mono text-[9px] text-slate-400 block text-center mt-1">LAMP</span>
              </div>

            </div>

          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span>WORKBENCH // PINNED SCROLLTRIGGER ACTIVE</span>
              <span>SCUB_RANGE: 0% → 100% UNHOOK</span>
            </div>
            <div className="flex items-center gap-2 text-[#00FFD1]">
              <ChevronDown className="w-4 h-4 animate-bounce text-[#00FFD1]" />
              <span>SCROLL DOWN TO UNHOOK LAB</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
