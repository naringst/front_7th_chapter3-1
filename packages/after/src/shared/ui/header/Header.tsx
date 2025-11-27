import React from 'react';
import { ThemeToggle } from '../ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b bg-[var(--color-semantic-background-elevated-normal)] shadow-[var(--style-semantic-shadow-normal)] transition-colors"
      style={{
        borderColor: 'var(--color-semantic-line-solid-normal)',
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-semantic-primary-normal)] text-[var(--color-semantic-static-white)] text-xl font-bold">
            L
          </div>
          <div>
            <h1 className="m-0 text-lg font-bold leading-none text-[var(--color-semantic-label-strong)]">
              Hanghae Company
            </h1>
            <p className="m-0 mt-0.5 text-xs leading-none text-[var(--color-semantic-label-assistive)]">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="text-right">
            <div className="text-sm font-semibold text-[var(--color-semantic-label-strong)]">
              Demo User
            </div>
            <div className="text-xs text-[var(--color-semantic-label-assistive)]">
              demo@example.com
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-semantic-primary-normal)]/10 text-[var(--color-semantic-primary-normal)] text-base font-semibold">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
