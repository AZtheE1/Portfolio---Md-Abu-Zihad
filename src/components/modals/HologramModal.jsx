import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, ExternalLink, GitBranch, Cpu, ShieldAlert, Layers, Sparkles } from 'lucide-react';
import { playSound } from '../core/AudioEngine';

export const HologramModal = ({ isOpen, onClose, project, originPos }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const beamRef = useRef(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      playSound('holoBeam');

      // Expand GSAP animation from pin origin scale 0 -> 1 with cyan glow
      gsap.fromTo(
        modalRef.current,
        {
          scale: 0.1,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.4)',
        }
      );

      // Animate Cyan Laser Beam from pin position to center
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { strokeDashoffset: 1000, opacity: 1 },
          { strokeDashoffset: 0, opacity: 0.8, duration: 0.4, ease: 'power2.out' }
        );
      }
    }
  }, [isOpen]);

  const handleDismiss = () => {
    playSound('switchSound');

    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.2,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setShowIframe(false);
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  // Pin origin screen percentage coordinates or default to center
  const originX = originPos ? originPos.x : 50;
  const originY = originPos ? originPos.y : 50;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) handleDismiss();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/85 backdrop-blur-xl select-none"
    >
      {/* Cyan Laser Beam Overlay (Fires from Pushpin to Screen Center) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFD1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#008080" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <line
          ref={beamRef}
          x1={`${originX}%`}
          y1={`${originY}%`}
          x2="50%"
          y2="50%"
          stroke="url(#laserGrad)"
          strokeWidth="3"
          strokeDasharray="1000"
          className="drop-shadow-[0_0_12px_#00FFD1]"
        />
      </svg>

      {/* Hologram Window Container */}
      <div
        ref={modalRef}
        className="relative z-20 w-full max-w-3xl rounded-3xl bg-[#111827]/95 border-2 border-[#00FFD1] shadow-[0_0_50px_rgba(0,255,209,0.35)] overflow-hidden font-sans"
      >
        {/* Hologram Beam Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#00FFD1]/30 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00FFD1]/20 border border-[#00FFD1] flex items-center justify-center text-[#00FFD1]">
              <Cpu className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#00FFD1] font-bold tracking-wider uppercase">
                  {project.codename}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#008080]/30 border border-[#00FFD1]/40 font-mono text-[9px] text-[#00FFD1]">
                  {project.date}
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                CLASSIFIED CASE FILE // SEC_LEVEL_04
              </span>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-[#00FFD1] hover:border-[#00FFD1] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hologram Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title & Tag */}
          <div>
            <span className="px-3 py-1 rounded-full bg-[#008080]/20 border border-[#008080]/40 font-mono text-[10px] text-[#00FFD1] uppercase font-semibold">
              #{project.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Problem Statement Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
            <h3 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> SYSTEM PROBLEM STATEMENT
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "{project.problem}"
            </p>
          </div>

          {/* Architecture Specifications */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <h3 className="font-mono text-xs font-bold text-[#00FFD1] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#008080]" /> ARCHITECTURAL BLUEPRINT
            </h3>
            <ul className="space-y-2 text-xs font-mono text-slate-300">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] mt-1.5 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Demo Viewport Preview (if enabled) */}
          {showIframe && (
            <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-[#00FFD1]/40 overflow-hidden shadow-2xl">
              <iframe
                src={project.demoUrl}
                title={project.title}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              {project.demoUrl && (
                <button
                  onClick={() => setShowIframe(!showIframe)}
                  className="px-4 py-2.5 rounded-xl bg-[#00FFD1] text-[#0B0F19] font-bold shadow-[0_0_15px_rgba(0,255,209,0.4)] hover:bg-white transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{showIframe ? 'HIDE DEMO VIEWPORT' : 'LAUNCH DEMO'}</span>
                </button>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#00FFD1] text-slate-200 hover:text-[#00FFD1] transition-all flex items-center gap-2"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>SOURCE REPOSITORY</span>
                </a>
              )}
            </div>

            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              [ DISMISS HOLOGRAM ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
