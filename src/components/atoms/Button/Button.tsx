import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "cursor-pointer transition-all duration-400 inline-flex items-center justify-center rounded-btn-pill gap-2 whitespace-nowrap disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-main border border-primary-main text-surface-1 hover:bg-primary-hover active:bg-primary-selected disabled:bg-primary-disabled hover:shadow-lg hover:shadow-primary-main/20",
        error:
          "bg-error-main border border-error-main text-surface-1 hover:bg-error-hover active:bg-error-bold disabled:bg-error-disabled hover:shadow-lg hover:shadow-error-main/20",
        secondary:
          "bg-surface-3 border border-surface-3 text-text-primary hover:bg-surface-4 active:bg-surface-5 disabled:text-text-disabled disabled:border-action-disabled  disabled:bg-action-disabled disabled:text-text-disabled",
        outlined:
          "border border-primary-main text-primary-main bg-transparent hover:bg-primary-subtle-hover border-primary-main active:bg-primary-subtle-selected active:text-primary-bold disabled:border-primary-disabled disabled:border-action-disabled disabled:text-text-disabled active:border-primary-bold",
        "outlined-secondary":
          "border border-outline-2 text-text-secondary bg-transparent hover:bg-surface-3 active:bg-surface-4 disabled:border-outline-1 disabled:text-text-disabled",
        text: "text-text-secondary bg-transparent hover:bg-surface-3 active:bg-surface-4 disabled:text-text-disabled",
        "text-error":
          "text-error-main bg-transparent hover:bg-surface-3 active:bg-surface-4 disabled:text-text-disabled active:text-error-bold disabled:text-error-disabled",
      },
      size: {
        default: "h-btn-h px-btn-px typo-button-1",
        sm: "h-btn-h-sm px-btn-px-sm typo-button-2",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: ["primary", "error"],
        size: "default",
        className:
          "rounded-tr-teardrop-tr rounded-tl-teardrop-tl rounded-br-teardrop-br rounded-bl-teardrop-bl disabled:text-text-disabled disabled:border-none disabled:bg-action-disabled",
      },
      {
        variant: ["primary", "error"],
        size: "sm",
        className:
          "rounded-tr-teardrop-tr-sm rounded-tl-teardrop-tl-sm rounded-br-teardrop-br-sm rounded-bl-teardrop-bl-sm disabled:text-text-disabled disabled:border-none disabled:bg-action-disabled",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = "button";
    const isLoadingOnly = loading;

    return (
      <Comp
        data-slot="button"
        data-loading-only={isLoadingOnly || undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
      >
        {loading ? (
          <div className="flex items-center justify-center ">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        ) : asChild ? (
          children
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="inline-flex shrink-0">{rightIcon}</span>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
