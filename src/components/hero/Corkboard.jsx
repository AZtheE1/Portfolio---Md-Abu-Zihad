import React, { useRef } from 'react';
import gsap from 'gsap';
import { playSound } from '../core/AudioEngine';
import { PROJECTS } from '../../data/projects';
import { Pin, Eye, Sparkles } from 'lucide-react';

export const Corkboard = ({ onSelectNote }) => {
  const noteRefs = useRef({});

  // GSAP Jitter / Fluttering animation onMouseEnter
  const handleNoteMouseEnter = (id) => {
    playSound('paperRustle');

    const targetEl = noteRefs.current[id];
    if (targetEl) {
      gsap.to(targetEl, {
        rotate: '+=3',
        y: '-=4',
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: 'sine.inOut',
      });
    }
  };

  const handleNoteClick = (project, pinX, pinY) => {
    playSound('holoBeam');
    if (onSelectNote) {
      onSelectNote(project, { x: pinX, y: pinY });
    }
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-[#2B1D14] border-4 border-amber-950/90 shadow-2xl overflow-hidden group font-sans select-none">
      {/* High-Tech Mesh Corkboard Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

      {/* Detective Board Header Badge */}
      <div className="flex items-center justify-between mb-6 border-b border-amber-900/60 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4 text-red-500 animate-bounce" />
          <span className="font-mono text-xs text-amber-200 tracking-wider uppercase font-bold">
            DETECTIVE TIMELINE // CASE FILE ARCHIVES
          </span>
        </div>
        <span className="font-mono text-[10px] text-amber-400/80 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-800/40">
          SEC_LEVEL: 04 // TIMELINE_CONNECTED
        </span>
      </div>

      {/* SVG Connecting Red Thread Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#EF4444" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Curved Dashed Red Thread paths connecting pin positions */}
        <path
          d="M 180,90 Q 320,50 480,85"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          filter="url(#threadGlow)"
          className="animate-pulse"
        />
        <path
          d="M 480,85 Q 640,130 780,105"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          filter="url(#threadGlow)"
          className="animate-pulse"
        />
      </svg>

      {/* Chronological Sticky Notes Grid (Left to Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
        {PROJECTS.map((project, index) => {
          const rotations = ['-rotate-2', 'rotate-2', '-rotate-1'];
          const rotationClass = rotations[index % rotations.length];

          return (
            <div
              key={project.id}
              ref={(el) => (noteRefs.current[project.id] = el)}
              onMouseEnter={() => handleNoteMouseEnter(project.id)}
              onClick={() => handleNoteClick(project, project.pinPos.x, project.pinPos.y)}
              className={`relative p-5 rounded-xl ${project.noteColor} ${rotationClass} shadow-xl hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer border border-black/15 flex flex-col justify-between min-h-[200px]`}
            >
              {/* Red Metallic Pushpin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-red-600 border-2 border-red-300 shadow-md flex items-center justify-center z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>

              {/* Note Header */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold tracking-widest opacity-80 uppercase">
                    {project.codename}
                  </span>
                  <span className="font-mono text-[9px] opacity-70 font-semibold">
                    {project.date}
                  </span>
                </div>

                <h3 className="font-handwritten text-xl font-bold leading-tight mb-2">
                  {project.title}
                </h3>

                <p className="font-handwritten text-base leading-snug opacity-90 line-clamp-3">
                  "{project.problem}"
                </p>
              </div>

              {/* Note Footer Badge */}
              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between font-mono text-[11px] font-bold opacity-85">
                <span>#{project.tag}</span>
                <span className="flex items-center gap-1 hover:underline">
                  <Eye className="w-3.5 h-3.5" /> INSPECT CASE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
