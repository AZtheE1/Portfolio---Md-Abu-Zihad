import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square, FileText, Cpu, Sparkles, HelpCircle } from 'lucide-react';
import { playSound } from '../core/AudioEngine';

export const MiniTerminalOS = ({ isOpen, onClose, onToggleTheme }) => {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'specs' | 'readme'
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [logs, setLogs] = useState([
    {
      command: 'sys.init',
      output: (
        <div className="text-[#00FFD1] font-mono text-xs space-y-1">
          <p>&gt; ZIHAD_ARCH TERMINAL OS v2.0 READY [UNIX COMPATIBLE]</p>
          <p>&gt; Type <span className="text-yellow-300 font-bold">'help'</span> to view available system commands.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    playSound('keystroke');
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playSound('switchSound');

    let outputNode;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-[#00FFD1] font-bold">&gt; SYSTEM COMMAND INDEX:</p>
            <p><span className="text-yellow-300">about / bio</span>  - Principal Systems Architect bio &amp; summary</p>
            <p><span className="text-yellow-300">projects</span>     - List case studies &amp; system architecture repositories</p>
            <p><span className="text-yellow-300">skills</span>       - View core technical stack &amp; capabilities</p>
            <p><span className="text-yellow-300">contact</span>      - Display direct email &amp; encrypted transmission channels</p>
            <p><span className="text-yellow-300">clear</span>        - Clear terminal screen logs</p>
            <p><span className="text-yellow-300">exit</span>         - Revert zoom back to desk environment</p>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        outputNode = (
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Md. Abu Zihad is a Principal Frontend Systems Architect specializing in 2.5D spatial web applications, high-performance WebGL/GSAP engines, and resilient full-stack cloud architectures.
          </p>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-emerald-400 font-bold">&gt; ARCHITECTURAL CAPABILITIES:</p>
            <p>• Frameworks: Astro 5.x SSG, React 18/19 Islands, Next.js</p>
            <p>• Animation: GSAP 3.x Timeline/ScrollTrigger, CSS 2.5D Parallax</p>
            <p>• Tooling: Tailwind CSS Tokens, TypeScript, Vite, Howler.js</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-[#00FFD1] font-bold">&gt; FEATURED SYSTEM CASE FILES:</p>
            <p>1. Project Recursion 2.5D Lab (Astro, React, GSAP)</p>
            <p>2. Enterprise Telemetry Engine (React 18, WebSockets)</p>
            <p>3. Autonomous Multi-Agent Suite (Python, FastAPI, Redis)</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-yellow-300 font-bold">&gt; TRANSMISSION CHANNELS:</p>
            <p>• Direct Email: mdabuzihad.dev@gmail.com</p>
            <p>• GitHub: github.com/AZtheE1</p>
          </div>
        );
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/90 backdrop-blur-2xl animate-fadeIn select-none">
      {/* Heavy Vignette Darkening Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,7,15,0.95)_100%)] pointer-events-none"></div>

      {/* Cyberpunk Desktop Terminal OS Window */}
      <div
        className={`relative z-20 rounded-3xl bg-slate-950 border-2 border-[#00FFD1] shadow-[0_0_60px_rgba(0,255,209,0.3)] overflow-hidden font-mono flex flex-col transition-all duration-300 ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-4xl h-[560px]'
        }`}
      >
        {/* System Titlebar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#111827] border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* Window Controls: Close, Minimize, Maximize */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                title="Close OS (Revert Zoom)"
              >
                <X className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                title="Minimize OS"
              >
                <Minus className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                title="Toggle Maximize OS"
              >
                <Square className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
              </button>
            </div>

            <span className="text-xs text-slate-200 font-bold ml-2 flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-[#00FFD1]" />
              <span>MINI_TERMINAL_OS // ZIHAD.SYS</span>
            </span>
          </div>

          {/* Quick Access Visual Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                playSound('switchSound');
                setActiveTab('terminal');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-[#00FFD1] text-[#0B0F19] font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Terminal</span>
            </button>

            <button
              onClick={() => {
                playSound('switchSound');
                setActiveTab('specs');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'specs'
                  ? 'bg-[#00FFD1] text-[#0B0F19] font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>System Specs</span>
            </button>

            <button
              onClick={() => {
                playSound('switchSound');
                setActiveTab('readme');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'readme'
                  ? 'bg-[#00FFD1] text-[#0B0F19] font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>README.md</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Terminal Body Logs */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950 text-slate-200 text-xs">
              {logs.map((log, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-[#00FFD1]">
                    <span>visitor@lab:~$</span>
                    <span className="text-slate-100 font-bold">{log.command}</span>
                  </div>
                  <div className="pl-4">{log.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Command Line Input Bar with Typing Sounds */}
            <form onSubmit={handleCommandSubmit} className="p-4 bg-[#111827] border-t border-slate-800 flex items-center gap-3">
              <span className="text-[#00FFD1] font-bold text-xs">visitor@lab:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                placeholder="Type command ('help', 'bio', 'projects', 'skills', 'clear', 'exit')..."
                className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#00FFD1]/20 border border-[#00FFD1]/40 text-[#00FFD1] text-xs font-bold hover:bg-[#00FFD1] hover:text-[#0B0F19] transition-all"
              >
                EXEC
              </button>
            </form>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="flex-1 p-8 overflow-y-auto space-y-6 text-xs text-slate-300">
            <h3 className="text-sm font-bold text-[#00FFD1] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#008080]" /> SYSTEM SPECIFICATIONS &amp; BENCHMARKS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block mb-2">FRONTEND RENDER PIPELINE</span>
                <p>• Framework: Astro 5.x Static Islands</p>
                <p>• View Library: React 18 Concurrent Mode</p>
                <p>• Parallax: GSAP 3.x Hardware Accelerated</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block mb-2">AUDIO &amp; PERFORMANCE</span>
                <p>• Audio Engine: Howler.js Spatial Synthesizer</p>
                <p>• Lighthouse Score: 99/100 Benchmark</p>
                <p>• CLS: 0.00ms Layout Shift</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'readme' && (
          <div className="flex-1 p-8 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
            <h3 className="text-base font-bold text-[#00FFD1] font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#008080]" /> README.md // ZIHAD.ARCH
            </h3>
            <p>
              Welcome to the 2.5D Interactive Systems Portfolio for Md. Abu Zihad. This project combines Astro static site generation, React island components, GSAP timeline animations, and Howler audio spatialization.
            </p>
            <p className="font-mono text-emerald-400">
              [SYSTEM STATUS: ALL UNITS ONLINE &amp; ACCELERATED]
            </p>
          </div>
        )}

        {/* OS Footer Bar */}
        <div className="px-5 py-2 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>PORT: 3000 // STATUS: CONNECTED</span>
          <span>PRESS 'ESC' OR CLICK 'X' TO EXIT OS</span>
        </div>
      </div>
    </div>
  );
};
