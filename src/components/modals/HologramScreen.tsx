import React from 'react';
import { X, ExternalLink, Cpu, ShieldCheck, Terminal, Layers, GitBranch } from 'lucide-react';
import { playSoundEffect } from '../core/AudioEngine';

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  architecture: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

const DEFAULT_PROJECT: ProjectData = {
  id: 'project-hologram-1',
  title: 'RECURSION 2.5D ENGINE & PORTFOLIO',
  subtitle: 'High-Performance Spatial Web Architecture',
  description: 'A cutting-edge 2.5D interactive web experience built with Astro, React, GSAP timeline choreography, Web Audio spatialization, and glassmorphism styling.',
  architecture: ['Astro 5.x Static Engine', 'React 18 Component Islands', 'GSAP ScrollTrigger & Parallax', 'Tailwind CSS Design Tokens', 'Web Audio API Synthesizer'],
  metrics: ['99/100 Lighthouse Benchmark', '60 FPS Continuous Parallax', '0ms Cumulative Layout Shift'],
  githubUrl: 'https://github.com/AZtheE1/Portfolio---Md-Abu-Zihad',
  liveUrl: 'https://zihad-portfolio.pages.dev',
  category: 'Full-Stack Architecture',
};

interface HologramScreenProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectData | null;
}

export const HologramScreen: React.FC<HologramScreenProps> = ({
  isOpen,
  onClose,
  project = DEFAULT_PROJECT,
}) => {
  if (!isOpen) return null;

  const currentProject = project || DEFAULT_PROJECT;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-xl animate-fadeIn">
      {/* Background Holographic Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(#00FFD1_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-lab-panel/95 border-2 border-neon-cyan shadow-[0_0_50px_rgba(0,255,209,0.3)] overflow-hidden font-sans">
        {/* Hologram Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neon-cyan/30 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center text-neon-cyan">
              <Cpu className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <span className="font-mono text-xs text-neon-cyan tracking-wider uppercase font-bold flex items-center gap-2">
                HOLOGRAM_VIEWPORT // SEC_ID: {currentProject.id}
              </span>
              <span className="font-mono text-[10px] text-slate-400 block">
                CATEGORY: {currentProject.category}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playSoundEffect('click');
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Project Title Banner */}
          <div>
            <span className="px-3 py-1 rounded-full bg-ocean-teal/20 border border-ocean-teal/50 font-mono text-[10px] text-neon-cyan tracking-wider uppercase">
              {currentProject.subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
              {currentProject.title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {currentProject.description}
          </p>

          {/* System Architecture Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Architecture Column */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h3 className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-ocean-teal" /> ARCHITECTURE STACK
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                {currentProject.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Benchmarks Column */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h3 className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> SYSTEM METRICS
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                {currentProject.metrics.map((metric, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Project Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-neon-cyan text-slate-200 hover:text-neon-cyan font-mono text-xs flex items-center gap-2 transition-all"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-neon-cyan text-void font-mono font-bold text-xs flex items-center gap-2 shadow-neon-cyan transition-all hover:bg-white"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH DEMO</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                playSoundEffect('click');
                onClose();
              }}
              className="font-mono text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              [ CLOSE VIEWPORT ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
