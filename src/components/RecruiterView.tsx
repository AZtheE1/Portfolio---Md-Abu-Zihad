import React from 'react';

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
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Recruiter Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-cyber-green/10 text-cyber-green border border-cyber-green/30">
          RECRUITER FAST LANE &bull; 2D FALLBACK
        </span>
        <span className="text-xs text-slate-400 font-mono">
          Zero-Lag Static Markdown Stream
        </span>
      </div>

      {/* Hero Bio */}
      <div className="mb-14 border border-cyber-border bg-cyber-card/60 backdrop-blur-md rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          Md. Abu Zihad <span className="text-cyber-accent">/ Engineer</span>
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed mb-6">
          Full-Stack & Systems Engineer crafting high-velocity digital experiences, 3D WebGL interfaces,
          and robust cloud architectures. Designed for speed, aesthetics, and reliability.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="mailto:contact@abuzihad.dev"
            className="px-5 py-2.5 rounded-lg bg-cyber-accent text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-neon-cyan"
          >
            Direct Contact
          </a>
          <a
            href="https://github.com/AZtheE1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-cyber-accent/60 bg-slate-900/50 text-slate-200 font-medium text-sm transition-all"
          >
            GitHub Portfolio &rarr;
          </a>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-sm bg-cyber-neon inline-block" />
          Featured Case Studies
        </h2>
        <span className="text-xs font-mono text-slate-400">
          {caseStudies.length} ARCHIVES LOADED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study) => (
          <article
            key={study.slug}
            className="group rounded-xl border border-cyber-border bg-cyber-card/80 p-6 flex flex-col justify-between hover:border-cyber-accent/60 hover:shadow-neon-cyan transition-all duration-300"
          >
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
                    className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {tag}
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
    </section>
  );
};
