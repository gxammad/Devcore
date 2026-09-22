'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HeroCanvas } from './HeroCanvas';
import { HeroOverlay } from './HeroOverlay';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const overlayWrapperRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      scrollProgressRef.current = 0.45;
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop: Cinematic pin and scrub
    mm.add('(min-width: 768px)', () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=130%',
        pin: stageRef.current,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;

          // Dissolve hero typography cleanly
          if (overlayWrapperRef.current) {
            const textOpacity = Math.max(0, 1 - self.progress * 3.2);
            const textTranslateY = -self.progress * 80;
            overlayWrapperRef.current.style.opacity = textOpacity.toString();
            overlayWrapperRef.current.style.transform = `translate3d(0, ${textTranslateY}px, 0)`;
            overlayWrapperRef.current.style.pointerEvents = textOpacity < 0.05 ? 'none' : 'auto';
          }
        },
      });

      return () => st.kill();
    });

    // Mobile: NO pinning, NO scrub lock! Fluid touch momentum scrolling
    mm.add('(max-width: 767px)', () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: false,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress * 0.4;
          if (overlayWrapperRef.current) {
            const textOpacity = Math.max(0, 1 - self.progress * 2.2);
            overlayWrapperRef.current.style.opacity = textOpacity.toString();
          }
        },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  const handleExploreClick = () => {
    const nextSection = document.getElementById('section-intro');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-void">
      {/* 3D Stage Pinned Exclusively by GSAP */}
      <div ref={stageRef} className="relative w-full h-screen overflow-hidden">
        {/* Living 3D WebGL Ecosystem */}
        <HeroCanvas scrollProgress={scrollProgressRef} />

        {/* Cinematic Bottom Vignette Blend into Introduction */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void via-void/70 to-transparent pointer-events-none z-10" />

        {/* Hero DOM Overlay */}
        <div ref={overlayWrapperRef} className="absolute inset-0 w-full h-full">
          <HeroOverlay
            onExploreClick={handleExploreClick}
            onContactClick={handleContactClick}
          />
        </div>
      </div>
    </section>
  );
}
