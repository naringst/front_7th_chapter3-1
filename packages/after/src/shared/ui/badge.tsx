import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-[#757575] text-white hover:bg-[#757575]/80' /* Badge 전용 secondary 색상 */,
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'border-transparent bg-success text-white hover:bg-success/80',
        warning: 'border-transparent bg-warning text-white hover:bg-warning/80',
        danger: 'border-transparent bg-danger text-white hover:bg-danger/80',
        info: 'border-transparent bg-info text-white hover:bg-info/80',
        // 기존 Badge의 type prop과 호환을 위한 별칭
        primary:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
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
