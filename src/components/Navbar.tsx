import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenDirectModal: () => void;
  onScrollToForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDirectModal, onScrollToForm }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a href="#" className="font-display text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors">
          ResumeIntel
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#overview" className="hover:text-white transition-colors">
            Overview
          </a>
          <a href="#submit" className="hover:text-white transition-colors">
            Live Submission
          </a>
          <a href="#pipeline" className="hover:text-white transition-colors">
            Workflow Pipeline
          </a>
          <a href="#preflight" className="hover:text-white transition-colors">
            Pre-Flight Audit
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDirectModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/80 rounded-lg hover:border-slate-600 transition-colors whitespace-nowrap"
          >
            <span>n8n Direct Form</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </button>
          
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
