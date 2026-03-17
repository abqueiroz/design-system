import { cn } from '../../../lib/utils'
import type { CardProps } from './'
import { Typography } from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import { ImageIcon } from 'lucide-react'
import { Badge } from '../../molecules/'
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
        'flex flex-col rounded-2xl overflow-hidden border border-primary-100 bg-primary-50 min-w-75 max-w-85 shadow-level-1',
        className
      )}
      {...rest}
    >
      {/* Image / Header Area */}
      <div className="relative h-48 bg-primary-100 flex items-center justify-center">
        {image ? (
          <img src={image} alt={typeof title === 'string' ? title : 'Card Image'} className="w-full h-full object-cover" />
        ) : (
          <div className="size-16 flex items-center justify-center bg-primary-200">
            <ImageIcon className="size-8 text-primary-400" />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col p-5 gap-5">
        {/* Texts */}
        <div className="flex flex-col gap-1">
          {title && (
            <Typography $variant="xl" $weight="semibold" className="text-primary-900">
              {title}
            </Typography>
          )}
          {subhead && (
            <Typography $variant="base" className="text-primary-600">
              {subhead}
            </Typography>
          )}
          {description && (
            <div className="mt-2">
              <Typography $variant="sm" className="leading-relaxed text-primary-600">
                {description}
              </Typography>
            </div>
          )}
        </div>

        {/* Labels / Badges */}
        {labels && labels.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2">
            {labels.map((label) => (
              <Badge
                key={label}
                $color="gray"
                $size="sm"
              >
                {label}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {(primaryButtonText || secondaryButtonText) && (
          <div className="flex flex-row justify-end gap-3 mt-1">
            {secondaryButtonText && (
              <Button $variant="outline" onClick={onSecondaryButtonClick}>
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button $variant="primary" onClick={onPrimaryButtonClick}>
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
