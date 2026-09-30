import React, { useState } from 'react';
import { 
  GitBranch, 
  Cpu, 
  Mail, 
  FileSearch, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check 
} from 'lucide-react';

interface WorkflowArchitectureProps {
  onOpenDirectModal: () => void;
}

const N8N_URL = 'https://geethasreemanchala.app.n8n.cloud/form/b94d695b-73dc-47af-88c4-f958dc1b359f';

export const WorkflowArchitecture: React.FC<WorkflowArchitectureProps> = ({ onOpenDirectModal }) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(N8N_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pipeline" className="py-16 lg:py-24 border-b border-slate-800/80 bg-[#090d15]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <span>n8n Pipeline Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Workflow Engine</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Automated Pipeline Mechanics
            </h2>
            <p className="text-slate-300 mt-2 text-base max-w-2xl">
              Inspect how applicant resumes flow from frontend ingestion through binary parsing, LLM assessment, and automated delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied URL' : 'Copy Form URL'}</span>
            </button>

            <button
              onClick={onOpenDirectModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap active:scale-[0.98]"
            >
              <span>Test n8n Cloud Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Pipeline Steps Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0d131f] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <GitBranch className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                01. Ingestion
              </div>
              <h3 className="font-display text-base font-bold text-white mt-1">
                Form Trigger Node
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Captures candidate name, email, and raw binary attachments through the n8n form webhook endpoint.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Path: /form/:id</span>
              <span className="text-emerald-400">Active</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0d131f] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-4">
                <FileSearch className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                02. Parsing
              </div>
              <h3 className="font-display text-base font-bold text-white mt-1">
                Binary Extraction
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Decodes multi-page PDF & DOCX streams into tokenized plain text, stripping non-standard formatting.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Format: PDF / DOCX</span>
              <span className="text-sky-400">Lossless</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0d131f] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                03. Intelligence
              </div>
              <h3 className="font-display text-base font-bold text-white mt-1">
                LLM Evaluation
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Scores ATS compliance, identifies missing keywords, evaluates leadership verbs, and formulates recommendations.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Model: Reasoning LLM</span>
              <span className="text-purple-400">Contextual</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0d131f] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                04. Delivery
              </div>
              <h3 className="font-display text-base font-bold text-white mt-1">
                Automated Dispatch
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Assembles the audit scorecard and automatically delivers the personalized breakdown straight to candidate's email.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Node: Email / SMTP</span>
              <span className="text-emerald-400">Direct</span>
            </div>
          </div>

        </div>

        {/* Technical Endpoint Specs with Image */}
        <div id="architecture" className="rounded-2xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Target n8n Webhook Endpoint
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The live instance hosted on n8n Cloud is equipped to process structured form multipart posts with file streams.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-amber-400 break-all select-all">
                {N8N_URL}
              </div>
              <div className="text-slate-500 text-[11px] flex flex-wrap gap-4 pt-1">
                <span>Method: POST</span>
                <span>Type: multipart/form-data</span>
                <span>Encoding: UTF-8</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Payload Validation Active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>High-Speed Cloud Execution</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              {!imageError ? (
                <img
                  src="/src/assets/images/workflow_automation_nodes_1790759796556.jpg"
                  alt="Minimalist connected automation workflow nodes"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full aspect-[4/3] object-cover"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                  <GitBranch className="w-10 h-10 text-amber-400 mb-2 opacity-80" />
                  <span className="text-xs text-slate-300 font-mono">n8n Execution Graph</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
