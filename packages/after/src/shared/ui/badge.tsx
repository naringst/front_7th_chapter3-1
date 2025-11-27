import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--color-semantic-primary-normal)] text-[var(--color-semantic-static-white)]',
        primary:
          'border-transparent bg-[var(--color-semantic-primary-normal)] text-[var(--color-semantic-static-white)]',
        secondary:
          'border-transparent bg-[var(--color-atomic-coolNeutral-50)] text-[var(--color-semantic-static-white)]',
        destructive:
          'border-transparent bg-[var(--color-semantic-status-negative)] text-[var(--color-semantic-static-white)]',
        outline:
          'border-[var(--color-semantic-line-solid-normal)] bg-transparent text-[var(--color-semantic-label-normal)]',
        success:
          'border-transparent bg-[var(--color-semantic-status-positive)] text-[var(--color-semantic-static-white)]',
        warning:
          'border-transparent bg-[var(--color-semantic-status-cautionary)] text-[var(--color-semantic-static-white)]',
        danger:
          'border-transparent bg-[var(--color-semantic-status-negative)] text-[var(--color-semantic-static-white)]',
        info: 'border-transparent bg-[var(--color-atomic-lightBlue-50)] text-[var(--color-semantic-static-white)]',
      },
      size: {
        default: 'px-2 py-0.5 text-xs',
        sm: 'px-1 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
        // 기존 Badge의 size prop과 호환 (기존 CSS 패딩 값에 맞춤)
        small: 'px-1 py-0.5 text-xs',
        medium: 'px-2 py-0.5 text-xs',
        large: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pill?: boolean;
  showIcon?: boolean;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}

function Badge({
  className,
  variant,
  size,
  pill = false,
  showIcon = false,
  type,
  ...props
}: BadgeProps) {
  // type prop이 있으면 variant로 변환
  const resolvedVariant = type || variant;

  // 디버깅: 생성되는 클래스 확인
  const badgeClasses = badgeVariants({ variant: resolvedVariant, size });

  return (
    <span
      data-slot="badge"
      className={cn(
        badgeClasses,
        pill ? 'rounded-full' : 'rounded-md',
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
