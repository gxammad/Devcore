'use client';

import React, { useState } from 'react';
import { LucideIcon, Cpu, Globe, Smartphone, Cloud, Layers, Terminal, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Capability {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  metrics: string;
  icon: LucideIcon;
}

const CAPABILITIES: Capability[] = [
  {
    id: '01',
    title: 'High-Performance Web Platforms',
    category: 'RUNTIME // WEB',
    description:
      'Ultra-fast, optically flawless web applications built with Next.js, modern WebGL, and edge-rendered architectures for mission-critical digital flagships.',
    deliverables: ['Sub-second LCP Performance', 'Real-time WebSockets', 'Modular Design Systems'],
    metrics: '< 400ms Time-to-Interactive',
    icon: Globe,
  },
  {
    id: '02',
    title: 'Distributed Cloud & Backends',
    category: 'INFRASTRUCTURE // CORE',
    description:
      'High-throughput microservices and distributed event streams designed for horizontal elasticity, fault tolerance, and zero-downtime rolling deployments.',
    deliverables: ['gRPC & Event Driven Microservices', 'Kubernetes Orchestration', 'Database Sharding'],
    metrics: '99.999% SLA Uptime',
    icon: Cloud,
  },
  {
    id: '03',
    title: 'Applied AI & Autonomous Systems',
    category: 'INTELLIGENCE // AGENTS',
    description:
      'Production-grade machine learning pipelines, local LLM orchestration, and autonomous agent workflows embedded directly into enterprise operational loops.',
    deliverables: ['Custom Neural Workflows', 'Vector Retrieval Augmented Generation', 'Edge AI Acceleration'],
    metrics: '12ms Sub-second Inference',
    icon: Cpu,
  },
  {
    id: '04',
    title: 'Native & Cross-Platform Mobile',
    category: 'CLIENT // MOBILE',
    description:
      'Fluid, 120 FPS mobile products engineered with native iOS/Android architectures or high-performance React Native with custom C++ turbo modules.',
    deliverables: ['Offline-First Sync Engines', 'Biometric Security', 'Bi-directional Realtime Data'],
    metrics: '120 FPS Smooth Motion',
    icon: Smartphone,
  },
  {
    id: '05',
    title: 'Systems & Runtime Engineering',
    category: 'LOW-LEVEL // SYSTEMS',
    description:
      'Low-level systems programming in Rust and Go for quantitative data processing, real-time networking protocols, and high-frequency execution pipelines.',
    deliverables: ['Memory-Safe Rust Concurrency', 'Zero-Copy Serialization', 'eBPF Network Observability'],
    metrics: '< 800µs Kernel Latency',
    icon: Terminal,
  },
  {
    id: '06',
    title: 'Digital Product Engineering',
    category: 'STRATEGY // PRODUCT',
    description:
      'End-to-end technical product development from foundational system architecture to rapid iterative deployment, scaling ambitious teams from prototype to scale.',
    deliverables: ['Technical Architecture Scoping', 'Security Audits & Penetration', 'Continuous CI/CD Pipelines'],
    metrics: '4-Week Initial Pod Delivery',
    icon: Layers,
  },
];

export function CapabilitiesSection() {
  const [activeId, setActiveId] = useState<string>('01');
  const activeCap = CAPABILITIES.find((c) => c.id === activeId) || CAPABILITIES[0];
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative z-20 w-full py-36 sm:py-44 px-6 sm:px-10 bg-void border-none outline-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.04] gap-6">
          <div className="reveal-init">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent-primary mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              <span>03 // CAPABILITIES & ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-devcore-text-primary">
              From Ideas to Scalable Systems.
            </h2>
          </div>
          <p className="reveal-init delay-150 text-devcore-text-secondary max-w-md text-sm sm:text-base font-light leading-relaxed">
            We don&apos;t build disposable templates. We engineer durable digital infrastructure designed to withstand enterprise load and evolve continuously.
          </p>
        </div>

        {/* Interactive Spatial System Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Capability Nodes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = cap.icon;
              const isActive = cap.id === activeId;
              const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-100' : idx === 2 ? 'delay-150' : idx === 3 ? 'delay-200' : idx === 4 ? 'delay-250' : 'delay-300';

              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveId(cap.id)}
                  onMouseEnter={() => setActiveId(cap.id)}
                  className={`reveal-init ${delayClass} w-full text-left p-4 sm:p-5 rounded-xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-surface border-accent-primary/50 shadow-accent-glow translate-x-1'
                      : 'bg-surface/30 border-white/[0.04] hover:bg-surface/60 hover:border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-accent-primary/15 text-accent-primary'
                          : 'bg-white/[0.03] text-devcore-text-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-widest text-devcore-text-muted uppercase mb-0.5">
                        {cap.category}
                      </div>
                      <div
                        className={`font-display font-medium text-base sm:text-lg transition-colors ${
                          isActive
                            ? 'text-devcore-text-primary'
                            : 'text-devcore-text-secondary'
                        }`}
                      >
                        {cap.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActive ? 'bg-accent-primary scale-125' : 'bg-white/10'
                      }`}
                    />
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive
                          ? 'text-accent-primary translate-x-0.5 -translate-y-0.5'
                          : 'text-devcore-text-muted/40'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Deep-Dive Inspection Panel (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="reveal-scale delay-200 relative rounded-2xl bg-surface/70 border border-white/[0.06] p-8 sm:p-12 backdrop-blur-xl overflow-hidden min-h-[480px] flex flex-col justify-between"
            >
              {/* Subtle background circuit traces */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 rounded-full blur-[90px] pointer-events-none" />

              <div>
                {/* Header telemetry badge */}
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-devcore-text-muted border-b border-white/[0.04] pb-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-ping" />
                    <span className="text-accent-primary">SYSTEM NODE // {activeCap.id}</span>
                  </div>
                  <div className="text-devcore-text-secondary">{activeCap.metrics}</div>
                </div>

                {/* Capability Title & Description */}
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-devcore-text-primary mb-4">
                  {activeCap.title}
                </h3>
                <p className="text-devcore-text-secondary text-base sm:text-lg leading-relaxed font-light mb-10 max-w-xl">
                  {activeCap.description}
                </p>

                {/* Key Deliverables & System Specifications */}
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-devcore-text-muted mb-4">
                    Architectural Deliverables
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeCap.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                        <span className="text-sm text-devcore-text-primary/90 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Architectural Verification Stamp */}
              <div className="pt-8 mt-8 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono tracking-wider text-devcore-text-muted">
                <span>SPEC // DEVCORE PRODUCTION STANDARD</span>
                <span className="text-accent-primary">VERIFIED STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
