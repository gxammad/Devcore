'use client';

import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  selector?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  selector = '.reveal-init, .reveal-scale',
}: UseScrollRevealOptions = {}) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If reduced motion is requested, immediately reveal all
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const elements = container.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const elements = container.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve immediately: zero ongoing CPU/JS cost while scrolling
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const elements = container.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    // Also observe the container itself if it has the reveal class
    if (container.matches(selector)) {
      observer.observe(container);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, selector]);

  return containerRef;
}
