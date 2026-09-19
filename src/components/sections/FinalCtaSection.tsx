'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function FinalCtaSection() {
  const handleContactClick = () => {
    window.location.href = 'mailto:engineering@devcore.io?subject=New%20Project%20Inquiry%20//%20Devcore';
  };

  const handleAuditClick = () => {
    window.location.href = 'mailto:architecture@devcore.io?subject=Architectural%20Audit%20Request%20//%20Devcore';
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full py-36 sm:py-48 px-6 sm:px-10 bg-void border-t border-white/[0.04] overflow-hidden"
    >
      {/* Background Volumetric Core Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Concentric Rings (Return to the Hero Core Motif) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-white/[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-accent-primary/20 mb-8 text-xs font-mono tracking-widest uppercase text-accent-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
          <span>Devcore Engineering Pods // Open For Select Partners</span>
        </div>

        {/* Grand Headline */}
        <h2 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tightest text-devcore-text-primary mb-8 leading-[1.05]">
          BUILD WHAT <br />
          <span className="text-accent-primary drop-shadow-[0_0_40px_rgba(0,242,153,0.35)]">
            COMES NEXT.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-devcore-text-secondary max-w-2xl font-light leading-relaxed mb-12">
          Have an ambitious idea, high-throughput platform, or intelligent autonomous system that needs to exist? Partner with Devcore to bring it to life.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto shadow-accent-glow"
            onClick={handleContactClick}
          >
            Start a Project
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={handleAuditClick}
          >
            Schedule Architectural Audit
          </Button>
        </div>

        {/* Verification Guarantee */}
        <div className="mt-14 flex items-center gap-6 text-xs font-mono tracking-wider text-devcore-text-muted">
          <span>CLEAN-ROOM IP</span>
          <span>•</span>
          <span>MICROSECOND SLA</span>
          <span>•</span>
          <span>DEDICATED ARCHITECT PODS</span>
        </div>
      </div>
    </section>
  );
}
