import React, { useState, useEffect } from 'react';

const BOOT_LOGS = [
  'INITIALIZING QUANTUM KERNEL v2.4.9...',
  'MOUNTING ASTRO ISLAND RUNTIME...',
  'CALIBRATING HARDWARE ACCELERATION (WEBGL 2.0)...',
  'ALLOCATING SHADER BUFFERS & POSTPROCESSING PIPELINE...',
  'RESOLVING CRIME SCENE PINS & HOLOGRAPHIC NODES...',
  'ESTABLISHING RECRUITER FALLBACK LINK...',
  'SYSTEM INTEGRITY: OPTIMAL (100%). COMMENCING PROJECTION...',
];

interface TerminalBootProps {
  onComplete?: () => void;
}

export const TerminalBoot: React.FC<TerminalBootProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[currentIdx]]);
        currentIdx++;
        setProgress(Math.round((currentIdx / BOOT_LOGS.length) * 100));
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooted(true);
          if (onComplete) onComplete();
        }, 600);
      }
    }, 240);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isBooted) return null;

  return (
    <div
      id="terminal-boot-screen"
      className="fixed inset-0 z-50 bg-[#05070f] flex flex-col items-center justify-center p-6 font-mono text-xs md:text-sm select-none transition-opacity duration-700"
    >
      <div className="w-full max-w-xl border border-cyber-accent/40 bg-cyber-card/90 rounded-lg p-6 shadow-neon-cyan relative overflow-hidden backdrop-blur-md">
        {/* Glow corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-accent" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-accent" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-accent" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-accent" />

        <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyber-border text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyber-red animate-pulse" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyber-yellow" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyber-green" />
            <span className="ml-2 text-cyber-accent font-semibold tracking-wider">
              CORE_BOOT_SEQUENCE.SH
            </span>
          </div>
          <span className="text-[11px] text-slate-400">v2.0-PROD</span>
        </div>

        <div className="space-y-1.5 min-h-[160px] text-slate-300">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-cyber-accent select-none">&gt;</span>
              <span className={index === logs.length - 1 ? 'text-cyber-green' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1 text-cyber-accent">
            <span>&gt;</span>
            <span className="inline-block w-2 h-4 bg-cyber-accent animate-pulse" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-cyber-border">
          <div className="flex justify-between items-center mb-1 text-[11px] text-slate-400">
            <span>STREAMING NEURAL ASSETS</span>
            <span className="text-cyber-accent font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyber-accent to-cyber-neon transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
