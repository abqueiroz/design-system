import type * as React from 'react'

export type CardMenuOption = {
  label: string
  onClick?: () => void
}

export type CardProps = React.ComponentProps<'div'> & {
  /** Card title */
  title?: React.ReactNode
  /** Subhead text */
  subhead?: React.ReactNode
  /** Description text */
  description?: React.ReactNode
  /** Optional image URL */
  image?: string
  /** Array of string labels for chips */
  labels?: string[]
  /** Menu options for the top right popover */
  menuOptions?: CardMenuOption[]
  /** Text for the primary button */
  primaryButtonText?: string
  /** Handler for the primary button */
  onPrimaryButtonClick?: () => void
  /** Text for the secondary button */
  secondaryButtonText?: string
  /** Handler for the secondary button */
  onSecondaryButtonClick?: () => void
}
