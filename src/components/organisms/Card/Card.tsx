import * as React from 'react'

import { cn } from '../../../lib/utils'
import type { CardProps } from './'
import { Typography } from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import { Chip } from '@/components/molecules/Chip'
import { ImageIcon, MoreHorizontal } from 'lucide-react'
// import { Popover, PopoverContent, PopoverTrigger } from '../../primitives/popover'
// Note: Popover components are missing in the current structure.

function Card({
  title,
  subhead,
  description,
  image,
  labels,
  menuOptions,
  primaryButtonText,
  onPrimaryButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl overflow-hidden border border-outline-1 bg-surface-1 min-w-75 max-w-85 shadow-elevation-1',
        className
      )}
      {...rest}
    >
      {/* Image / Header Area */}
      <div className="relative h-48 bg-surface-2 flex items-center justify-center">
        {image ? (
          <img src={image} alt={typeof title === 'string' ? title : 'Card Image'} className="w-full h-full object-cover" />
        ) : (
          <div className="size-16 flex items-center justify-center bg-surface-3">
            <ImageIcon className="size-8 text-text-disabled" />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col p-5 gap-5">
        {/* Texts */}
        <div className="flex flex-col gap-1">
          {title && (
            <Typography variant="h3" weight="semibold" color="primary">
              {title}
            </Typography>
          )}
          {subhead && (
            <Typography variant="body-1" color="primary">
              {subhead}
            </Typography>
          )}
          {description && (
            <div className="mt-2">
              <Typography variant="body-2" color="secondary" className="leading-relaxed">
                {description}
              </Typography>
            </div>
          )}
        </div>

        {/* Labels / Chips */}
        {labels && labels.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2">
            {labels.map((label, index) => (
              <Chip
                key={label}
                label={label}
                variant="subtle"
                color="default"
                size="sm"
                className="bg-surface-3 text-text-primary px-3 font-medium"
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {(primaryButtonText || secondaryButtonText) && (
          <div className="flex flex-row justify-end gap-3 mt-1">
            {secondaryButtonText && (
              <Button variant="outlined" onClick={onSecondaryButtonClick}>
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button variant="primary" onClick={onPrimaryButtonClick}>
                {primaryButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Card.displayName = 'Card'

export { Card }
