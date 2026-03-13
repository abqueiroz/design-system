import { ComponentProps, forwardRef } from 'react'
import { cn } from '../../../lib/utils'

interface ProgressBarProps extends Omit<ComponentProps<'div'>, 'children'> {
  value: number | null
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  label?: string
  trackClassName?: string
  indicatorClassName?: string
}

const sizeClasses: Record<NonNullable<ProgressBarProps['size']>, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      showValue = false,
      label,
      className,
      trackClassName,
      indicatorClassName,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === null
    const safeMax = max > 0 ? max : 100
    const safeValue = !isIndeterminate
      ? Math.min(Math.max(value, 0), safeMax)
      : 0
    const percent = isIndeterminate ? 100 : (safeValue / safeMax) * 100

    return (
      <div className={cn('w-full space-y-1.5', className)} ref={ref} {...props}>
        {/* Header: Label e Status */}
        {(label || showValue) && (
          <div className='flex justify-between items-end px-0.5'>
            {label && (
              <span className='text-xs font-bold text-primary-bold uppercase tracking-wider'>
                {label}
              </span>
            )}
            {showValue && (
              <span
                className={cn(
                  'text-xs font-black transition-colors duration-300',
                  isIndeterminate
                    ? 'text-primary-main/50 animate-pulse'
                    : 'text-primary-main'
                )}
              >
                {isIndeterminate ? 'Loading...' : `${Math.round(percent)}%`}
              </span>
            )}
          </div>
        )}

        {/* Track */}
        <div
          role='progressbar'
          aria-busy={isIndeterminate}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-primary-subtle/40 shadow-inner',
            sizeClasses[size],
            trackClassName
          )}
        >
          {/* Indicator */}
          <div
            className={cn(
              'relative h-full rounded-full transition-all duration-500 ease-in-out',
              isIndeterminate
                ? 'bg-primary-main/40 animate-pulse w-full'
                : 'bg-linear-to-r from-primary-main to-primary-bold shadow-(--primary-glow) drop-shadow-(--primary-drop-glow)',
              indicatorClassName
            )}
            style={{ width: isIndeterminate ? '100%' : `${percent}%` }}
          >
            <div
              className={cn(
                'absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full',
                isIndeterminate
                  ? 'animate-[shimmer_1.5s_infinite]'
                  : 'animate-shimmer'
              )}
              style={{ backgroundSize: '200% 100%' }}
            />
          </div>
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'Progressbar'

export { ProgressBar, type ProgressBarProps }
