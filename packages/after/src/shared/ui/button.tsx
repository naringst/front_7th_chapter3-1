import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-semantic-primary-normal)] text-[var(--color-semantic-static-white)] hover:bg-[var(--color-semantic-primary-strong)] focus-visible:ring-[var(--color-semantic-primary-normal)]/50',
        primary:
          'bg-[var(--color-semantic-primary-normal)] text-[var(--color-semantic-static-white)] hover:bg-[var(--color-semantic-primary-strong)] focus-visible:ring-[var(--color-semantic-primary-normal)]/50',
        destructive:
          'bg-[var(--color-semantic-status-negative)] text-[var(--color-semantic-static-white)] hover:bg-[var(--color-atomic-red-40)] focus-visible:ring-[var(--color-semantic-status-negative)]/50',
        outline:
          'border border-[var(--color-semantic-line-solid-normal)] bg-[var(--color-semantic-background-normal-normal)] text-[var(--color-semantic-label-normal)] hover:bg-[var(--color-component-fill-normal)] hover:text-[var(--color-semantic-label-strong)] focus-visible:ring-[var(--color-semantic-primary-normal)]/50',
        secondary:
          'bg-[var(--color-semantic-background-normal-alternative)] text-[var(--color-semantic-label-normal)] border border-[var(--color-semantic-line-solid-normal)] hover:bg-[var(--color-component-fill-strong)]',
        ghost:
          'text-[var(--color-semantic-label-normal)] hover:bg-[var(--color-component-fill-normal)] hover:text-[var(--color-semantic-label-strong)]',
        link: 'text-[var(--color-semantic-primary-normal)] underline-offset-4 hover:underline',
        success:
          'bg-[var(--color-semantic-status-positive)] text-[var(--color-semantic-static-white)] hover:bg-[var(--color-atomic-green-40)] focus-visible:ring-[var(--color-semantic-status-positive)]/50',
        danger:
          'bg-[var(--color-semantic-status-negative)] text-[var(--color-semantic-static-white)] hover:bg-[var(--color-atomic-red-40)] focus-visible:ring-[var(--color-semantic-status-negative)]/50',
        warning:
          'bg-[var(--color-semantic-status-cautionary)] text-[var(--color-semantic-static-white)] hover:bg-[var(--color-atomic-orange-40)] focus-visible:ring-[var(--color-semantic-status-cautionary)]/50',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        md: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
