'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ChevronDown } from 'lucide-react';

interface HeroOverlayProps {
  onExploreClick?: () => void;
  onContactClick?: () => void;
}

export function HeroOverlay({ onExploreClick, onContactClick }: HeroOverlayProps) {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 max-w-7xl mx-auto pointer-events-none">
      {/* Intentional System Telemetry Header (No Arbitrary Coordinates) */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-devcore-text-muted uppercase border-b border-white/[0.04] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
          <span className="text-devcore-text-secondary font-medium tracking-widest">
            DEVCORE // CORE-01
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-devcore-text-muted">
            NODE 01 // SYSTEM ONLINE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-devcore-text-muted tracking-widest">
            ENVIRONMENT // DIGITAL HORIZON
          </span>
        </div>
      </div>

      {/* Main Hero Typography & CTAs */}
      <div className="my-auto py-12 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Micro Architectural Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-white/[0.06] mb-8 text-[11px] font-mono tracking-widest uppercase text-devcore-text-secondary">
          <span className="w-1 h-1 rounded-full bg-accent-primary" />
          <span>Advanced Digital Engineering</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[88px] leading-[1.02] tracking-tightest text-devcore-text-primary mb-8 select-none">
          WE BUILD <br />
          <span className="text-devcore-text-primary">DIGITAL SYSTEMS</span> <br />
          <span className="text-accent-primary drop-shadow-[0_0_40px_rgba(0,242,153,0.3)]">
            THAT SCALE.
          </span>
        </h1>

        {/* Restrained Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-devcore-text-secondary max-w-2xl font-light leading-relaxed mb-10">
          Devcore designs and engineers high-performance digital products, platforms, and intelligent systems for ambitious teams.
        </p>

        {/* Minimal CTAs */}
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
            Explore Systems
          </Button>
        </div>
      </div>

      {/* Bottom Status & Scroll Prompt */}
      <div className="flex items-end justify-between text-[11px] font-mono tracking-widest text-devcore-text-muted uppercase border-t border-white/[0.04] pt-4">
        <div className="flex items-center gap-2">
          <span className="text-accent-primary">01 //</span>
          <span className="text-devcore-text-secondary">THE DIGITAL HORIZON</span>
        </div>

        {/* Subtle Scroll Indicator */}
        <div
          onClick={onExploreClick}
          className="flex flex-col items-center gap-1.5 pointer-events-auto cursor-pointer group opacity-80 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] tracking-widest text-devcore-text-muted group-hover:text-devcore-text-secondary transition-colors">
            SCROLL TO ENTER
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-accent-primary/80 group-hover:translate-y-0.5 transition-transform" />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-devcore-text-muted">STAGE 01 &rarr; 02</span>
        </div>
      </div>
    </div>
  );
}
