import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Layers, 
  TrendingUp, 
  Edit3,
  Award
} from 'lucide-react';
import { analyzeResumeText } from '../utils/atsAnalyzer';

interface PreFlightAuditProps {
  currentResumeText: string;
  onTextUpdate: (text: string) => void;
}

export const PreFlightAudit: React.FC<PreFlightAuditProps> = ({
  currentResumeText,
  onTextUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const analysis = useMemo(() => {
    return analyzeResumeText(currentResumeText);
  }, [currentResumeText]);

  return (
    <section id="preflight" className="py-16 lg:py-24 border-b border-slate-800/80 bg-[#0b0f17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <span>Instant Diagnostic</span>
              <span aria-hidden="true">·</span>
              <span>Pre-Flight ATS Simulator</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Instant Pre-Flight Resume Audit
            </h2>
            <p className="text-slate-300 mt-2 text-base max-w-2xl">
              Inspect your document's ATS parseability and content density in real time before or alongside full n8n cloud evaluation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg hover:border-slate-600 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEditing ? 'View Audit Breakdown' : 'Edit / Paste Custom Text'}</span>
          </button>
        </div>

        {/* Live Text Editor View */}
        {isEditing ? (
          <div className="mb-12 p-6 rounded-2xl border border-slate-800 bg-[#0d131f] space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-white">Live Resume Text Buffer:</span>
              <span className="font-mono tabular-nums">{analysis.wordCount} words detected</span>
            </div>
            <textarea
              rows={12}
              value={currentResumeText}
              onChange={(e) => onTextUpdate(e.target.value)}
              placeholder="Paste raw resume text here to immediately analyze ATS parser compatibility..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 resize-y"
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Changes automatically recalculate the diagnostic scores below.</span>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Done Editing
              </button>
            </div>
          </div>
        ) : null}

        {/* Scorecard Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Score & Benchmark Anchor (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Pre-Flight Score
                </span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-mono text-5xl sm:text-6xl font-extrabold text-white tabular-nums">
                  {analysis.overallScore}
                </span>
                <span className="font-mono text-slate-500 text-xl font-medium">/100</span>
              </div>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {analysis.overallScore >= 80 
                  ? 'Strong candidate document. High probability of passing enterprise ATS filters.'
                  : 'Moderate candidate document. Follow recommendations to enhance recruiter visibility.'}
              </p>

              {/* Document Image Showcase */}
              <div className="mt-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                {!imageError ? (
                  <img
                    src="/src/assets/images/resume_curated_document_1790759779960.jpg"
                    alt="Curated typography resume on archival paper"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                    <FileCheck className="w-8 h-8 text-amber-400 mb-2 opacity-80" />
                    <span className="text-xs text-slate-400">ATS Parsing Verification</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex justify-between items-center text-xs text-slate-400">
              <span>Evaluated Elements:</span>
              <span className="font-mono text-white tabular-nums">{analysis.wordCount} words · 5 core checks</span>
            </div>
          </div>

          {/* Sub-Metric Breakdown (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h3 className="font-display text-base font-bold text-white">
                  Dimension Scoring
                </h3>
              </div>

              {/* Metric 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">ATS Parser Readability</span>
                  <span className="font-mono font-semibold text-white tabular-nums">{analysis.atsCompatibility}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.atsCompatibility}%` }}
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Action Verb Density</span>
                  <span className="font-mono font-semibold text-white tabular-nums">{analysis.actionVerbStrength}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.actionVerbStrength}%` }}
                  />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Quantified Business Impact</span>
                  <span className="font-mono font-semibold text-white tabular-nums">{analysis.quantifiedImpact}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.quantifiedImpact}%` }}
                  />
                </div>
              </div>

              {/* Metric 4 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Section Structural Completeness</span>
                  <span className="font-mono font-semibold text-white tabular-nums">{analysis.structureScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.structureScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Detected Keywords Tag Cloud */}
            <div className="pt-6 border-t border-slate-800/80 mt-6">
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                Detected Technical Keywords:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.detectedKeywords.length > 0 ? (
                  analysis.detectedKeywords.map(kw => (
                    <span 
                      key={kw} 
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No common tech keywords matched</span>
                )}
              </div>
            </div>
          </div>

          {/* Section Checklist & Recommendations (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Core Section Checklist */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <h3 className="font-display text-base font-bold text-white">
                    Section Checklist
                  </h3>
                </div>

                <div className="space-y-2">
                  {analysis.detectedSections.map(sec => (
                    <div 
                      key={sec.name}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800/60"
                    >
                      <span className="text-slate-300">{sec.name}</span>
                      {sec.found ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Detected</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-400/80 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Missing</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Targeted Guidance */}
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-2">
                  Actionable Recommendations:
                </span>
                <ul className="space-y-2">
                  {analysis.recommendations.slice(0, 2).map((rec, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">·</span>
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 text-xs text-slate-400">
              Tip: The n8n cloud pipeline applies deep contextual LLM analysis on your full text.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
