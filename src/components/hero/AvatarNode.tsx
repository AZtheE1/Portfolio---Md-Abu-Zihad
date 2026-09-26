import React from 'react';
import { User, Activity, Zap } from 'lucide-react';
import { playSoundEffect } from '../core/AudioEngine';

interface AvatarNodeProps {
  onHover?: () => void;
}

export const AvatarNode: React.FC<AvatarNodeProps> = ({ onHover }) => {
  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => {
        playSoundEffect('hover');
        onHover?.();
      }}
    >
      {/* Outer Holographic Energy Ring */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-neon-cyan/20 via-ocean-teal/20 to-ocean-blue/20 blur-md group-hover:blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

      {/* Main Avatar Container */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-lab-panel border-2 border-neon-cyan/50 p-2 group-hover:border-neon-cyan shadow-[0_0_25px_rgba(0,255,209,0.3)] transition-all duration-500 flex items-center justify-center overflow-hidden">
        {/* Animated Background Mesh Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00FFD1_1px,transparent_1px)] [background-size:12px_12px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

        {/* Hologram Avatar Core */}
        <div className="relative w-full h-full rounded-full bg-slate-900/90 border border-slate-700/60 flex flex-col items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <User className="w-16 h-16 sm:w-20 sm:h-20 text-neon-cyan group-hover:drop-shadow-[0_0_12px_rgba(0,255,209,0.8)] transition-all" />
          <div className="absolute bottom-2 inset-x-0 flex justify-center">
            <span className="px-2 py-0.5 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 text-[9px] font-mono text-neon-cyan tracking-tighter">
              PRINCIPAL ARCHITECT
            </span>
          </div>
        </div>

        {/* Orbiting Telemetry Dot */}
        <div className="absolute w-3 h-3 rounded-full bg-neon-cyan border-2 border-void shadow-[0_0_10px_#00FFD1] animate-spin origin-[88px_88px] sm:origin-[104px_104px]"></div>
      </div>

      {/* Floating Status Badge */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-lab-panel/90 border border-neon-cyan/40 backdrop-blur-md flex items-center gap-1.5 shadow-md">
        <Activity className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
        <span className="font-mono text-[10px] text-slate-200 uppercase tracking-widest flex items-center gap-1">
          SYS_STATUS: <span className="text-neon-cyan font-bold">ONLINE</span>
        </span>
      </div>
    </div>
  );
};
