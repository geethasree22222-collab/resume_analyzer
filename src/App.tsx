/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeSubmitForm } from './components/ResumeSubmitForm';
import { PreFlightAudit } from './components/PreFlightAudit';
import { WorkflowArchitecture } from './components/WorkflowArchitecture';
import { DirectN8nModal } from './components/DirectN8nModal';
import { Footer } from './components/Footer';
import { SAMPLE_CANDIDATES } from './data/samples';

export default function App() {
  const [currentResumeText, setCurrentResumeText] = useState(
    SAMPLE_CANDIDATES[0].resumeContent
  );
  const [isDirectModalOpen, setIsDirectModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenDirectModal={() => setIsDirectModalOpen(true)}
        onScrollToForm={() => scrollToSection('submit')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToForm={() => scrollToSection('submit')}
          onExplorePipeline={() => scrollToSection('pipeline')}
        />

        {/* Live Submission Portal (Form connected to n8n) */}
        <ResumeSubmitForm
          onPreFlightTextChange={setCurrentResumeText}
          onOpenDirectModal={() => setIsDirectModalOpen(true)}
        />

        {/* Pre-Flight Audit & Heuristic ATS Simulator */}
        <PreFlightAudit
          currentResumeText={currentResumeText}
          onTextUpdate={setCurrentResumeText}
        />

        {/* Workflow Architecture & n8n Endpoint Breakdown */}
        <WorkflowArchitecture
          onOpenDirectModal={() => setIsDirectModalOpen(true)}
        />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenDirectModal={() => setIsDirectModalOpen(true)} />

      {/* Modal for direct n8n Form inspecting */}
      <DirectN8nModal
        isOpen={isDirectModalOpen}
        onClose={() => setIsDirectModalOpen(false)}
      />
    </div>
  );
}
