import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  X, 
  Check, 
  AlertCircle, 
  Loader2, 
  Send, 
  Sparkles, 
  FileCheck2,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { SAMPLE_CANDIDATES } from '../data/samples';
import { SubmissionResult } from '../types';

interface ResumeSubmitFormProps {
  onPreFlightTextChange: (text: string) => void;
  onOpenDirectModal: () => void;
}

export const ResumeSubmitForm: React.FC<ResumeSubmitFormProps> = ({ 
  onPreFlightTextChange,
  onOpenDirectModal
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full-Stack Engineer');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Submission lifecycle states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(Array.from(e.target.files));
    }
  };

  const handleFilesSelected = (newFiles: File[]) => {
    setError(null);
    setFiles(prev => [...prev, ...newFiles]);

    // Read the first file text if possible for client-side pre-flight preview
    const firstFile = newFiles[0];
    if (firstFile) {
      if (firstFile.type.includes('text') || firstFile.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) onPreFlightTextChange(content);
        };
        reader.readAsText(firstFile);
      } else {
        // For PDF/DOCX where direct client-side parsing is binary, generate a representative summary
        onPreFlightTextChange(
          `Document: ${firstFile.name}\nSize: ${(firstFile.size / 1024).toFixed(1)} KB\nCandidate: ${name || 'Applicant'}\nTarget Position: ${targetRole}\nStatus: Ready for n8n cloud document extraction & ATS scoring.`
        );
      }
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // 1-Click Load Sample Candidate for testing
  const handleLoadSample = (sampleId: string) => {
    const candidate = SAMPLE_CANDIDATES.find(c => c.id === sampleId) || SAMPLE_CANDIDATES[0];
    setName(candidate.name);
    setEmail(candidate.email);
    setTargetRole(candidate.targetRole);
    setNotes(`Testing automated screening workflow via sample profile.`);
    setError(null);
    setResult(null);

    // Create a real File instance from sample text
    const sampleBlob = new Blob([candidate.resumeContent], { type: 'text/plain' });
    const sampleFile = new File([sampleBlob], candidate.resumeFileName, { type: 'text/plain' });
    setFiles([sampleFile]);

    // Send content to pre-flight analyzer immediately
    onPreFlightTextChange(candidate.resumeContent);
  };

  // Submit to Express Proxy -> n8n Cloud Form Webhook
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide candidate full name.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address for delivery.');
      return;
    }

    if (files.length === 0) {
      setError('Please upload at least one resume document (PDF, DOCX, or TXT).');
      return;
    }

    setIsSubmitting(true);
    setSubmitStep('Packaging resume binary and candidate metadata...');

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('targetRole', targetRole);
      if (notes.trim()) formData.append('notes', notes.trim());

      for (const file of files) {
        formData.append('resumes', file, file.name);
      }

      setSubmitStep('Transmitting payload to geethasreemanchala.app.n8n.cloud...');

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      setSubmitStep('Workflow received by n8n. Ingestion complete.');
      setResult({
        success: true,
        message: data.message || 'Your response has been recorded',
        n8nStatus: data.n8nStatus,
        submittedAt: data.submittedAt || new Date().toISOString(),
        details: data.details,
      });
    } catch (err: any) {
      console.error('Submission failed:', err);
      setError(err?.message || 'Failed to submit resume to the n8n automation pipeline. Please check network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFiles([]);
    setName('');
    setEmail('');
    setNotes('');
  };

  return (
    <section id="submit" className="py-16 lg:py-24 border-b border-slate-800/80 bg-[#090d15]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <span>Direct Pipeline Ingestion</span>
            <span aria-hidden="true">·</span>
            <span>n8n Cloud Endpoint</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Submit Resume for Automated Screening
          </h2>
          <p className="text-slate-300 mt-3 text-base leading-relaxed">
            Data submitted here maps directly to <code className="text-amber-300 font-mono text-xs px-1.5 py-0.5 bg-slate-800 rounded">field-0</code> (Name), <code className="text-amber-300 font-mono text-xs px-1.5 py-0.5 bg-slate-800 rounded">field-1</code> (Email), and <code className="text-amber-300 font-mono text-xs px-1.5 py-0.5 bg-slate-800 rounded">field-2</code> (Upload_Resume) on Geetha Sree Manchala's n8n cloud form.
          </p>
        </div>

        {/* Quick Sample Selector Bar */}
        <div className="mb-8 p-4 rounded-xl border border-slate-800 bg-slate-900/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-medium text-white">Need to test immediately?</span>
            <span className="hidden sm:inline text-slate-400">Load a pre-configured sample resume with one click:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleLoadSample('swe-lead')}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap active:scale-[0.98]"
            >
              Geetha (Senior Engineer)
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('pm-tech')}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap active:scale-[0.98]"
            >
              Aravind (Product Lead)
            </button>
          </div>
        </div>

        {/* Success Modal / State */}
        {result ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <FileCheck2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-white">
                Resume Successfully Dispatched
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {result.message}. The n8n automation engine has initiated document parsing and the AI evaluation sequence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Target Candidate:</span>
                <span className="text-white font-sans font-medium">{name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Destination Email:</span>
                <span className="text-amber-400 font-sans">{email}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Webhook Response:</span>
                <span className="text-emerald-400">HTTP {result.n8nStatus || 200} OK</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Dispatch Timestamp:</span>
                <span className="text-slate-300 tabular-nums">{new Date(result.submittedAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Files Transmitted:</span>
                <span className="text-slate-300">{files.map(f => f.name).join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap active:scale-[0.98]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Resume</span>
              </button>

              <button
                type="button"
                onClick={onOpenDirectModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 rounded-lg hover:border-slate-600 transition-colors whitespace-nowrap"
              >
                <span>View n8n Cloud Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Candidate & Job Details */}
            <div className="lg:col-span-6 space-y-5 rounded-2xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8">
              <div className="border-b border-slate-800 pb-4 mb-2">
                <h3 className="font-display text-lg font-bold text-white">
                  01. Candidate & Target Specification
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Required credentials for routing and tailoring the resume analysis.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="form-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name <span className="text-amber-400">*</span>
                  <span className="text-[11px] text-slate-500 font-mono ml-2">(field-0)</span>
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Geetha Sree Manchala"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="form-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address <span className="text-amber-400">*</span>
                  <span className="text-[11px] text-slate-500 font-mono ml-2">(field-1)</span>
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. geethasreemanchala@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  The automated analysis and scorecard report will be directed here.
                </p>
              </div>

              {/* Target Job Title */}
              <div>
                <label htmlFor="form-role" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Target Role / Career Focus
                </label>
                <input
                  id="form-role"
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Automation Engineer / Product Manager"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Optional Context Notes */}
              <div>
                <label htmlFor="form-notes" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Additional Context or Key Skills (Optional)
                </label>
                <textarea
                  id="form-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste specific job requirements, preferred industries, or notes for the analysis model..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Right Column: Document Upload Zone */}
            <div className="lg:col-span-6 space-y-5 rounded-2xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8">
              <div className="border-b border-slate-800 pb-4 mb-2">
                <h3 className="font-display text-lg font-bold text-white">
                  02. Document Upload & Binary Ingestion
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Mapped to <code className="text-amber-300 font-mono">field-2 (Upload_Resume)</code>. Multi-file upload supported.
                </p>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-amber-400 bg-amber-400/5'
                    : 'border-slate-700/90 hover:border-slate-500 bg-slate-900/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-3 text-amber-400">
                  <UploadCloud className="w-6 h-6" />
                </div>

                <div className="text-sm font-semibold text-white">
                  Click to upload or drag & drop resume files
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Supported formats: PDF, DOCX, TXT (up to 15MB)
                </div>
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Attached Documents ({files.length}):</span>
                    <button
                      type="button"
                      onClick={() => setFiles([])}
                      className="text-slate-400 hover:text-rose-400 text-[11px] transition-colors"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="space-y-2">
                    {files.map((file, idx) => (
                      <div
                        key={`${file.name}-${idx}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate mr-2">
                          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="truncate">
                            <span className="text-white font-medium truncate block">
                              {file.name}
                            </span>
                            <span className="text-slate-400 font-mono text-[11px]">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <div className="leading-relaxed">{error}</div>
                </div>
              )}

              {/* Submit Button & Pipeline Status */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    isSubmitting
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>{submitStep || 'Processing Submission...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit to n8n Automation Engine</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>Secured TLS Transmission</span>
                  <span>Endpoint: n8n.cloud</span>
                </div>
              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  );
};
