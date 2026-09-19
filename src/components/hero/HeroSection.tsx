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

    const ctx = gsap.context(() => {
      // Clean GSAP pin without conflicting CSS sticky
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: stageRef.current,
        pinSpacing: true,
        scrub: 0.6, // Tighter, more responsive scrub
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;

          // Dissolve hero typography cleanly between 0% and 32%
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
    }, containerRef);

    return () => ctx.revert();
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
