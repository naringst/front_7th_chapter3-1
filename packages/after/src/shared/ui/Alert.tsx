import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 flex gap-3 items-start',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-semantic-background-normal-alternative)] border-[var(--color-semantic-line-solid-normal)] text-[var(--color-semantic-label-normal)]',
        info: 'bg-[var(--color-atomic-lightBlue-99)] border-[var(--color-atomic-lightBlue-80)] text-[var(--color-semantic-accent-foreground-lightBlue)]',
        success:
          'bg-[var(--color-atomic-green-99)] border-[var(--color-atomic-green-80)] text-[var(--color-semantic-status-positive)]',
        warning:
          'bg-[var(--color-atomic-orange-99)] border-[var(--color-atomic-orange-80)] text-[var(--color-semantic-status-cautionary)]',
        error:
          'bg-[var(--color-atomic-red-99)] border-[var(--color-atomic-red-80)] text-[var(--color-semantic-status-negative)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
  className,
  ...props
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠️';
      case 'error':
        return '✕';
      default:
        return '•';
    }
  };

  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      {showIcon && (
        <div className="flex-shrink-0 text-base leading-none">{getIcon()}</div>
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold mb-1 text-sm leading-tight">
            {title}
          </div>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-auto text-[var(--color-semantic-label-assistive)] hover:text-[var(--color-semantic-label-normal)] transition-colors text-xl leading-none p-1 -mt-1 -mr-1"
        >
          ×
        </button>
      )}
    </div>
  );
};
