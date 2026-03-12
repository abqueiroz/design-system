import * as React from 'react'

import { cn } from '../../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'py-2 h-10 px-4 border transition-all duration-200 focus-visible:shadow-active-input active:shadow-active-input rounded-radius-100 bg-surface-1 hover:border-outline-3 hover:shadow-md placeholder:text-text-placeholder focus:outline-none disabled:text-action-disabled disabled:cursor-not-allowed transition-all ',
  {
    variants: {
      hasError: {
        true: 'border-error-main focus-visible:border-error-selected focus-visible:shadow-active-input-error active:border-error-selected active:shadow-active-input-error outline-none hover:border-error-hover',
        false: 'border-outline-2 focus:border-primary-main text-text-primary',
      },
      size: {
        default: 'w-40',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'default',
      hasError: false,
    },
  }
)

type TextInputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
  }

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, hasError, type, size, startIcon, endIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex items-center',
          size === 'full' ? 'w-full' : 'w-40',
          className
        )}
      >
        {startIcon && (
          <div className='absolute left-3 flex items-center justify-center text-text-secondary pointer-events-none [&_svg]:size-4'>
            {startIcon}
          </div>
        )}
        <input
          type={type}
          data-slot='input'
          className={cn(
            inputVariants({ hasError, size }),
            'typo-body-2',
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            'w-full' // Input always fills the wrapper's width
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className='absolute right-3 flex items-center justify-center text-text-secondary pointer-events-none [&_svg]:size-4'>
            {endIcon}
          </div>
        )}
      </div>
    )
  }
)
TextInput.displayName = 'TextInput'

export { TextInput }
