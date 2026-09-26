import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, GitBranch, Globe, MessageSquare, Lock } from 'lucide-react';
import { playSoundEffect } from '../core/AudioEngine';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const email = 'mdabuzihad.dev@gmail.com';

  const handleCopyEmail = () => {
    playSoundEffect('click');
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSoundEffect('terminal');
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-panel border border-neon-cyan/30 text-neon-cyan text-xs font-mono mb-3">
          <Lock className="w-3.5 h-3.5 text-ocean-teal" />
          <span>ENCRYPTED TRANSMISSION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Initiate <span className="text-neon-cyan text-glow-cyan">Communication</span> Channel
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          Have an architectural inquiry, system project, or engineering lead? Send an encrypted transmission below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Column: Direct Contact & Email Card (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Copy Email Card */}
          <div className="p-6 rounded-3xl bg-lab-panel border border-slate-800 hover:border-neon-cyan/40 transition-all shadow-lab-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-200 uppercase">DIRECT EMAIL</h4>
                <p className="text-[11px] font-mono text-slate-400">Encrypted Communication</p>
              </div>
            </div>

            <p className="font-mono text-xs text-neon-cyan break-all bg-slate-900 p-2.5 rounded-xl border border-slate-800 mb-4">
              {email}
            </p>

            <button
              onClick={handleCopyEmail}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-neon-cyan text-slate-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-ocean-teal" />
                  <span>COPY TRANSMISSION EMAIL</span>
                </>
              )}
            </button>
          </div>

          {/* Social Systems links */}
          <div className="p-6 rounded-3xl bg-lab-panel border border-slate-800 shadow-lab-card">
            <h4 className="font-mono text-xs font-bold text-slate-200 uppercase mb-4">
              SYSTEM REPOSITORIES &amp; NETWORKS
            </h4>
            <div className="space-y-3 font-mono text-xs">
              <a
                href="https://github.com/AZtheE1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-neon-cyan text-slate-300 hover:text-neon-cyan transition-all"
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </div>
                <span className="text-[10px] text-slate-500">@AZtheE1</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-neon-cyan text-slate-300 hover:text-neon-cyan transition-all"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>LinkedIn Network</span>
                </div>
                <span className="text-[10px] text-slate-500">CONNECT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form (3 cols) */}
        <div className="md:col-span-3">
          <div className="p-6 sm:p-8 rounded-3xl bg-lab-panel border border-slate-800 shadow-lab-card relative overflow-hidden">
            {sent ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <CheckCircle2 className="w-16 h-16 text-neon-cyan mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-slate-100">TRANSMISSION RECEIVED</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Your message has been encrypted and queued into system dispatch. Expect response within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-300 uppercase mb-1 font-bold">YOUR NAME / CALLSIGN</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Commander Shepherd"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-neon-cyan text-slate-100 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase mb-1 font-bold">RETURN TRANSMISSION EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. recruit@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-neon-cyan text-slate-100 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase mb-1 font-bold">TRANSMISSION PAYLOAD / MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe system inquiry or project details..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-neon-cyan text-slate-100 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ocean-teal to-ocean-blue hover:from-neon-cyan hover:to-ocean-teal text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-teal/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH ENCRYPTED MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
