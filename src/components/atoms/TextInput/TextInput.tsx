import * as React from 'react'
import { cn } from '../../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

// ─── Input element variants ───────────────────────────────────────────────────
const inputVariants = cva(
  // Base — layout, radius, transition, typography
  [
    'w-full rounded border tracking-[0.02em] font-normal',
    'transition-colors duration-200',
    'focus:outline-none',
  ],
  {
    variants: {
      // Size controls height + vertical padding + font size
      $size: {
        sm: 'h-[37px] py-2   px-4 text-sm  leading-[1.25]',
        md: 'h-[42px] py-3   px-4 text-sm  leading-[1.25]',
        lg: 'h-[52px] py-[14px] px-4 text-base leading-[1.5]',
      },

      // Semantic state drives border / bg / text colors
      $state: {
        default: [
          // Light
          'border-[#D1D5DB] bg-white text-[#111111] placeholder:text-[#777C86]',
          'focus:border-[#525A64]',
          // Dark
          'dark:border-[#525A64] dark:bg-[#41464F] dark:text-white dark:placeholder:text-[#9CA3AF]',
          'dark:focus:border-[#525A64]',
        ],
        success: [
          // Light
          'border-[#0E9F6E] bg-[#F3FAF7] text-[#046C4E] placeholder:text-[#046C4E]',
          'focus:border-[#0E9F6E]',
          // Dark
          'dark:border-[#0E9F6E] dark:bg-[#41464F] dark:text-[#0E9F6E] dark:placeholder:text-[#0E9F6E]',
          'dark:focus:border-[#0E9F6E]',
        ],
        error: [
          // Light
          'border-[#F05252] bg-[#FDF2F2] text-[#C81E1E] placeholder:text-[#C81E1E]',
          'focus:border-[#F05252]',
          // Dark
          'dark:border-[#F05252] dark:bg-[#41464F] dark:text-[#F05252] dark:placeholder:text-[#F05252]',
          'dark:focus:border-[#F05252]',
        ],
      },
    },

    // Disabled always overrides state colors
    compoundVariants: [
      {
        $state: ['default', 'success', 'error'],
        class: [
          'disabled:bg-[#F9FAFB] disabled:border-[#D1D5DB]',
          'disabled:text-[#9CA3AF] disabled:placeholder:text-[#9CA3AF]',
          'disabled:cursor-not-allowed',
          'dark:disabled:bg-[#41464F] dark:disabled:border-[#525A64]',
          'dark:disabled:text-[#777C86] dark:disabled:placeholder:text-[#777C86]',
        ],
      },
    ],

    defaultVariants: {
      $size: 'md',
      $state: 'default',
    },
  }
)

// ─── Types ────────────────────────────────────────────────────────────────────
type TextInputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  Pick<VariantProps<typeof inputVariants>, '$size'> & {
    /** Show error styling */
    $hasError?: boolean
    /** Show success styling */
    $hasSuccess?: boolean
    /** Stretch wrapper to full container width */
    $fullWidth?: boolean
    /** Icon slot on the left side of the input */
    $startIcon?: React.ReactNode
    /** Icon slot on the right side of the input */
    $endIcon?: React.ReactNode
  }

// ─── Component ────────────────────────────────────────────────────────────────
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      $size = 'md',
      $hasError = false,
      $hasSuccess = false,
      $fullWidth = false,
      $startIcon,
      $endIcon,
      disabled,
      type,
      id,
      ...props
    },
    ref
  ) => {
    const $state = $hasSuccess ? 'success' : $hasError ? 'error' : 'default'
    const $disabled = !!disabled

    return (
      <div className={cn("relative flex items-center", $fullWidth ? 'w-full' : 'max-w-91', className)}>
        {$startIcon && (
          <span className={cn('absolute flex items-center justify-center pointer-events-none [&_svg]:w-4.5 [&_svg]:h-4.5 left-4', {
            'text-[#525A64] dark:text-[#9CA3AF]': $state === 'default' && !$disabled,
            'text-[#046C4E] dark:text-[#0E9F6E]': $state === 'success' && !$disabled,
            'text-[#C81E1E] dark:text-[#F05252]': $state === 'error' && !$disabled,
            'opacity-50 text-[#525A64] dark:text-[#9CA3AF]': $disabled
          })}>
            {$startIcon}
          </span>
        )}

        <input
          id={id}
          type={type}
          data-slot="input"
          disabled={disabled}
          className={cn(
            inputVariants({ $size, $state }),
            $startIcon && 'pl-10',
            $endIcon && 'pr-10',
            'w-full'
          )}
          ref={ref}
          {...props}
        />

        {$endIcon && (
          <span className={cn('absolute flex items-center justify-center pointer-events-none [&_svg]:w-4.5 [&_svg]:h-4.5 right-4', {
            'text-[#525A64] dark:text-[#9CA3AF]': $state === 'default' && !$disabled,
            'text-[#046C4E] dark:text-[#0E9F6E]': $state === 'success' && !$disabled,
            'text-[#C81E1E] dark:text-[#F05252]': $state === 'error' && !$disabled,
            'opacity-50 text-[#525A64] dark:text-[#9CA3AF]': $disabled
          })}>
            {$endIcon}
          </span>
        )}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'

export { TextInput, inputVariants }
export type { TextInputProps }