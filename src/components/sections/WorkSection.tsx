'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Cpu, Layers, ShieldCheck } from 'lucide-react';

interface Project {
  id: string;
  code: string;
  name: string;
  tagline: string;
  industry: string;
  services: string[];
  metrics: { label: string; value: string }[];
  image: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    code: 'PROJ-01 // QUANT',
    name: 'AURA Quantitative Trading Core',
    tagline: 'Deterministic sub-800µs order matching engine for high-frequency algorithmic institutional capital.',
    industry: 'FINANCIAL TECHNOLOGY // HFT',
    services: ['Rust Systems Programming', 'Kernel Bypass Networking', 'Deterministic State Engine'],
    metrics: [
      { label: 'THROUGHPUT', value: '4.2M orders/sec' },
      { label: 'P99 LATENCY', value: '< 780 microseconds' },
      { label: 'RELIABILITY', value: '100% Deterministic' },
    ],
    image: '/images/devcore_aura_trading.jpg',
    accent: '#00F299',
  },
  {
    id: '02',
    code: 'PROJ-02 // AUTONOMY',
    name: 'SYNAPSE Spatial Perception Engine',
    tagline: 'Distributed edge neural vision and autonomous agent coordination for warehouse robotic fleets.',
    industry: 'ROBOTICS // SPATIAL AI',
    services: ['Edge Neural Networks', 'Real-time SLAM & LiDAR', 'Autonomous Fleet Dispatch'],
    metrics: [
      { label: 'INFERENCE', value: '12ms sensor fusion' },
      { label: 'FLEET SCALE', value: '10,000+ active units' },
      { label: 'SAFETY SLA', value: '99.999% Zero Collision' },
    ],
    image: '/images/devcore_synapse_robotics.jpg',
    accent: '#00D685',
  },
  {
    id: '03',
    code: 'PROJ-03 // MESH',
    name: 'STRATA Global Cloud Fabric',
    tagline: 'Zero-trust distributed cloud orchestration network powering mission-critical financial workloads globally.',
    industry: 'INFRASTRUCTURE // CLOUD',
    services: ['Distributed Kubernetes Mesh', 'eBPF Observability', 'Multi-Region Replication'],
    metrics: [
      { label: 'DAILY VOLUME', value: '$12B transaction flow' },
      { label: 'DEPLOYMENTS', value: '18 global regions' },
      { label: 'AVAILABILITY', value: '99.9999% uptime' },
    ],
    image: '/images/devcore_strata_cloud.jpg',
    accent: '#88B0D0',
  },
];

export function WorkSection() {
  const [activeProject, setActiveProject] = useState<string>('01');

  return (
    <section
      id="work"
      className="relative z-20 w-full py-32 sm:py-44 px-6 sm:px-10 bg-void border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/[0.06] gap-6">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent-primary mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              <span>05 // SELECTED WORK — CHAPTERS</span>
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-devcore-text-primary">
              Engineered for Impact.
            </h2>
          </div>
          <p className="text-devcore-text-secondary max-w-md text-sm sm:text-base font-light leading-relaxed">
            Every project is treated as an architectural chapter: custom-engineered from bare metal to user interface for extraordinary scale.
          </p>
        </div>

        {/* Project Chapters Showcase */}
        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProject(project.id)}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center group`}
              >
                {/* Visual Imagery Column (7 cols) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] group-hover:border-accent-primary/40 transition-all duration-500 shadow-2xl bg-surface">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Atmospheric Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-75" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-void/40 via-transparent to-accent-primary/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                    </div>

                    {/* Floating Architectural Badge */}
                    <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-mono tracking-wider text-devcore-text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                      <span>{project.code}</span>
                    </div>
                  </div>
                </div>

                {/* Metadata & Technical Impact Column (5 cols) */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-accent-primary mb-2">
                    {project.industry}
                  </div>
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-devcore-text-primary mb-4 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-devcore-text-secondary text-base leading-relaxed font-light mb-8">
                    {project.tagline}
                  </p>

                  {/* Architecture Deliverables */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.services.map((service, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-devcore-text-primary/80"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Quantified Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-devcore-text-muted mb-1">
                          {metric.label}
                        </span>
                        <span className="font-display font-medium text-xs sm:text-sm text-devcore-text-primary">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
