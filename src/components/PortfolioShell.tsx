import React, { useState } from 'react';
import { RoomCanvas } from './RoomCanvas';
import { RecruiterView } from './RecruiterView';
import { TerminalBoot } from './TerminalBoot';

interface PortfolioShellProps {
  caseStudies: Array<{
    slug: string;
    data: {
      title: string;
      description: string;
      tags: string[];
      category: string;
      featured: boolean;
      date: string;
      role: string;
      liveUrl?: string;
      githubUrl?: string;
      hologramColor?: string;
      coordinates?: { x: number; y: number; z: number };
    };
  }>;
}

export const PortfolioShell: React.FC<PortfolioShellProps> = ({ caseStudies }) => {
  const [mode, setMode] = useState<'3d' | '2d'>('3d');
  const [bootCompleted, setBootCompleted] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#05070f] text-slate-100 flex flex-col crt-overlay">
      {/* 4.1 Immersive Retro Boot Sequence */}
      <TerminalBoot onComplete={() => setBootCompleted(true)} />

      {/* Persistent Cyber HUD Navigation */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-cyber-dark/80 border-b border-cyber-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyber-accent shadow-neon-cyan" />
            <span className="font-mono font-bold tracking-wider text-sm md:text-base text-white">
              ABU ZIHAD <span className="text-cyber-accent">// V2-CORE</span>
            </span>
          </div>

          {/* 4.6 Recruiter Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode((prev) => (prev === '3d' ? '2d' : '3d'))}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border ${
                mode === '2d'
                  ? 'bg-cyber-accent text-slate-950 border-cyber-accent shadow-neon-cyan'
                  : 'bg-slate-900/90 text-cyber-accent border-cyber-accent/40 hover:border-cyber-accent'
              }`}
            >
              <span>{mode === '3d' ? '⚡ SWITCH TO 2D RECRUITER VIEW' : '🌌 ENTER 3D VIRTUAL ROOM'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 w-full relative flex flex-col">
        {mode === '3d' ? (
          <div className="w-full h-[calc(100vh-65px)] min-h-[500px]">
            <RoomCanvas caseStudies={caseStudies} />
          </div>
        ) : (
          <div className="flex-1 w-full overflow-y-auto">
            <RecruiterView caseStudies={caseStudies} />
          </div>
        )}
      </main>
    </div>
  );
};
