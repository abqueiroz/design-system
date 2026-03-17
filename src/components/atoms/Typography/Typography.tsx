import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from "../../../lib/utils";

const typographyVariants = cva('transition-colors text-primary-900', {
  variants: {
    $variant: {
      xs: "typo-xs",
      sm: "typo-sm",
      base: "typo-base",
      lg: "typo-lg",
      xl: "typo-xl",
      "2xl": "typo-2xl",
      "3xl": "typo-3xl",
      "4xl": "typo-4xl",
      "5xl": "typo-5xl",
      "6xl": "typo-6xl",
      "7xl": "typo-7xl",
      "8xl": "typo-8xl",
      "9xl": "typo-9xl",
      "120pt": "typo-120pt",
    },
    $weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    $align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    $variant: "base",
    $align: "left",
    $weight: "regular",
  },
});

export interface TypographyProps extends VariantProps<typeof typographyVariants>,
  Omit<React.HTMLAttributes<HTMLElement>, "color" | "align"> {
  $as?: React.ElementType
  isAsChild?: boolean;
  htmlFor?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      $variant,
      $weight,
      $align,
      $as,
      isAsChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = $as || "span";

    return (
      <Comp
        ref={ref}
        className={cn(
          typographyVariants({
            $variant,
            $weight,
            $align,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };

