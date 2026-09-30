import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenDirectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDirectModal }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#070a0f] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Overview */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-display text-lg font-bold text-white tracking-tight">
              ResumeIntel
            </span>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Automated career document parsing and ATS compliance screening built on n8n Cloud orchestration.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <span>Pipeline: resume analyzerr</span>
              <span aria-hidden="true">·</span>
              <span>Author: Geetha Sree Manchala</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#submit" className="hover:text-white transition-colors">
                  Submit Resume
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-white transition-colors">
                  Workflow Pipeline
                </a>
              </li>
              <li>
                <a href="#preflight" className="hover:text-white transition-colors">
                  Pre-Flight Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Cloud Integration */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              Cloud Service
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDirectModal}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <span>n8n Cloud Webhook</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              </li>
              <li>
                <a
                  href="https://n8n.io"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>n8n Workflow Automation</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li className="text-slate-500">
                TLS 1.3 Encrypted Transmission
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Resume Analyzer Portal. Configured with n8n Cloud Form.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Assured</span>
            <span aria-hidden="true">·</span>
            <span>Zero Persistent Storage on Gateway</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
