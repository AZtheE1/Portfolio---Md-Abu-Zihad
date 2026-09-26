import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Layers, UserCheck, Mail, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavProps {
  onOpenTerminal?: () => void;
  audioMuted?: boolean;
  onToggleAudio?: () => void;
  currentTheme?: 'sterile' | 'cyberpunk';
  onToggleTheme?: () => void;
}

export const Nav: React.FC<NavProps> = ({
  onOpenTerminal,
  audioMuted = false,
  onToggleAudio,
  currentTheme = 'cyberpunk',
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-void/85 backdrop-blur-md border-b border-neon-cyan/20 shadow-neon-cyan/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand/System ID */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg bg-lab-panel border border-neon-cyan/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-neon-cyan group-hover:shadow-[0_0_15px_rgba(0,255,209,0.4)]">
            <Cpu className="w-5 h-5 text-neon-cyan animate-pulse" />
            <span className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm tracking-wider text-slate-100 group-hover:text-neon-cyan transition-colors">
                ZIHAD.ARCH
              </span>
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping"></span>
            </div>
            <span className="font-mono text-[10px] text-slate-400 block tracking-widest uppercase">
              2.5D System Lab v2.0
            </span>
          </div>
        </a>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-1 bg-lab-panel/70 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
          <a
            href="#projects"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-neon-cyan hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-ocean-teal" />
            <span>PROJECTS</span>
          </a>
          <a
            href="#experience"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-neon-cyan hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-ocean-teal" />
            <span>TIMELINE</span>
          </a>
          <a
            href="#skills"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-neon-cyan hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-ocean-teal" />
            <span>ARCHITECTURES</span>
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-neon-cyan hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-ocean-teal" />
            <span>CONTACT</span>
          </a>
        </nav>

        {/* System Controls */}
        <div className="flex items-center gap-2">
          {/* Terminal Launcher */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="px-3 py-1.5 rounded-lg bg-lab-panel border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all flex items-center gap-2 text-xs font-mono shadow-sm group"
              title="Launch System Terminal OS"
            >
              <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">TERMINAL_OS</span>
            </button>
          )}

          {/* Theme Switcher */}
          {onToggleTheme && (
            <ThemeToggle currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
          )}

          {/* Audio Engine Mute/Unmute */}
          {onToggleAudio && (
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-lg border transition-all ${
                audioMuted
                  ? 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                  : 'bg-lab-panel border-neon-cyan/40 text-neon-cyan shadow-[0_0_10px_rgba(0,255,209,0.2)] hover:border-neon-cyan'
              }`}
              title={audioMuted ? 'Unmute Spatial Audio' : 'Mute Spatial Audio'}
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
