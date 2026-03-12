import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const typographyVariants = cva('transition-colors', {
  variants: {
    variant: {
      'display-1': 'typo-display-1',
      'display-2': 'typo-display-2',
      'display-3': 'typo-display-3',
      h1: 'typo-h1',
      h2: 'typo-h2',
      h3: 'typo-h3',
      'body-1': 'typo-body-1',
      'body-2': 'typo-body-2',
      caption: 'typo-caption',
      'button-1': 'typo-button-1',
      'button-2': 'typo-button-2',
      link: 'typo-link',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-disabled',
      error: 'text-error-main',
      success: 'text-success-main',
      warning: 'text-warning-main',
      info: 'text-primary-main',
      white: 'text-surface-1',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'body-1',
    color: 'primary',
    align: 'left',
    weight: 'regular',
  },
})

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'align'>,
  VariantProps<typeof typographyVariants> {
  as?: React.ElementType
  asChild?: boolean
  htmlFor?: string
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { className, variant, weight, color, align, as, asChild = false, ...props },
    ref
  ) => {
    const Comp = 'span'

    return (
      <Comp
        ref={ref}
        className={cn(
          typographyVariants({ variant, weight, color, align, className })
        )}
        {...props}
      />
    )
  }
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
