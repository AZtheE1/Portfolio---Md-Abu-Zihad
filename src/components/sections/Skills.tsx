import React from 'react';
import { Sparkles, Code, Cpu, Server, Terminal, Shield } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number; note: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Systems Architecture',
    icon: <Code className="w-5 h-5 text-neon-cyan" />,
    skills: [
      { name: 'Astro 5.x SSG / Islands', level: 95, note: 'Static Islands & SSR optimization' },
      { name: 'React 18 / 19 Core', level: 98, note: 'Custom hooks, state machine architecture' },
      { name: 'TypeScript Architecture', level: 94, note: 'Strict typing, generic design systems' },
      { name: 'Tailwind CSS / PostCSS', level: 96, note: 'Custom design tokens, arbitrary values' },
    ],
  },
  {
    title: 'Graphics & 2.5D / 3D Animation',
    icon: <Cpu className="w-5 h-5 text-ocean-teal" />,
    skills: [
      { name: 'GSAP 3.x Timeline & ScrollTrigger', level: 95, note: 'Complex scroll sync & parallax' },
      { name: 'Three.js / WebGL Basics', level: 85, note: 'Shader effects, 3D meshes & lighting' },
      { name: 'Web Audio API / Howler', level: 90, note: 'Spatialized audio triggers & micro-fx' },
      { name: 'CSS3 2.5D Micro-Parallax', level: 95, note: 'Hardware-accelerated transforms' },
    ],
  },
  {
    title: 'Backend & Cloud Infrastructure',
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    skills: [
      { name: 'Node.js / Express / Next.js', level: 90, note: 'REST, GraphQL, microservices' },
      { name: 'Cloudflare Pages / Wrangler / Vercel', level: 92, note: 'Edge deployment & worker scripts' },
      { name: 'REST & GraphQL APIs', level: 92, note: 'Schema design & caching layers' },
    ],
  },
  {
    title: 'Systems & Tooling',
    icon: <Terminal className="w-5 h-5 text-amber-400" />,
    skills: [
      { name: 'Git & Workflows', level: 95, note: 'CI/CD pipelines & release tags' },
      { name: 'Vite / Webpack Build Tuning', level: 88, note: 'Bundle splitting, tree shaking' },
      { name: 'Lighthouse Performance Audit', level: 98, note: '0ms CLS, 99+ score optimization' },
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-panel border border-neon-cyan/30 text-neon-cyan text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5 text-ocean-teal animate-spin" />
          <span>ARCHITECTURE MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          System <span className="text-neon-cyan text-glow-cyan">Capabilities</span> &amp; Stack
        </h2>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-lab-panel border border-slate-800 hover:border-neon-cyan/40 transition-all duration-300 shadow-lab-card"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-100">{cat.title}</h3>
            </div>

            <div className="space-y-5">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200 font-semibold">{skill.name}</span>
                    <span className="text-neon-cyan">{skill.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-ocean-teal to-neon-cyan transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono">
                    {skill.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
