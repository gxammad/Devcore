'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ChevronDown, Cpu, ShieldCheck } from 'lucide-react';

interface HeroOverlayProps {
  onExploreClick?: () => void;
  onContactClick?: () => void;
}

export function HeroOverlay({ onExploreClick, onContactClick }: HeroOverlayProps) {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 sm:px-8 max-w-7xl mx-auto pointer-events-none">
      {/* Top Technical Telemetry Strip */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-devcore-text-muted uppercase border-b border-white/[0.05] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-ping" />
          <span className="text-accent-primary font-semibold">N 37° 46.5&apos;, W 122° 24.1&apos;</span>
          <span className="hidden sm:inline text-devcore-text-muted/60">// SPEC-01 ARCHITECTURE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-accent-primary/80" />
            <span>CORE NODE: ACTIVE</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-primary/80" />
            <span>60 FPS COMPILED</span>
          </span>
        </div>
      </div>

      {/* Main Center Typography & CTAs */}
      <div className="my-auto py-12 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Micro Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-6 text-xs font-mono tracking-wider uppercase text-devcore-text-secondary border border-white/[0.08]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
          <span>Next-Generation Digital Engineering</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[1.05] tracking-tightest text-devcore-text-primary mb-6">
          WE BUILD <span className="text-devcore-text-primary">DIGITAL SYSTEMS</span>{' '}
          <span className="text-accent-primary drop-shadow-[0_0_35px_rgba(0,242,153,0.35)]">
            THAT SCALE.
          </span>
        </h1>

        {/* Restrained Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-devcore-text-secondary max-w-2xl font-light leading-relaxed mb-10">
          Devcore designs and engineers high-performance digital products, platforms, and intelligent systems for ambitious teams.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pointer-events-auto">
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto shadow-accent-glow"
            onClick={onContactClick}
          >
            Start a Project
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={onExploreClick}
          >
            Explore Capabilities
          </Button>
        </div>
      </div>

      {/* Bottom Status & Scroll Prompt */}
      <div className="flex items-end justify-between text-[11px] font-mono tracking-widest text-devcore-text-muted uppercase border-t border-white/[0.05] pt-3">
        <div className="flex items-center gap-2">
          <span className="text-accent-primary">01 //</span>
          <span className="text-devcore-text-secondary">THE DIGITAL HORIZON</span>
        </div>

        {/* Center Scroll Prompt */}
        <div className="flex flex-col items-center gap-1.5 pointer-events-auto cursor-pointer animate-bounce">
          <span className="text-[10px] tracking-widest text-devcore-text-muted">SCROLL TO BLOOM</span>
          <ChevronDown className="w-4 h-4 text-accent-primary" />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span>SEC.01 → SEC.02</span>
        </div>
      </div>
    </div>
  );
}
