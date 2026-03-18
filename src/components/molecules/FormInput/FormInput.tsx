import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { TextInput, inputVariants } from '../../atoms/TextInput/TextInput'
import { FormField } from '../FormField/FormField'

export type FormInputProps = Omit<React.ComponentProps<'input'>, 'size'> &
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
    /** Optional label rendered above the input */
    label?: string
    /** Optional helper / validation text below the input */
    caption?: string
  }

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      $size = 'md',
      $hasError = false,
      $hasSuccess = false,
      $fullWidth = false,
      $startIcon,
      $endIcon,
      label,
      caption,
      disabled,
      type,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        label={label}
        caption={caption}
        $hasError={$hasError}
        $hasSuccess={$hasSuccess}
        disabled={disabled}
        $fullWidth={$fullWidth}
        id={id}
        className={className}
      >
        <TextInput
          id={id}
          type={type}
          disabled={disabled}
          $size={$size}
          $hasError={$hasError}
          $hasSuccess={$hasSuccess}
          $startIcon={$startIcon}
          $endIcon={$endIcon}
          ref={ref}
          {...props}
        />
      </FormField>
    )
  }
)

FormInput.displayName = 'FormInput'

export { FormInput }
