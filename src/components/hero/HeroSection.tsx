'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HeroCanvas } from './HeroCanvas';
import { HeroOverlay } from './HeroOverlay';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const overlayWrapperRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      scrollProgressRef.current = 0.45;
      return;
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=160%',
        pin: stickyRef.current,
        scrub: 0.9,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;

          // Dissolve hero typography cleanly between 0% and 35% of the scroll journey
          if (overlayWrapperRef.current) {
            const textOpacity = Math.max(0, 1 - self.progress * 3.0);
            const textTranslateY = -self.progress * 100;
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
    const contactSection = document.getElementById('section-intro');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[260vh] bg-void">
      {/* Sticky Fullscreen 3D Stage */}
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Living 3D WebGL Ecosystem */}
        <HeroCanvas scrollProgress={scrollProgressRef} />

        {/* Cinematic Bottom Vignette Blend (Eliminating Hard Cuts) */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-void via-void/60 to-transparent pointer-events-none z-10" />

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
