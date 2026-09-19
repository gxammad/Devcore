'use client';

import React from 'react';
import { ArrowRight, Code2, Layers, Cpu, Globe } from 'lucide-react';

export function IntroSection() {
  return (
    <section
      id="section-intro"
      className="relative z-20 w-full py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-void via-surface to-void border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-primary" />
          <span>02 // INTRODUCTION</span>
        </div>

        {/* Large Statement */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.12] tracking-tight text-devcore-text-primary mb-8">
            Technology should not only work.{' '}
            <span className="text-devcore-text-secondary">
              It should propel your entire enterprise forward.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-devcore-text-secondary leading-relaxed font-light max-w-3xl">
            Devcore bridges visionary product strategy with rigorous systems architecture.
            We assemble specialized engineering pods to craft resilient web applications,
            autonomous AI workflows, and distributed cloud backends engineered to scale without compromise.
          </p>
        </div>

        {/* Architectural Principles (Spacious, No Boring Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/[0.08] text-accent-primary mb-2">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-devcore-text-primary">
              Architectural Rigor
            </h3>
            <p className="text-sm text-devcore-text-secondary leading-relaxed">
              Every system is engineered from the first principles of fault-tolerance, latency optimization, and clean modular decoupling.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/[0.08] text-accent-primary mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-devcore-text-primary">
              Applied Intelligence
            </h3>
            <p className="text-sm text-devcore-text-secondary leading-relaxed">
              Integrating real-time AI agents and automated reasoning directly into core business operations, not just surface chatbots.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/[0.08] text-accent-primary mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-devcore-text-primary">
              Global Scale
            </h3>
            <p className="text-sm text-devcore-text-secondary leading-relaxed">
              Edge-distributed backends and low-latency infrastructure built to handle millions of transactions across distributed global clusters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
