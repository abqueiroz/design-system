import * as React from 'react'
import { cn } from "../../../lib/utils"

type BaseDividerProps = Omit<
  React.ComponentProps<'div'>,
  '$orientation'
>

export type DividerProps = BaseDividerProps &
  (
    | {
      $orientation?: 'horizontal'
      $position?: 'left' | 'center' | 'right'
    }
    | {
      $orientation: 'vertical'
      $position?: 'top' | 'center' | 'bottom'
    }
  )

/**
 * Divider component to separate content.
 * Built on top of Radix UI Separator for accessibility.
 * Can optionally receive children to render text in the middle of lines,
 * $positioned along the x-axis or y-axis.
 */
const Divider = React.forwardRef<
  React.ComponentRef<'div'>,
  DividerProps
>(
  (
    {
      className,
      $orientation = 'horizontal',
      children,
      $position = 'center',
      ...props
    },
    ref
  ) => {
    let activePosition = $position
    if (
      $orientation === 'vertical' &&
      ['left', 'right'].includes(activePosition as string)
    ) {
      activePosition = 'center' as any
    } else if (
      $orientation === 'horizontal' &&
      ['top', 'bottom'].includes(activePosition as string)
    ) {
      activePosition = 'center' as any
    }

    if (!children) {
      return (
        <div
          ref={ref}
          className={cn(
            'shrink-0 bg-outline-1 transition-all duration-300',
            $orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
            'bg-linear-to-r from-transparent via-outline-1 to-transparent opacity-60',
            className
          )}
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref as any}
        className={cn(
          'flex items-center',
          $orientation === 'horizontal' ? 'w-full flex-row' : 'h-full flex-col',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'shrink-0 bg-outline-1 transition-all duration-300',
            $orientation === 'horizontal' ? 'h-px' : 'w-px',
            'bg-linear-to-r from-transparent via-outline-1 to-transparent opacity-60',
            $orientation === 'horizontal'
              ? activePosition === 'left'
                ? 'w-[10%]'
                : activePosition === 'right'
                  ? 'flex-1'
                  : 'flex-1'
              : activePosition === 'top'
                ? 'h-[10%]'
                : activePosition === 'bottom'
                  ? 'flex-1'
                  : 'flex-1'
          )}
        />
        <span
          className={cn(
            'text-sm font-medium text-text-secondary whitespace-nowrap',
            $orientation === 'horizontal' ? 'px-3' : 'py-3'
          )}
        >
          {children}
        </span>
        <div
          className={cn(
            'shrink-0 bg-outline-1 transition-all duration-300',
            $orientation === 'horizontal' ? 'h-px' : 'w-px',
            'bg-linear-to-r from-transparent via-outline-1 to-transparent opacity-60',
            $orientation === 'horizontal'
              ? activePosition === 'left'
                ? 'flex-1'
                : activePosition === 'right'
                  ? 'w-[10%]'
                  : 'flex-1'
              : activePosition === 'top'
                ? 'flex-1'
                : activePosition === 'bottom'
                  ? 'h-[10%]'
                  : 'flex-1'
          )}
        />
      </div>
    )
  }
)

Divider.displayName = 'Divider'

export { Divider }
