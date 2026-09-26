import React, { useRef } from 'react';
import gsap from 'gsap';
import { playSound } from '../core/AudioEngine';
import { Terminal, Sparkles, Monitor } from 'lucide-react';

export const LaptopNode = ({ onOpenTerminal }) => {
  const laptopRef = useRef(null);

  const handleLaptopClick = () => {
    playSound('switchSound');

    // Cinematic 2D Viewport Zoom Transition to 90% screen scale
    if (laptopRef.current) {
      gsap.to(laptopRef.current, {
        scale: 1.15,
        duration: 0.3,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          if (onOpenTerminal) onOpenTerminal();
        },
      });
    } else {
      if (onOpenTerminal) onOpenTerminal();
    }
  };

  return (
    <div
      ref={laptopRef}
      onClick={handleLaptopClick}
      className="relative group cursor-pointer transition-all duration-300 select-none"
      title="Click Workstation Laptop to Boot MiniTerminal OS"
    >
      {/* Outer Cyan Neon Underglow */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-[#00FFD1]/30 to-[#008080]/40 rounded-3xl blur-md opacity-60 group-hover:opacity-100 group-hover:blur-xl transition-all duration-300"></div>

      {/* 2.5D Workstation Chassis Container */}
      <div className="relative bg-[#111827]/95 border border-slate-700/80 group-hover:border-[#00FFD1] p-4 sm:p-5 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 transform group-hover:-translate-y-1">
        {/* Screen Bezel Frame */}
        <div className="relative w-52 sm:w-64 h-36 sm:h-44 rounded-2xl bg-slate-950 border-2 border-slate-800 p-3 overflow-hidden flex flex-col justify-between group-hover:border-[#00FFD1]/50 transition-colors shadow-inner">
          
          {/* Bezel Titlebar & Window Indicators */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            </div>
            <span className="font-mono text-[9px] text-[#00FFD1] tracking-widest uppercase font-bold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 animate-spin text-[#00FFD1]" /> TERMINAL_SHELL
            </span>
          </div>

          {/* Screen Prompt Content: visitor@lab:~$ */}
          <div className="font-mono text-xs text-slate-200 my-auto space-y-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[#00FFD1] font-bold">visitor@lab:~$</span>
              <span className="w-2 h-4 bg-[#00FFD1] inline-block animate-pulse"></span>
            </div>
            <div className="text-[10px] text-slate-400">
              &gt; Click screen to boot full interactive CLI shell...
            </div>
          </div>

          {/* Bottom Screen Bar */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-900 font-mono text-[9px] text-slate-500">
            <span>PORT: 3000 // UNIX_EMULATOR</span>
            <span className="text-[#00FFD1] font-semibold">CLICK TO ZOOM</span>
          </div>
        </div>

        {/* Laptop Stand Base */}
        <div className="mt-2 h-3.5 w-full bg-slate-800 rounded-b-xl border-t border-slate-700 flex items-center justify-center">
          <div className="w-14 h-1 bg-slate-600 rounded-full"></div>
        </div>

        {/* Floating Action Badge */}
        <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-[#00FFD1] text-[#0B0F19] font-mono font-bold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,209,0.5)] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
          <Terminal className="w-3.5 h-3.5" />
          <span>BOOT OS</span>
        </div>
      </div>
    </div>
  );
};

// Export LaptopTrigger alias for seamless compatibility
export const LaptopTrigger = LaptopNode;
