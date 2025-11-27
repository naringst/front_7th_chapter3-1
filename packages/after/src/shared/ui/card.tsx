import * as React from 'react';

import { cn } from '@/shared/lib/utils';

// New Card component (Tailwind-based, composable)
function CardBase({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

// Legacy Card component with title, subtitle, variant, headerActions props
interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  headerActions?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  headerActions,
  className,
}) => {
  const variantStyles = {
    default: cn(
      'bg-[var(--color-semantic-background-normal-normal)] border-[var(--color-semantic-line-solid-normal)]',
      'shadow-[var(--style-semantic-shadow-normal)]',
    ),
    bordered: 'border-[var(--color-semantic-line-solid-normal)]',
    elevated: cn(
      'bg-[var(--color-semantic-background-elevated-normal)] border-[var(--color-semantic-line-normal-normal)]',
      'shadow-[var(--style-semantic-shadow-emphasize)]',
    ),
    flat: 'bg-[var(--color-semantic-background-normal-alternative)] border-[var(--color-semantic-line-normal-alternative)]',
  };

  return (
    <div
      className={cn(
        'rounded-lg border overflow-hidden',
        variantStyles[variant],
        className,
      )}
    >
      {(title || subtitle || headerActions) && (
        <div className="px-5 py-4 border-b border-[var(--color-semantic-line-solid-normal)] bg-[var(--color-semantic-background-normal-alternative)] flex justify-between items-center">
          <div>
            {title && (
              <h3 className="text-lg font-medium text-[var(--color-semantic-label-normal)] leading-tight m-0">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-[var(--color-semantic-label-assistive)] leading-relaxed mt-1 mb-0">
                {subtitle}
              </p>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
};

export {
  CardBase,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
