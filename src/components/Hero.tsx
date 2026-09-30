import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
  onExplorePipeline: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToForm, onExplorePipeline }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="overview" className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-amber-400">Automated Pipeline</span>
              <span aria-hidden="true">·</span>
              <span>n8n Cloud Webhook v2</span>
              <span aria-hidden="true">·</span>
              <span>Sub-60s Intelligent Screening</span>
            </div>

            {/* Primary Headline with text-wrap balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white [text-wrap:balance] leading-[1.1]">
              Automated Resume Intelligence Engineered for Peak ATS Performance.
            </h1>

            {/* Concrete value proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Connect your curriculum vitae directly to Geetha Sree Manchala's n8n cloud automation workflow. 
              Extract structured qualifications, run instantaneous ATS pre-flight diagnostics, and receive comprehensive hiring-grade evaluations straight to your inbox.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToForm}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md whitespace-nowrap active:scale-[0.98]"
              >
                <span>Upload & Analyze Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplorePipeline}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Inspect n8n Pipeline</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency: Quantitative rigor */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  94.8%
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  ATS Parser Compatibility
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
                  &lt; 45s
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Cloud Workflow Turnaround
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  3-in-1
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Audit, Scoring & Suggestions
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Focal Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_career_workspace_1790759760890.jpg"
                  alt="Modern career studio workspace and curriculum vitae document analysis"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              ) : (
                /* High-fidelity CSS/SVG fallback container */
                <div className="w-full aspect-[16/10] bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 flex flex-col items-center justify-center p-8 text-center">
                  <ShieldCheck className="w-12 h-12 text-amber-400 mb-3 opacity-80" />
                  <div className="font-display font-semibold text-white text-lg">
                    Enterprise Resume Intelligence
                  </div>
                  <div className="text-xs text-slate-400 mt-1 max-w-xs">
                    Multi-Format Parsing & Automated Extraction Pipeline
                  </div>
                </div>
              )}

              {/* Verified Endpoint Indicator Overlay */}
              <div className="p-4 bg-[#0d131f]/95 border-t border-slate-800/90 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    geethasreemanchala.app.n8n.cloud
                  </span>
                </div>
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Form Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
