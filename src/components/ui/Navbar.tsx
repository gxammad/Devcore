'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { Menu, X } from 'lucide-react';

import Image from 'next/image';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-void/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo System */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Devcore"
              width={32}
              height={32}
              className="object-contain drop-shadow-[0_0_12px_rgba(0,242,153,0.35)]"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg tracking-tight text-devcore-text-primary">
              DEVCORE
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent-primary flex items-center gap-1.5 -mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              SYSTEM ACTIVE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-devcore-text-secondary">
          <Link
            href="#capabilities"
            className="hover:text-devcore-text-primary transition-colors tracking-wide"
          >
            Capabilities
          </Link>
          <Link
            href="#process"
            className="hover:text-devcore-text-primary transition-colors tracking-wide"
          >
            Process
          </Link>
          <Link
            href="#work"
            className="hover:text-devcore-text-primary transition-colors tracking-wide"
          >
            Selected Work
          </Link>
          <Link
            href="#architecture"
            className="hover:text-devcore-text-primary transition-colors tracking-wide"
          >
            Architecture
          </Link>
        </nav>

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start a Project
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-devcore-text-secondary hover:text-devcore-text-primary transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-6 bg-surface/95 backdrop-blur-2xl border-b border-white/[0.08] flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-devcore-text-secondary hover:text-accent-primary py-2"
          >
            Capabilities
          </Link>
          <Link
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-devcore-text-secondary hover:text-accent-primary py-2"
          >
            Process
          </Link>
          <Link
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-devcore-text-secondary hover:text-accent-primary py-2"
          >
            Selected Work
          </Link>
          <Link
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-devcore-text-secondary hover:text-accent-primary py-2"
          >
            Architecture
          </Link>
          <div className="pt-2">
            <Button
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start a Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
