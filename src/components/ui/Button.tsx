'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  showArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  showArrow = true,
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const baseStyles =
    'group relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full select-none cursor-pointer overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-accent-primary text-void font-semibold hover:bg-[#1affaa] hover:shadow-accent-glow active:scale-[0.98]',
    secondary:
      'glass-pill text-devcore-text-primary hover:text-accent-primary hover:border-accent-primary/40 active:scale-[0.98]',
    ghost:
      'text-devcore-text-secondary hover:text-devcore-text-primary hover:bg-white/[0.04]',
  }[variant];

  return (
    <button
      ref={btnRef}
      className={twMerge(clsx(baseStyles, sizeStyles, variantStyles, className))}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </button>
  );
}
