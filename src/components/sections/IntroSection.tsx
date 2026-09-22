'use client';

import React from 'react';
import { Layers, Cpu, Globe } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function IntroSection() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="section-intro"
      ref={containerRef}
      className="relative z-20 w-full py-36 sm:py-48 px-6 sm:px-10 bg-void border-none outline-none overflow-hidden"
    >
      {/* Subtle Background Radial Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Marker */}
        <div className="reveal-init flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent-primary mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
          <span>02 // INTRODUCTION — THE ENTERPRISE SCALE</span>
        </div>

        {/* Large Cinematic Statement */}
        <div className="max-w-4xl mb-20">
          <h2 className="reveal-init delay-100 font-display font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.10] tracking-tight text-devcore-text-primary mb-8">
            Technology should not only work.{' '}
            <span className="text-devcore-text-secondary">
              It should propel your entire enterprise forward.
            </span>
          </h2>
          <p className="reveal-init delay-200 text-lg sm:text-xl text-devcore-text-secondary leading-relaxed font-light max-w-3xl">
            Devcore bridges visionary product strategy with rigorous systems architecture.
            We assemble specialized engineering pods to craft resilient web applications,
            autonomous AI workflows, and distributed cloud backends engineered to scale without compromise.
          </p>
        </div>

        {/* Three Architectural Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-12 border-t border-white/[0.06]">
          <div className="reveal-init delay-250 flex flex-col gap-3 p-6 rounded-xl bg-surface/30 border border-white/[0.04] hover:border-accent-primary/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/[0.08] text-accent-primary mb-2">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-devcore-text-primary">
              Architectural Rigor
            </h3>
            <p className="text-sm text-devcore-text-secondary leading-relaxed font-light">
              Every system is engineered from first principles of fault-tolerance, latency optimization, and clean modular decoupling.
            </p>
          </div>

          <div className="reveal-init delay-300 flex flex-col gap-3 p-6 rounded-xl bg-surface/30 border border-white/[0.04] hover:border-accent-primary/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/[0.08] text-accent-primary mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-devcore-text-primary">
              Applied Intelligence
            </h3>
            <p className="text-sm text-devcore-text-secondary leading-relaxed font-light">
              Integrating autonomous AI workflows and real-time reasoning directly into operational loops, not just surface chat widgets.
            </p>
          </div>

          <div className="reveal-init delay-400 flex flex-col gap-3 p-6 rounded-xl bg-surface/30 border border-white/[0.04] hover:border-accent-primary/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/[0.08] text-accent-primary mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-devcore-text-primary">
              Global Resilience
            </h3>
            <p className="text-sm text-devcore-text-secondary leading-relaxed font-light">
              Edge-distributed backends and multi-region Kubernetes clusters built to handle millions of transactions across global clusters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
