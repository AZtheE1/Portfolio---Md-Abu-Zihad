import React from 'react';
import { Pin, FileText, CheckSquare, Search, Eye } from 'lucide-react';
import { playSoundEffect } from '../core/AudioEngine';

interface NoteItem {
  id: string;
  title: string;
  body: string;
  tag: string;
  bgColor: string;
  textColor: string;
  rotation: string;
}

const NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'ARCHITECTURAL DIRECTIVE #01',
    body: 'Decouple 2.5D layer pipelines. Ensure zero frame-drop during micro-parallax scroll sequences.',
    tag: 'SYSTEMS',
    bgColor: 'bg-[#FEF08A]', // Canary Yellow
    textColor: 'text-yellow-950',
    rotation: '-rotate-2',
  },
  {
    id: 'note-2',
    title: 'CASE FILE: RECURSION LABS',
    body: 'Integrated Web Audio spatialization + GSAP timeline triggers for interactive recruiter view.',
    tag: 'CASE_STUDY',
    bgColor: 'bg-[#BBF7D0]', // Terminal Green
    textColor: 'text-emerald-950',
    rotation: 'rotate-3',
  },
  {
    id: 'note-3',
    title: 'BENCHMARK METRICS',
    body: '99/100 Lighthouse performance. 0ms CLS. GPU hardware acceleration active.',
    tag: 'METRICS',
    bgColor: 'bg-[#CFFAFE]', // Arctic Cyan
    textColor: 'text-cyan-950',
    rotation: '-rotate-1',
  },
];

interface CorkboardProps {
  onSelectNote?: (noteId: string) => void;
}

export const Corkboard: React.FC<CorkboardProps> = ({ onSelectNote }) => {
  return (
    <div className="relative p-4 sm:p-6 rounded-2xl bg-[#2B1D14] border-4 border-amber-950/80 shadow-2xl overflow-hidden group">
      {/* High-Tech Mesh Overlay Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-4 border-b border-amber-900/60 pb-2">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4 text-amber-500 animate-bounce" />
          <span className="font-mono text-xs text-amber-200 tracking-wider uppercase font-semibold">
            SYSTEM ARCHITECTURE DETECTIVE BOARD
          </span>
        </div>
        <span className="font-mono text-[10px] text-amber-400/70 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40">
          SEC_LEVEL: 04
        </span>
      </div>

      {/* Grid of Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        {NOTES.map((note) => (
          <div
            key={note.id}
            onClick={() => {
              playSoundEffect('click');
              onSelectNote?.(note.id);
            }}
            className={`relative p-4 rounded-lg ${note.bgColor} ${note.textColor} ${note.rotation} shadow-lg hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer border border-black/10`}
          >
            {/* Red Pushpin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-2 border-red-300 shadow-md flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>

            <div className="font-handwritten text-lg font-bold mb-1 leading-tight flex items-center justify-between">
              <span>{note.title}</span>
            </div>
            <p className="font-handwritten text-base leading-snug opacity-90 mb-3">
              "{note.body}"
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-black/10 text-[11px] font-mono font-semibold opacity-75">
              <span>#{note.tag}</span>
              <span className="flex items-center gap-1 hover:underline">
                <Eye className="w-3 h-3" /> INSPECT
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
