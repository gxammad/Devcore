'use client';

import React, { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on pointer-fine (desktop mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Direct DOM check without triggering React re-renders
      const target = e.target as HTMLElement | null;
      const shouldHover = Boolean(
        target &&
          (target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[role="button"]'))
      );

      if (shouldHover !== isHovered) {
        isHovered = shouldHover;
        if (isHovered) {
          cursor.classList.add('w-10', 'h-10', 'border-accent-primary/60', 'bg-accent-primary/10', 'shadow-accent-glow');
          cursor.classList.remove('w-7', 'h-7', 'border-white/20');
        } else {
          cursor.classList.remove('w-10', 'h-10', 'border-accent-primary/60', 'bg-accent-primary/10', 'shadow-accent-glow');
          cursor.classList.add('w-7', 'h-7', 'border-white/20');
        }
      }
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      dot.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const updateCursor = () => {
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Precision Trailing Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/20 transition-all duration-150 ease-out opacity-0"
        style={{ willChange: 'transform' }}
      />
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[101] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-primary opacity-0"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
