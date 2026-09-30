import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface DirectN8nModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const N8N_URL = 'https://geethasreemanchala.app.n8n.cloud/form/b94d695b-73dc-47af-88c4-f958dc1b359f';

export const DirectN8nModal: React.FC<DirectN8nModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(N8N_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWindow = () => {
    window.open(N8N_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0d131f] shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
              n8n Cloud Form Reference
            </div>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">
              Direct Workflow Source
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Original n8n Cloud Form URL:
            </label>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 break-all select-all">
              <span className="truncate">{N8N_URL}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-auto shrink-0 p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Form Mapping Specification */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-3">
            <div className="text-xs font-semibold text-white">
              Underlying n8n Form Input Schema:
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-amber-400">field-0</span>
                <span className="text-slate-300">name (Text, required)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-amber-400">field-1</span>
                <span className="text-slate-300">email (Email, required)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-amber-400">field-2</span>
                <span className="text-slate-300">Upload_Resume (File, multiple, required)</span>
              </div>
            </div>
          </div>

          {/* Cloudflare Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Note on direct iframe embedding:</strong> The n8n cloud server sets <code className="font-mono text-amber-300">x-frame-options: SAMEORIGIN</code> to guard against clickjacking. To test the native raw form directly in your browser, launch it in a separate tab below.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Close
          </button>
          
          <button
            type="button"
            onClick={handleOpenWindow}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap active:scale-[0.98]"
          >
            <span>Open Form in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
