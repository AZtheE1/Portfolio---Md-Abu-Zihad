import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { playSoundEffect } from '../core/AudioEngine';

interface MiniTerminalOSProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const MiniTerminalOS: React.FC<MiniTerminalOSProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'sys.init',
      output: (
        <div className="text-neon-cyan font-mono text-xs space-y-1">
          <p>&gt; ZIHAD_ARCH TERMINAL OS v2.0 READY</p>
          <p>&gt; Type <span className="text-yellow-300 font-bold">'help'</span> for available commands.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playSoundEffect('terminal');

    let outputNode: React.ReactNode;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-neon-cyan font-bold">AVAILABLE SYSTEM COMMANDS:</p>
            <p><span className="text-yellow-300">bio</span>        - Display Principal Architect overview</p>
            <p><span className="text-yellow-300">skills</span>     - List core architecture capabilities</p>
            <p><span className="text-yellow-300">projects</span>   - View featured system project index</p>
            <p><span className="text-yellow-300">contact</span>    - Show secure email &amp; transmission links</p>
            <p><span className="text-yellow-300">theme</span>      - Toggle interface design mode</p>
            <p><span className="text-yellow-300">clear</span>      - Clear terminal logs</p>
            <p><span className="text-yellow-300">exit</span>       - Close Terminal OS</p>
          </div>
        );
        break;

      case 'bio':
        outputNode = (
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Md. Abu Zihad is a Principal Frontend Systems Architect specializing in high-performance 2.5D interactive web applications, WebGL/GSAP animation engines, and resilient full-stack cloud systems.
          </p>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-emerald-400 font-bold">&gt; CORE STACK &amp; CAPABILITIES:</p>
            <p>• Frameworks: Astro, React 18/19, Next.js, Vite</p>
            <p>• Graphics &amp; Animation: GSAP 3.x, Three.js, Web Audio, CSS3 2.5D</p>
            <p>• Styling &amp; Tooling: Tailwind CSS, PostCSS, TypeScript, Webpack</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-neon-cyan font-bold">&gt; FEATURED SYSTEM PROJECTS:</p>
            <p>1. Recursion 2.5D Lab Portfolio (Astro, React, GSAP)</p>
            <p>2. Enterprise Spatial Analytics Console (React, WebGL)</p>
            <p>3. Cloud Telemetry Dashboard (Astro SSG, Tailwind)</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-yellow-300 font-bold">&gt; COMMUNICATIONS ENCRYPTED:</p>
            <p>• Email: mdabuzihad.dev@gmail.com</p>
            <p>• GitHub: github.com/AZtheE1</p>
          </div>
        );
        break;

      case 'theme':
        onToggleTheme?.();
        outputNode = <p className="text-xs font-mono text-neon-cyan">&gt; Theme toggle executed.</p>;
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      default:
        outputNode = (
          <p className="text-xs font-mono text-red-400">
            Command not recognized: '{cmd}'. Type <span className="text-yellow-300 font-bold">'help'</span> for command index.
          </p>
        );
    }

    setLogs((prev) => [...prev, { command: inputVal, output: outputNode }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/85 backdrop-blur-md animate-fadeIn">
      {/* Terminal OS Window */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-950 border border-neon-cyan/50 shadow-[0_0_40px_rgba(0,255,209,0.25)] overflow-hidden font-mono flex flex-col h-[500px]">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-lab-panel border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose}></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-xs text-slate-300 font-bold ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-neon-cyan" /> TERMINAL_OS // ZIHAD.SYS
            </span>
          </div>

          <button
            onClick={() => {
              playSoundEffect('click');
              onClose();
            }}
            className="text-slate-400 hover:text-neon-cyan transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/90 text-slate-200 text-xs">
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-neon-cyan">
                <span>zihad@architect:~$</span>
                <span className="text-slate-100 font-bold">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <form onSubmit={handleCommandSubmit} className="p-3 bg-lab-panel border-t border-slate-800 flex items-center gap-2">
          <span className="text-neon-cyan font-bold text-xs">zihad@architect:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command ('help', 'bio', 'projects', 'exit')..."
            className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600"
          />
          <button type="submit" className="px-3 py-1 rounded bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan text-[11px] font-bold hover:bg-neon-cyan/30">
            EXEC
          </button>
        </form>
      </div>
    </div>
  );
};
