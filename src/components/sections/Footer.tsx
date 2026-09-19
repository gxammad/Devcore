'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full bg-void border-t border-white/[0.06] pt-16 pb-12 px-6 sm:px-10 text-devcore-text-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={scrollToTop}>
              <Image
                src="/logo.png"
                alt="Devcore"
                width={30}
                height={30}
                className="object-contain drop-shadow-[0_0_10px_rgba(0,242,153,0.35)]"
              />
              <span className="font-display font-semibold text-lg tracking-tight text-devcore-text-primary">
                DEVCORE
              </span>
            </div>
            <p className="text-sm text-devcore-text-secondary max-w-sm leading-relaxed mb-6 font-light">
              High-performance software engineering, autonomous intelligence, and distributed systems architecture for ambitious enterprises.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-accent-primary uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL // GLOBAL EDGE</span>
            </div>
          </div>

          {/* Navigation Columns (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-devcore-text-primary mb-4">
                Architecture
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-devcore-text-secondary">
                <li>
                  <Link href="#capabilities" className="hover:text-devcore-text-primary transition-colors">
                    Web Platforms
                  </Link>
                </li>
                <li>
                  <Link href="#capabilities" className="hover:text-devcore-text-primary transition-colors">
                    Distributed Cloud
                  </Link>
                </li>
                <li>
                  <Link href="#capabilities" className="hover:text-devcore-text-primary transition-colors">
                    Applied AI & Agents
                  </Link>
                </li>
                <li>
                  <Link href="#capabilities" className="hover:text-devcore-text-primary transition-colors">
                    Rust Systems
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-devcore-text-primary mb-4">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-devcore-text-secondary">
                <li>
                  <Link href="#process" className="hover:text-devcore-text-primary transition-colors">
                    Engineering Process
                  </Link>
                </li>
                <li>
                  <Link href="#work" className="hover:text-devcore-text-primary transition-colors">
                    Selected Work
                  </Link>
                </li>
                <li>
                  <Link href="#why" className="hover:text-devcore-text-primary transition-colors">
                    Why Devcore
                  </Link>
                </li>
                <li>
                  <Link href="#architecture" className="hover:text-devcore-text-primary transition-colors">
                    Technical Stack
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-devcore-text-primary mb-4">
                Contact & Pods
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-devcore-text-secondary">
                <li>
                  <a
                    href="mailto:engineering@devcore.io"
                    className="hover:text-accent-primary transition-colors"
                  >
                    engineering@devcore.io
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/gxammad/Devcore"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-devcore-text-primary transition-colors"
                  >
                    GitHub // Devcore
                  </a>
                </li>
                <li>
                  <span className="text-devcore-text-muted text-xs">
                    San Francisco • Zurich • Tokyo
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-devcore-text-muted gap-4">
          <div>&copy; {new Date().getFullYear()} DEVCORE SYSTEMS INC. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>ISO 27001 COMPLIANT</span>
            <span>•</span>
            <span>CLEAN-ROOM IP CERTIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
