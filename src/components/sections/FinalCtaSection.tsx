'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Concentric rings slow rotation and scale return to core
      if (ring1Ref.current && ring2Ref.current) {
        gsap.fromTo(
          ring1Ref.current,
          { scale: 0.85, rotation: 0 },
          {
            scale: 1.15,
            rotation: 90,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          ring2Ref.current,
          { scale: 0.8, rotation: 0 },
          {
            scale: 1.1,
            rotation: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1.5,
            },
          }
        );
      }

      // Content emergence
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.93, opacity: 0.2, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 25%',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    window.location.href = 'mailto:engineering@devcore.io?subject=New%20Project%20Inquiry%20//%20Devcore';
  };

  const handleAuditClick = () => {
    window.location.href = 'mailto:architecture@devcore.io?subject=Architectural%20Audit%20Request%20//%20Devcore';
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 w-full py-40 sm:py-52 px-6 sm:px-10 bg-void border-none outline-none overflow-hidden"
    >
      {/* Background Volumetric Core Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Concentric Rings Scrubbing on Scroll (Visual Return to Core) */}
      <div
        ref={ring1Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-white/[0.04] pointer-events-none will-change-transform"
      />
      <div
        ref={ring2Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-white/[0.02] pointer-events-none will-change-transform"
      />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center will-change-transform">
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
