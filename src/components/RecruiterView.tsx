import React, { useState } from 'react';

interface CaseStudyItem {
  slug: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    category: string;
    date: string;
    role: string;
    liveUrl?: string;
    githubUrl?: string;
    hologramColor?: string;
  };
}

interface RecruiterViewProps {
  caseStudies: CaseStudyItem[];
}

export const RecruiterView: React.FC<RecruiterViewProps> = ({ caseStudies }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Full-Stack', '3D / Graphics', 'AI / Systems'];

  const filteredStudies = caseStudies.filter((study) => {
    const matchesCategory =
      selectedCategory === 'All' || study.data.category === selectedCategory;
    const matchesSearch =
      study.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.data.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.data.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8 md:py-14 animate-fadeIn">
      {/* Top Banner Notice */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-cyber-border/70">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyber-green animate-pulse" />
          <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded bg-cyber-green/10 text-cyber-green border border-cyber-green/30">
            RECRUITER 2D FAST-LANE
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Zero WebGL overhead &bull; Ultra-fast load time
          </span>
        </div>
        <div className="text-xs font-mono text-slate-400">
          STATUS: <span className="text-cyber-accent">OPEN TO OPPORTUNITIES</span>
        </div>
      </div>

      {/* Hero Bio Card */}
      <div className="mb-12 border border-cyber-border bg-cyber-card/80 backdrop-blur-md rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-neon/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyber-accent/30 text-cyber-accent text-xs font-mono mb-4">
              <span>🚀</span>
              <span>Available for Senior / Staff Frontend & Systems Roles</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
              Md. Abu Zihad
            </h1>
            <p className="text-cyber-accent font-mono text-sm md:text-base font-semibold mb-4">
              Full-Stack & 3D Interactive Systems Architect
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              Specialized in high-performance web applications, WebGL/Three.js 3D spatial interfaces,
              and resilient distributed backends. Built for mission-critical speed, cinematic aesthetics, and clean codebases.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:contact@abuzihad.dev"
                className="px-5 py-2.5 rounded-lg bg-cyber-accent text-slate-950 font-bold text-xs md:text-sm hover:opacity-90 transition-all shadow-neon-cyan"
              >
                Hire / Contact Directly
              </a>
              <a
                href="https://github.com/AZtheE1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-cyber-accent/60 bg-slate-900/60 text-slate-200 font-medium text-xs md:text-sm transition-all"
              >
                GitHub Profile &rarr;
              </a>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="w-full md:w-auto grid grid-cols-2 gap-3 min-w-[240px]">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-2xl font-black text-cyber-accent font-mono">100%</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Lighthouse Perf</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-2xl font-black text-cyber-green font-mono">&lt; 30s</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Recruiter Audit</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-2xl font-black text-cyber-neon font-mono">60 FPS</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">WebGL Engine</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-2xl font-black text-cyber-yellow font-mono">0ms</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Static Lag</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyber-accent text-slate-950 border-cyber-accent font-bold shadow-neon-cyan'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-accent/60 font-mono"
          />
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudies.map((study) => (
          <article
            key={study.slug}
            className="group rounded-xl border border-cyber-border bg-cyber-card/90 p-6 flex flex-col justify-between hover:border-cyber-accent/60 hover:shadow-neon-cyan transition-all duration-300 relative overflow-hidden"
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{
                background: `linear-gradient(90deg, ${study.data.hologramColor || '#00f0ff'}, transparent)`,
              }}
            />

            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-cyber-accent font-semibold">{study.data.category}</span>
                <span className="text-slate-400">{study.data.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyber-accent transition-colors mb-2">
                {study.data.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {study.data.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {study.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
                {study.data.liveUrl && (
                  <a
                    href={study.data.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-accent hover:underline flex items-center gap-1 font-bold"
                  >
                    Live Demo &rarr;
                  </a>
                )}
                {study.data.githubUrl && (
                  <a
                    href={study.data.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-200"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
          <p className="text-slate-400 font-mono text-sm">
            No case studies found matching "{searchQuery}" in category "{selectedCategory}".
          </p>
        </div>
      )}
    </section>
  );
};
