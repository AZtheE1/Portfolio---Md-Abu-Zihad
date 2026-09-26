import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Nav } from './core/Nav';
import { AudioEngine } from './core/AudioEngine';
import { Preloader } from './core/Preloader';
import { LabStage } from './hero/LabStage';
import { FlatProjects } from './sections/FlatProjects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { HologramScreen, ProjectData } from './modals/HologramScreen';
import { MiniTerminalOS } from './modals/MiniTerminalOS';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const PortfolioShell: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [audioMuted, setAudioMuted] = useState(false);
  const [theme, setTheme] = useState<'cyberpunk' | 'sterile'>('cyberpunk');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [hologramOpen, setHologramOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('.scroll-reveal');
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'cyberpunk' ? 'sterile' : 'cyberpunk'));
    if (document.documentElement) {
      if (theme === 'cyberpunk') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  };

  const handleSelectProject = (project: ProjectData) => {
    setSelectedProject(project);
    setHologramOpen(true);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${theme === 'cyberpunk' ? 'bg-void text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Welcome Preloader Modal (Unmounts completely when finished) */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Global Audio Infrastructure Engine */}
      <AudioEngine
        isMuted={audioMuted}
        onToggleMute={(muted) => setAudioMuted(muted)}
      />

      {/* Navigation Header */}
      <Nav
        onOpenTerminal={() => setTerminalOpen(true)}
        audioMuted={audioMuted}
        onToggleAudio={() => setAudioMuted(!audioMuted)}
        currentTheme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Architecture */}
      <main>
        {/* Pinned 2.5D Lab Stage */}
        <LabStage
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenHologram={() => {
            setSelectedProject(null);
            setHologramOpen(true);
          }}
          onSelectNote={() => setHologramOpen(true)}
        />

        {/* 2D Surface Sections with Stagger Scroll Reveal */}
        <div className="scroll-reveal">
          <FlatProjects onSelectProject={handleSelectProject} />
        </div>

        <div className="scroll-reveal">
          <Experience />
        </div>

        <div className="scroll-reveal">
          <Skills />
        </div>

        <div className="scroll-reveal">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800/80 bg-lab-panel/50 text-center font-mono text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            <span>ZIHAD.ARCH // 2.5D SPATIAL SYSTEM PORTFOLIO v2.0</span>
          </div>
          <div>
            <span>BUILT WITH ASTRO, REACT, TAILWIND &amp; GSAP</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HologramScreen
        isOpen={hologramOpen}
        onClose={() => setHologramOpen(false)}
        project={selectedProject}
      />

      <MiniTerminalOS
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onToggleTheme={handleToggleTheme}
      />
    </div>
  );
};
