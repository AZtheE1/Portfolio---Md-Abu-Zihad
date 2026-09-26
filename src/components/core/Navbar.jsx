import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Layers, UserCheck, Mail, Sparkles, Volume2, VolumeX, EyeOff, Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { playSound } from './AudioEngine';

export const Navbar = ({
  onOpenTerminal,
  audioMuted = false,
  onToggleAudio,
  currentTheme = 'cyberpunk',
  onToggleTheme,
  reducedMotion = false,
  onToggleReducedMotion,
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
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0B0F19]/85 backdrop-blur-md border-b border-[#00FFD1]/20 shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Mark & Status Indicator */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            aria-label="Navigate to top 2.5D Lab Hero Stage"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#111827] border border-[#00FFD1]/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#00FFD1] group-hover:shadow-[0_0_15px_rgba(0,255,209,0.4)]">
              <Cpu className="w-5 h-5 text-[#00FFD1] animate-pulse" />
              <span className="absolute inset-0 bg-[#00FFD1]/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm tracking-wider text-slate-100 group-hover:text-[#00FFD1] transition-colors">
                  ZIHAD.ARCH
                </span>
                <span className="text-[10px] font-mono text-[#00FFD1] font-semibold">// V2-CORE</span>
              </div>
              <span className="font-mono text-[9px] text-slate-400 block tracking-widest uppercase">
                2.5D SYSTEM LAB
              </span>
            </div>
          </a>

          {/* Interactive Status Badge: 🟢 SYSTEM ONLINE // LAB READY */}
          <div
            role="status"
            aria-live="polite"
            className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827]/90 border border-[#00FFD1]/30 backdrop-blur-md text-[10px] font-mono text-emerald-400 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold tracking-wider">SYSTEM ONLINE // LAB READY</span>
          </div>
        </div>

        {/* Right: Smooth Scroll Anchor Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 bg-[#111827]/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
          <a
            href="#hero"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-[#00FFD1] hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#008080]" />
            <span>LAB</span>
          </a>
          <a
            href="#projects"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-[#00FFD1] hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#008080]" />
            <span>TIMELINE</span>
          </a>
          <a
            href="#skills"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-[#00FFD1] hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#008080]" />
            <span>ARCHITECTURE</span>
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-[#00FFD1] hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#008080]" />
            <span>CONTACT</span>
          </a>
        </nav>

        {/* System & Accessibility Controls */}
        <div className="flex items-center gap-2">
          {/* Reduced Motion Accessibility Toggle */}
          {onToggleReducedMotion && (
            <button
              onClick={() => {
                playSound('switchSound');
                onToggleReducedMotion(!reducedMotion);
              }}
              aria-label={reducedMotion ? 'Disable reduced motion mode' : 'Enable reduced motion accessibility mode'}
              aria-pressed={reducedMotion}
              className={`p-2 rounded-xl border font-mono text-[10px] transition-all flex items-center gap-1.5 ${
                reducedMotion
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-[#111827] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={reducedMotion ? 'Reduced Motion Active' : 'Enable Reduced Motion'}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{reducedMotion ? 'MOTION: OFF' : 'MOTION: ON'}</span>
            </button>
          )}

          {/* Terminal Launcher */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                playSound('switchSound');
                onOpenTerminal();
              }}
              aria-label="Boot CLI Terminal OS"
              className="px-3 py-1.5 rounded-xl bg-[#111827] border border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10 hover:border-[#00FFD1] transition-all flex items-center gap-2 text-xs font-mono shadow-sm group"
            >
              <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">TERMINAL_OS</span>
            </button>
          )}

          {/* Theme Switcher */}
          {onToggleTheme && (
            <ThemeToggle currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
          )}

          {/* Audio Toggle */}
          {onToggleAudio && (
            <button
              onClick={onToggleAudio}
              aria-label={audioMuted ? 'Unmute audio engine' : 'Mute audio engine'}
              aria-pressed={audioMuted}
              className={`p-2.5 rounded-xl border transition-all ${
                audioMuted
                  ? 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                  : 'bg-[#111827] border-[#00FFD1]/40 text-[#00FFD1] shadow-[0_0_10px_rgba(0,255,209,0.2)] hover:border-[#00FFD1]'
              }`}
              title={audioMuted ? 'Unmute Audio Engine' : 'Mute Audio Engine'}
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export const Nav = Navbar;
