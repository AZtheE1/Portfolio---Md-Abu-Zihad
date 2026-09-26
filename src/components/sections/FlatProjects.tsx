import React, { useState } from 'react';
import { Layers, ExternalLink, GitBranch, Cpu, Sparkles, Filter } from 'lucide-react';
import { ProjectData } from '../modals/HologramScreen';
import { playSoundEffect } from '../core/AudioEngine';

interface FlatProjectsProps {
  onSelectProject: (project: ProjectData) => void;
}

const PROJECTS: ProjectData[] = [
  {
    id: 'proj-1',
    title: 'RECURSION 2.5D LAB PORTFOLIO',
    subtitle: 'Spatial Web Architecture & Virtual Workstation',
    description: 'A 2.5D interactive portfolio built with Astro, React islands, GSAP scroll triggers, Web Audio sound design, and custom design tokens.',
    architecture: ['Astro 5.x SSG', 'React 18 Component Islands', 'GSAP Timeline Choreography', 'Tailwind CSS Custom Design Tokens'],
    metrics: ['99/100 Lighthouse Benchmark', '60 FPS Motion', '0ms CLS'],
    githubUrl: 'https://github.com/AZtheE1/Portfolio---Md-Abu-Zihad',
    liveUrl: 'https://zihad-portfolio.pages.dev',
    category: 'Full-Stack Architecture',
  },
  {
    id: 'proj-2',
    title: 'ENTERPRISE TELEMETRY ENGINE',
    subtitle: 'Real-Time System Monitoring Platform',
    description: 'High-throughput system analytics dashboard monitoring microservices telemetry, WebSocket streaming, and automated health diagnostics.',
    architecture: ['React 18', 'TypeScript', 'Recharts Graphics', 'WebSocket Stream', 'Tailwind CSS'],
    metrics: ['Sub-15ms Data Render', '100k Events/sec Throughput', 'Zero Downtime Architecture'],
    githubUrl: 'https://github.com/AZtheE1',
    liveUrl: 'https://github.com/AZtheE1',
    category: 'Systems & Cloud',
  },
  {
    id: 'proj-3',
    title: 'AI AUTOMATION SUITE',
    subtitle: 'Intelligent Agentic Workflow Orchestrator',
    description: 'Autonomous multi-agent orchestration framework integrating LLM tool call APIs, background execution timers, and automated report generators.',
    architecture: ['Python', 'FastAPI', 'React Frontend', 'Redis Queue', 'Docker'],
    metrics: ['4x Task Throughput', 'Fully Autonomous Execution', 'Multi-agent Coordination'],
    githubUrl: 'https://github.com/AZtheE1',
    liveUrl: 'https://github.com/AZtheE1',
    category: 'AI & Automation',
  },
];

export const FlatProjects: React.FC<FlatProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Full-Stack Architecture', 'Systems & Cloud', 'AI & Automation'];

  const filteredProjects =
    activeCategory === 'ALL'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-panel border border-neon-cyan/30 text-neon-cyan text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-ocean-teal" />
            <span>FEATURED SYSTEM PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Architectural <span className="text-neon-cyan text-glow-cyan">Case Studies</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-lab-panel/80 p-1.5 rounded-2xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSoundEffect('hover');
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                activeCategory === cat
                  ? 'bg-neon-cyan text-void font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-3xl bg-lab-panel border border-slate-800 hover:border-neon-cyan/60 p-6 shadow-lab-card hover:shadow-[0_0_30px_rgba(0,255,209,0.15)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Category Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-ocean-teal/20 border border-ocean-teal/40 font-mono text-[10px] text-neon-cyan uppercase">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  SYS_ID: {project.id}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-neon-cyan transition-colors">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-ocean-teal mt-1 font-semibold">
                {project.subtitle}
              </p>

              <p className="text-sm text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {project.architecture.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Actions */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  playSoundEffect('hologram');
                  onSelectProject(project);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-mono text-xs font-bold hover:bg-neon-cyan hover:text-void transition-all flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>INSPECT HOLOGRAM</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-neon-cyan hover:border-slate-700 transition-colors"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-neon-cyan hover:border-slate-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
