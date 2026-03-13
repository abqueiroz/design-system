import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'
import { TypographyProps, Typography } from '../../atoms'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        error: 'bg-error-main text-white hover:bg-error-hover',
        success: 'bg-success-bold text-white',
        primary: 'bg-primary-main text-white hover:bg-primary-hover',
        warning: 'bg-warning-bold text-white',
        gray: 'bg-neutral-bold text-white',
        'light-gray': 'bg-surface-4 text-neutral-bold',
      },
      size: {
        medium: 'h-6 min-w-6 px-1.5 text-sm',
        small: 'h-[18px] min-w-[18px] px-1 text-[10px]',
      },
      isDot: {
        true: '!p-0',
        false: '',
      },
    },
    compoundVariants: [
      {
        isDot: true,
        className: '!h-[6px] !w-[6px] min-w-0',
      }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      isDot: false,
    },
  }
)

export interface BadgeProps
  extends Omit<TypographyProps, 'children' | 'variant' | 'color'>,
  VariantProps<typeof badgeVariants> {
  isDot?: boolean
  value?: number
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, size, isDot, value, ...props }, ref) => {
    return (
      <Typography
        ref={ref}
        as="span"
        className={cn(badgeVariants({ variant, size, isDot }), className, `${value && value > 9 ? 'px-2' : ''}`)}
        variant="caption"
        {...props}
      >
        {!isDot && value}
      </Typography>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
