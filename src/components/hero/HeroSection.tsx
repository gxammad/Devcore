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

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      scrollProgressRef.current = 0.5; // default scenic state
      return;
    }

    const ctx = gsap.context(() => {
      // Pin hero container for 150vh of cinematic scrub
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: stickyRef.current,
        scrub: 0.8,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;

          // Fade out the hero typography as the user begins diving into the 3D world
          if (overlayWrapperRef.current) {
            const textOpacity = Math.max(0, 1 - self.progress * 2.8);
            const textTranslateY = -self.progress * 120;
            overlayWrapperRef.current.style.opacity = textOpacity.toString();
            overlayWrapperRef.current.style.transform = `translate3d(0, ${textTranslateY}px, 0)`;
            overlayWrapperRef.current.style.pointerEvents = textOpacity < 0.1 ? 'none' : 'auto';
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
    <section ref={containerRef} className="relative w-full h-[250vh] bg-void">
      {/* Sticky Fullscreen 3D Stage */}
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Interactive WebGL 3D Landscape */}
        <HeroCanvas scrollProgress={scrollProgressRef} />

        {/* DOM Overlay with Headlines and Controls */}
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
