import React from 'react';
import { UserCheck, Calendar, Briefcase, ChevronRight, Award } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  tech: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Principal Frontend Systems Architect',
    company: 'Recursion Systems Lab',
    period: '2024 - PRESENT',
    location: 'Remote / Global',
    achievements: [
      'Architected 2.5D interactive WebGL/GSAP client rendering engine reducing layout shifts to 0ms.',
      'Designed modular micro-frontend design token system powering multi-platform web applications.',
      'Led performance tuning initiatives achieving 99+ Lighthouse scores across core web vitals.',
    ],
    tech: ['Astro', 'React 18', 'GSAP 3.x', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'exp-2',
    role: 'Senior Full-Stack Engineer',
    company: 'Apex Digital Systems',
    period: '2022 - 2024',
    location: 'Dhaka, Bangladesh',
    achievements: [
      'Built high-concurrency real-time WebSocket dashboard for enterprise cloud monitoring.',
      'Implemented automated CI/CD pipeline reducing release cycle times by 45%.',
      'Mentored junior frontend developers in modern React state patterns & clean architecture.',
    ],
    tech: ['Next.js', 'Node.js', 'GraphQL', 'Tailwind CSS', 'Docker'],
  },
  {
    id: 'exp-3',
    role: 'Frontend UI/UX Systems Developer',
    company: 'Nova Interactive Studio',
    period: '2020 - 2022',
    location: 'Contract',
    achievements: [
      'Developed interactive client showcases, custom animation components, and 3D web visuals.',
      'Streamlined component design system across 10+ client web applications.',
    ],
    tech: ['React', 'Three.js', 'JavaScript', 'Sass/PostCSS'],
  },
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-panel border border-neon-cyan/30 text-neon-cyan text-xs font-mono mb-3">
          <UserCheck className="w-3.5 h-3.5 text-ocean-teal" />
          <span>CAREER CHRONOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          System <span className="text-neon-cyan text-glow-cyan">Experience</span> Timeline
        </h2>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12">
        {EXPERIENCES.map((item) => (
          <div key={item.id} className="relative pl-6 sm:pl-10 group">
            {/* Timeline Dot Node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-lab-panel border-2 border-neon-cyan group-hover:bg-neon-cyan group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(0,255,209,0.5)]"></div>

            {/* Content Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-lab-panel border border-slate-800 group-hover:border-neon-cyan/40 transition-all duration-300 shadow-lab-card">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-ocean-teal/20 border border-ocean-teal/40 font-mono text-[10px] text-neon-cyan uppercase flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-neon-cyan" /> {item.period}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {item.location}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-neon-cyan transition-colors">
                {item.role}
              </h3>
              <p className="font-mono text-sm text-ocean-teal font-semibold mt-0.5">
                {item.company}
              </p>

              {/* Achievements */}
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {item.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
                {item.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
