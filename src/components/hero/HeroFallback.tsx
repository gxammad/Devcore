'use client';

import React from 'react';

export function HeroFallback() {
  return (
    <div className="absolute inset-0 w-full h-full bg-void overflow-hidden pointer-events-none">
      {/* Deep radial ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-accent-primary/10 via-accent-primary/5 to-transparent rounded-full blur-[140px] opacity-40" />

      {/* Abstract geometric wireframe lines (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}
