import React from 'react';
import { Laptop, Terminal, Sparkles } from 'lucide-react';
import { playSoundEffect } from '../core/AudioEngine';

interface LaptopTriggerProps {
  onOpenTerminal: () => void;
}

export const LaptopTrigger: React.FC<LaptopTriggerProps> = ({ onOpenTerminal }) => {
  return (
    <div
      onClick={() => {
        playSoundEffect('terminal');
        onOpenTerminal();
      }}
      className="relative group cursor-pointer transition-all duration-300"
    >
      {/* Outer Glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-neon-cyan/20 to-ocean-blue/30 rounded-2xl blur-md opacity-50 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300"></div>

      {/* 2.5D Laptop Chassis Container */}
      <div className="relative bg-lab-panel/90 border border-slate-700/80 group-hover:border-neon-cyan/80 p-4 rounded-2xl shadow-lab-card backdrop-blur-md transition-all duration-300 transform group-hover:-translate-y-1">
        {/* Screen Bezel */}
        <div className="relative w-48 sm:w-56 h-32 sm:h-36 rounded-lg bg-slate-950 border border-slate-800 p-2 overflow-hidden flex flex-col justify-between group-hover:border-neon-cyan/40 transition-colors">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-1">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
              <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
            </div>
            <span className="font-mono text-[9px] text-neon-cyan/70 tracking-widest uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 animate-spin" /> TERMINAL_OS
            </span>
          </div>

          {/* Screen Content Preview */}
          <div className="font-mono text-[10px] text-slate-300 space-y-1 my-1">
            <div className="text-neon-cyan flex items-center gap-1">
              <span>$</span> <span>sys.init --mode=interactive</span>
            </div>
            <div className="text-slate-400 text-[9px]">
              &gt; Loading WebGL &amp; GSAP timelines...
            </div>
            <div className="text-emerald-400 text-[9px]">
              &gt; Ready: Click to boot CLI
            </div>
          </div>

          {/* Prompt pulse bar */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-900 font-mono text-[9px] text-slate-500">
            <span>PORT_3000: ACTIVE</span>
            <span className="w-1.5 h-3 bg-neon-cyan animate-pulse"></span>
          </div>
        </div>

        {/* Laptop Base Stand */}
        <div className="mt-2 h-3 w-full bg-slate-800/90 rounded-b-lg border-t border-slate-700 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
        </div>

        {/* Interactive Overlay Callout */}
        <div className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-neon-cyan text-void font-mono font-bold text-[9px] uppercase tracking-wider shadow-neon-cyan flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
          <Terminal className="w-3 h-3" />
          <span>LAUNCH OS</span>
        </div>
      </div>
    </div>
  );
};
