'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Hammer, Rocket } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PROCESS_STEPS = [
  {
    step: '01',
    phase: 'THINK',
    title: 'Architectural Modeling & Chaos Resolution',
    subtitle: 'From ambiguous ideas to deterministic system blueprints.',
    description:
      'We deconstruct complex business requirements into formal state machines, data flow schemas, latency budgets, and failure-mode mitigations before writing a single line of production code.',
    metrics: 'P99 LATENCY BUDGETING // FORMAL SPEC',
    icon: Compass,
  },
  {
    step: '02',
    phase: 'BUILD',
    title: 'Autonomous Engineering Pod Execution',
    subtitle: 'High-precision engineering without bureaucracy.',
    description:
      'Specialized engineering pods execute in 2-week continuous delivery cycles with automated integration test suites, memory-safety verification, and clean-room IP standards.',
    metrics: 'ZERO-DEBT REFACTORING // 100% TEST COVERAGE',
    icon: Hammer,
  },
  {
    step: '03',
    phase: 'SCALE',
    title: 'Distributed Deployment & Global Resilience',
    subtitle: 'Infrastructure engineered to withstand extreme volatility.',
    description:
      'Global multi-region Kubernetes clusters, edge-distributed CDN routing, real-time observability telemetry, and zero-downtime rolling database migrations.',
    metrics: 'MULTI-REGION REPLICATION // 99.999% AVAILABILITY',
    icon: Rocket,
  },
];

export function ProcessSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative z-20 w-full py-36 sm:py-48 px-6 sm:px-10 bg-void border-none outline-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="reveal-init flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent-primary mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
            <span>04 // HOW WE BUILD — THE TRANSFORMATION</span>
          </div>
          <h2 className="reveal-init delay-100 font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-devcore-text-primary mb-6">
            Chaos to Structure. <br />
            Structure to Scalable Product.
          </h2>
          <p className="reveal-init delay-150 text-devcore-text-secondary text-base sm:text-lg font-light leading-relaxed">
            Great software is not improvised. It is systematically evolved through rigorous engineering discipline, modular architecture, and continuous verification.
          </p>
        </div>

        {/* Process Transformation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Evolutionary Visual Monolith (5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="reveal-scale delay-200 relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-surface">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/devcore_process_growth.jpg"
                  alt="Devcore Process Structural Growth"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/10 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>

              {/* Inset Architectural Telemetry Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel text-[11px] font-mono tracking-wider text-devcore-text-secondary flex items-center justify-between">
                <span>SYSTEM EVOLUTION // ACTIVE</span>
                <span className="text-accent-primary">PHASE 01 &rarr; 03</span>
              </div>
            </div>
          </div>

          {/* Right Column: The 3 Continuous Steps with Vertical Spine (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8 relative pl-4 sm:pl-8">
            {/* Background Spine Track */}
            <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-white/[0.06]" />
            {/* Luminous Animated Spine (GPU composited transform) */}
            <div className="reveal-init delay-200 absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-primary/30 shadow-[0_0_12px_rgba(0,242,153,0.8)]" />

            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const delayClass = idx === 0 ? 'delay-150' : idx === 1 ? 'delay-250' : 'delay-350';

              return (
                <div
                  key={step.step}
                  className={`reveal-init ${delayClass} relative pl-6 sm:pl-8 group transition-all duration-300`}
                >
                  {/* Spine Node Marker */}
                  <div className="absolute -left-[5px] top-1.5 w-3 h-3 rounded-full bg-void border-2 border-accent-primary group-hover:scale-125 transition-transform shadow-accent-glow" />

                  {/* Step Card */}
                  <div className="p-6 sm:p-8 rounded-xl bg-surface/50 border border-white/[0.04] group-hover:border-accent-primary/30 group-hover:bg-surface/80 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                          STAGE {step.step} // {step.phase}
                        </span>
                        <Icon className="w-4 h-4 text-devcore-text-muted group-hover:text-accent-primary transition-colors" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-devcore-text-muted">
                        {step.metrics}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-devcore-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-devcore-text-secondary text-sm sm:text-base leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
