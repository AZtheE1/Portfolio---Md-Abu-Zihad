import React from 'react';
import { LaptopTrigger } from './LaptopTrigger';
import { AvatarNode } from './AvatarNode';
import { Monitor, Cpu, Server, Wifi, Activity, Terminal } from 'lucide-react';

interface DeskProps {
  onOpenTerminal: () => void;
  onOpenHologram: () => void;
}

export const Desk: React.FC<DeskProps> = ({ onOpenTerminal, onOpenHologram }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 px-4">
      {/* Workstation Desk Surface (2.5D Isometric Surface) */}
      <div className="relative rounded-3xl bg-gradient-to-b from-lab-panel via-slate-900 to-void border border-slate-800 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Desk Surface Tech Texture & Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Ambient Neon Cyan Underglow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-neon-cyan/10 blur-3xl pointer-events-none"></div>

        {/* Desk Items Layout Grid */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Left Column: Developer Avatar Node */}
          <div className="flex flex-col items-center gap-4">
            <AvatarNode />
            <div className="text-center font-mono">
              <h3 className="text-sm font-bold text-slate-100 tracking-wider">
                MD. ABU ZIHAD
              </h3>
              <p className="text-xs text-neon-cyan/80 mt-0.5">
                Full-Stack Systems Architect
              </p>
            </div>
          </div>

          {/* Center Workstation Display & Quick Controls */}
          <div className="flex-1 flex flex-col items-center text-center">
            {/* Hologram Monitor Console Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan mb-4 shadow-neon-cyan/10">
              <Monitor className="w-3.5 h-3.5 animate-pulse text-neon-cyan" />
              <span>LAB_WORKSTATION // NODE_01</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Architecting <span className="text-neon-cyan text-glow-cyan">Interactive</span> Systems
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed font-sans">
              High-performance 2.5D interactive web applications, real-time graphics pipelines, and robust full-stack architecture.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenHologram}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ocean-teal to-ocean-blue hover:from-neon-cyan hover:to-ocean-teal text-slate-950 font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-ocean-teal/20 hover:shadow-neon-cyan/30 transition-all duration-300 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                <span>INSPECT HOLOGRAM CASE</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="px-5 py-2.5 rounded-xl bg-lab-panel border border-neon-cyan/40 hover:border-neon-cyan text-neon-cyan font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 hover:bg-neon-cyan/10"
              >
                <Terminal className="w-4 h-4" />
                <span>BOOT TERMINAL OS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Workstation Laptop Trigger */}
          <div className="flex flex-col items-center gap-2">
            <LaptopTrigger onOpenTerminal={onOpenTerminal} />
            <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
              INTERACTIVE_CONSOLE
            </span>
          </div>
        </div>

        {/* Bottom Workstation Status Ribbon */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-ocean-teal" /> ASTRO 5.x SSG
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-neon-cyan" /> GSAP 3.x ENGINES
            </span>
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" /> LATENCY: &lt;12ms
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>GPU PIPELINE: ACCELERATED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
