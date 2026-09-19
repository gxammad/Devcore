'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TechNode {
  name: string;
  category: 'runtime' | 'backend' | 'ai' | 'cloud' | 'lowlevel';
  status: string;
  x: number;
  y: number;
}

const TECH_NODES: TechNode[] = [
  { name: 'Next.js 15', category: 'runtime', status: 'EDGE SSR', x: 20, y: 30 },
  { name: 'TypeScript', category: 'runtime', status: 'STRICT', x: 32, y: 18 },
  { name: 'React 19', category: 'runtime', status: 'CONCURRENT', x: 45, y: 28 },
  { name: 'Three.js / WebGL', category: 'runtime', status: 'SHADERS', x: 28, y: 48 },
  { name: 'Rust', category: 'lowlevel', status: 'MEMORY-SAFE', x: 65, y: 22 },
  { name: 'Go', category: 'backend', status: 'GOROUTINES', x: 78, y: 34 },
  { name: 'Kubernetes', category: 'cloud', status: 'ORCHESTRATION', x: 82, y: 55 },
  { name: 'Docker / OCI', category: 'cloud', status: 'CONTAINERS', x: 70, y: 68 },
  { name: 'PyTorch / CUDA', category: 'ai', status: 'TENSOR PARALLEL', x: 40, y: 72 },
  { name: 'eBPF / Kernel', category: 'lowlevel', status: 'OBSERVABILITY', x: 55, y: 40 },
  { name: 'Kafka / Redpanda', category: 'backend', status: 'EVENT LOG', x: 62, y: 82 },
  { name: 'PostgreSQL / Timescale', category: 'backend', status: 'ACID SHARD', x: 18, y: 75 },
  { name: 'Redis / Dragonfly', category: 'backend', status: 'IN-MEMORY', x: 85, y: 78 },
  { name: 'AWS / Cloudflare', category: 'cloud', status: 'MULTI-REGION', x: 50, y: 88 },
];

export function TechSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient connecting network
    const points = TECH_NODES.map((node) => ({
      x: (node.x / 100) * width,
      y: (node.y / 100) * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      name: node.name,
      category: node.category,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 30 || p.x > width - 30) p.vx *= -1;
        if (p.y < 30 || p.y > height - 30) p.vy *= -1;
      });

      // Draw connecting filaments
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.18;
            ctx.strokeStyle = `rgba(0, 242, 153, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      points.forEach((p) => {
        const isHovered = hoveredNode === p.name;
        ctx.fillStyle = isHovered ? '#00F299' : 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovered ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fill();

        if (isHovered) {
          ctx.strokeStyle = 'rgba(0, 242, 153, 0.4)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [hoveredNode]);

  const filteredNodes = TECH_NODES.filter((n) =>
    selectedFilter === 'all' ? true : n.category === selectedFilter
  );

  return (
    <section
      id="architecture"
      className="relative z-20 w-full py-32 sm:py-44 px-6 sm:px-10 bg-void border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-white/[0.06] gap-6">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent-primary mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              <span>06 // TECHNICAL ECOSYSTEM</span>
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-devcore-text-primary">
              Technology is Infrastructure.
            </h2>
          </div>
          <p className="text-devcore-text-secondary max-w-md text-sm sm:text-base font-light leading-relaxed">
            We don&apos;t dump random logos. We architect interconnected technical stacks chosen strictly for reliability, performance, and long-term maintainability.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {[
            { id: 'all', label: 'All Architecture' },
            { id: 'runtime', label: 'Client & Runtime' },
            { id: 'backend', label: 'Distributed Backend' },
            { id: 'lowlevel', label: 'Low-Level Systems' },
            { id: 'ai', label: 'Applied AI' },
            { id: 'cloud', label: 'Cloud & Mesh' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedFilter === cat.id
                  ? 'bg-accent-primary text-void font-semibold shadow-accent-glow'
                  : 'bg-surface border border-white/[0.06] text-devcore-text-secondary hover:text-devcore-text-primary hover:border-white/[0.12]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Constellation Matrix Canvas & Tags */}
        <div className="relative rounded-2xl bg-surface/50 border border-white/[0.06] p-8 sm:p-12 overflow-hidden min-h-[460px]">
          {/* Background Connecting Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
          />

          {/* Foreground Interactive Node Badges */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredNodes.map((node) => {
              const isHovered = hoveredNode === node.name;

              return (
                <div
                  key={node.name}
                  onMouseEnter={() => setHoveredNode(node.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-default select-none ${
                    isHovered
                      ? 'bg-surface border-accent-primary/60 shadow-accent-glow scale-105'
                      : 'bg-surface/70 border-white/[0.04] hover:border-white/[0.1]'
                  }`}
                >
                  <div className="font-mono text-[9px] uppercase tracking-widest text-accent-primary mb-1">
                    {node.status}
                  </div>
                  <div className="font-display font-medium text-sm sm:text-base text-devcore-text-primary">
                    {node.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* System Telemetry Footer */}
          <div className="relative z-10 pt-10 mt-10 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono tracking-wider text-devcore-text-muted">
            <span>TECH TOPOLOGY // FORCE-CONNECTED MESH</span>
            <span className="text-accent-primary">100% PRODUCTION VERIFIED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
