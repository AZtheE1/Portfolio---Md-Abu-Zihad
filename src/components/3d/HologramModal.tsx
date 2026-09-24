import React from 'react';
import { Html } from '@react-three/drei';

interface HologramModalProps {
  study: {
    slug: string;
    data: {
      title: string;
      description: string;
      tags: string[];
      category: string;
      role: string;
      date: string;
      liveUrl?: string;
      githubUrl?: string;
      hologramColor?: string;
    };
  };
  onClose: () => void;
}

export const HologramModal: React.FC<HologramModalProps> = ({ study, onClose }) => {
  return (
    <Html
      position={[0, 0.2, 0.4]}
      center
      transform
      distanceFactor={3}
      zIndexRange={[100, 0]}
    >
      <div className="w-[420px] max-w-[90vw] bg-cyber-dark/95 border-2 border-cyber-accent rounded-xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden font-mono text-xs select-none">
        {/* Hologram Scanlines Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-accent/10 to-transparent pointer-events-none opacity-40 animate-pulse" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyber-border mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-red animate-ping" />
            <span className="font-bold text-cyber-accent text-sm tracking-wide">
              HOLOGRAPHIC ARCHIVE
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-0.5 rounded bg-cyber-red/20 text-cyber-red border border-cyber-red/40 hover:bg-cyber-red hover:text-white transition-colors text-xs font-bold"
          >
            [ ESC / CLOSE ]
          </button>
        </div>

        {/* Content Details */}
        <div className="space-y-3 relative z-10">
          <div>
            <div className="text-[10px] text-slate-400">{study.data.category} &bull; {study.data.date}</div>
            <h3 className="text-base font-bold text-white mt-0.5">{study.data.title}</h3>
            <div className="text-cyber-green text-[11px] font-semibold mt-0.5">{study.data.role}</div>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed border-l-2 border-cyber-accent/50 pl-2">
            {study.data.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {study.data.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-slate-900 border border-cyber-border text-slate-300 text-[10px]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Links & Holographic Portal Link */}
          <div className="pt-3 border-t border-cyber-border/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {study.data.liveUrl && (
                <a
                  href={study.data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-cyber-accent text-slate-950 font-bold hover:opacity-90 transition-opacity"
                >
                  Inspect Live Deployment &rarr;
                </a>
              )}
              {study.data.githubUrl && (
                <a
                  href={study.data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};
