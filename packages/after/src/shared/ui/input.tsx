import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border bg-[var(--color-semantic-background-normal-normal)] px-3 py-1 text-base text-[var(--color-semantic-label-normal)] transition-[color,box-shadow] outline-none',
        'border-[var(--color-semantic-line-solid-normal)]',
        'placeholder:text-[var(--color-semantic-label-assistive)]',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-semantic-label-normal)]',
        'selection:bg-[var(--color-semantic-primary-normal)] selection:text-[var(--color-semantic-static-white)]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-semantic-interaction-disable)]',
        'focus-visible:border-[var(--color-semantic-primary-normal)] focus-visible:ring-[var(--color-semantic-primary-normal)]/50 focus-visible:ring-[3px]',
        'aria-invalid:border-[var(--color-semantic-status-negative)] aria-invalid:ring-[var(--color-semantic-status-negative)]/20',
        'md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
