import * as React from "react";
import { cn } from "../../../lib/utils";
import { cva } from "class-variance-authority";

// ─── Label variants ───────────────────────────────────────────────────────────
export const labelVariants = cva(
  "text-sm font-medium leading-[1.25] tracking-[0.02em] select-none",
  {
    variants: {
      $state: {
        default: "text-[#111111] dark:text-white",
        success: "text-[#046C4E] dark:text-[#0E9F6E]",
        error: "text-[#C81E1E] dark:text-[#F05252]",
      },
      $disabled: {
        true: "text-[#9CA3AF] dark:text-[#777C86]",
        false: "",
      },
    },
    // When disabled, override state color
    compoundVariants: [
      { $disabled: true, $state: "default", class: "text-[#9CA3AF] dark:text-[#777C86]" },
      { $disabled: true, $state: "success", class: "text-[#9CA3AF] dark:text-[#777C86]" },
      { $disabled: true, $state: "error", class: "text-[#9CA3AF] dark:text-[#777C86]" },
    ],
    defaultVariants: {
      $state: "default",
      $disabled: false,
    },
  }
);

// ─── Caption variants ─────────────────────────────────────────────────────────
export const captionVariants = cva(
  "text-xs font-medium leading-[1.25] tracking-[0.02em]",
  {
    variants: {
      $state: {
        default: "text-[#777C86] dark:text-[#9CA3AF]",
        success: "text-[#046C4E] dark:text-[#0E9F6E]",
        error: "text-[#C81E1E] dark:text-[#F05252]",
      },
      $disabled: {
        true: "text-[#9CA3AF] dark:text-[#777C86]",
        false: "",
      },
    },
    compoundVariants: [
      { $disabled: true, $state: "default", class: "text-[#9CA3AF] dark:text-[#777C86]" },
      { $disabled: true, $state: "success", class: "text-[#9CA3AF] dark:text-[#777C86]" },
      { $disabled: true, $state: "error", class: "text-[#9CA3AF] dark:text-[#777C86]" },
    ],
    defaultVariants: {
      $state: "default",
      $disabled: false,
    },
  }
);

export type FormFieldProps = {
  /** The form element (input, select, etc.) */
  children: React.ReactNode;
  /** Optional label rendered above the input */
  label?: string;
  /** Optional helper / validation text below the input */
  caption?: string;
  /** Show error styling */
  $hasError?: boolean;
  /** Show success styling */
  $hasSuccess?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Stretch wrapper to full container width */
  $fullWidth?: boolean;
  /** Optional ID to link label and children */
  id?: string;
  /** Optional container class */
  className?: string;
};

/**
 * A generic FormField component that provides label and caption logic
 * for any form component passed as children.
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      children,
      label,
      caption,
      $hasError = false,
      $hasSuccess = false,
      disabled = false,
      $fullWidth = false,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const $state = $hasSuccess ? "success" : $hasError ? "error" : "default";
    const $disabled = !!disabled;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2",
          $fullWidth ? "w-full" : "max-w-91",
          className
        )}
        {...props}
      >
        {/* Label */}
        {label && (
          <label htmlFor={id} className={labelVariants({ $state, $disabled })}>
            {label}
          </label>
        )}

        {/* Children (Input area) */}
        {children}

        {/* Caption */}
        {caption && (
          <span className={captionVariants({ $state, $disabled })}>
            {caption}
          </span>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
