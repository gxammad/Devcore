'use client';

import React from 'react';
import Image from 'next/image';

const PILLARS = [
  {
    num: '01',
    title: 'Microsecond Precision',
    description:
      'We profile execution down to CPU cache lines and network kernel hops. No wasteful bloat, no unmeasured dependencies.',
    metric: '< 1ms P99 SLA',
  },
  {
    num: '02',
    title: 'Deterministic Delivery',
    description:
      'Direct access to senior systems architects. We work in disciplined, autonomous engineering pods delivering functional releases in weeks.',
    metric: '100% On-Spec',
  },
  {
    num: '03',
    title: 'Elastic Scalability',
    description:
      'Architectures stress-tested for extreme traffic spikes. Systems that operate identically whether handling 100 or 10,000,000 requests.',
    metric: '100x Volatility Proof',
  },
  {
    num: '04',
    title: 'Complete Ownership',
    description:
      'Full source code ownership, clean-room licenses, and pristine architectural documentation. Zero arbitrary vendor lock-in.',
    metric: 'Zero IP Lock-In',
  },
];

export function WhySection() {
  return (
    <section
      id="why"
      className="relative z-20 w-full py-32 sm:py-44 px-6 sm:px-10 bg-void border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent-primary mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
            <span>07 // WHY DEVCORE — ARCHITECTURAL CONFIDENCE</span>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-devcore-text-primary mb-6">
            Engineered for Certainty.
          </h2>
          <p className="text-devcore-text-secondary text-base sm:text-lg font-light leading-relaxed">
            When failure is not an option, ambitious enterprises partner with Devcore. We engineer systems with the precision of high-performance machinery.
          </p>
        </div>

        {/* Monolith Visual & 4 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Monolithic Visual (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-surface group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/devcore_why_monolith.jpg"
                  alt="Devcore Architectural Monolith"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/10 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>

              {/* Monolith Telemetry Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel text-[11px] font-mono tracking-wider text-devcore-text-secondary flex items-center justify-between">
                <span>MONOLITHIC CORE // INTEGRITY</span>
                <span className="text-accent-primary">FAULT-TOLERANT</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars of Precision (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="p-6 sm:p-7 rounded-xl bg-surface/50 border border-white/[0.04] hover:border-accent-primary/30 hover:bg-surface/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-accent-primary">
                      {pillar.num} //
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-devcore-text-muted">
                      {pillar.metric}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-devcore-text-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-devcore-text-secondary text-xs sm:text-sm leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
