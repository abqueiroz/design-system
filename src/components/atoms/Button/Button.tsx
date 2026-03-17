import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Loading } from "../Loading/Loading";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-50 relative cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      $variant: {
        primary: "bg-primary-900 text-primary-50 hover:bg-primary-800",
        secondary: "bg-primary-200 text-primary-900 hover:bg-primary-300",
        outline:
          "border border-primary-300 text-primary-900 hover:bg-primary-100",
        ghost: "text-primary-900 hover:bg-primary-100",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },

      $size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },

      $fullWidth: {
        true: "w-full",
      },

      $loading: {
        true: "cursor-wait",
      },
    },

    defaultVariants: {
      $variant: "primary",
      $size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  $as?: React.ElementType;
  $loading?: boolean;
  $leftIcon?: React.ReactNode;
  $rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      $variant,
      $size,
      $fullWidth,
      $as,
      $loading,
      $leftIcon,
      $rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = $as || "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || $loading}
        className={cn(
          buttonVariants({
            $variant,
            $size,
            $fullWidth,
            $loading,
            className,
          }),
        )}
        {...props}
      >
        {$loading && (
          <Loading
            variant="infinite"
            size="sm"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-current"
          />
        )}
        <div className={cn("inline-flex items-center gap-2", $loading && "opacity-0")}>
          {$leftIcon && <span>{$leftIcon}</span>}
          {children}
          {$rightIcon && <span>{$rightIcon}</span>}
        </div>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };