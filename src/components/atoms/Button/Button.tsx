import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";
import { Loading } from "../Loading/Loading";
import { Typography, type TypographyProps } from "../Typography/Typography";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-[6px] whitespace-nowrap transition-all duration-200 ease-in-out",
    "rounded-[4px] outline-none tracking-[0.02em]",
    "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-700",
    "relative cursor-pointer disabled:cursor-not-allowed",
  ),
  {
    variants: {
      $variant: {
        primary: cn(
          "bg-primary-900 text-primary-50",
          "hover:bg-primary-800/80 focus-visible:bg-primary-800/80",
          "active:bg-primary-800",
          "disabled:bg-primary-100 disabled:text-primary-400",
        ),
        secondary: cn(
          "bg-primary-50 text-primary-900",
          "hover:bg-primary-200 focus-visible:bg-primary-200",
          "active:bg-primary-300",
          "disabled:bg-primary-100 disabled:text-primary-400",
        ),
        outline: cn(
          "border border-primary-200 text-primary-900 bg-transparent",
          "hover:bg-primary-50 focus-visible:bg-primary-50",
          "active:bg-primary-100",
          "disabled:bg-primary-100 disabled:text-primary-400 disabled:border-primary-100",
        ),
        outlineSecondary: cn(
          "border border-primary-50 text-primary-50 bg-transparent",
          "hover:bg-primary-50 hover:text-primary-900 focus-visible:bg-primary-50 focus-visible:text-primary-900",
          "active:bg-primary-100 active:text-primary-900",
          "disabled:bg-primary-100 disabled:text-primary-400 disabled:border-primary-100",
        ),
        orange: cn(
          "bg-solarOrange-600 text-primary-50",
          "hover:bg-solarOrange-900 focus-visible:bg-solarOrange-900",
          "active:bg-solarOrange-800",
          "disabled:bg-primary-100 disabled:text-primary-400",
        ),
        outlineOrange: cn(
          "border border-solarOrange-600 text-primary-900 bg-transparent",
          "hover:bg-solarOrange-50 focus-visible:bg-solarOrange-50",
          "active:bg-solarOrange-100",
          "disabled:bg-primary-100 disabled:text-primary-400 disabled:border-primary-100",
        ),
        green: cn(
          "bg-metallicSeaweed-600 text-primary-50",
          "hover:bg-metallicSeaweed-900 focus-visible:bg-metallicSeaweed-900",
          "active:bg-metallicSeaweed-800",
          "disabled:bg-primary-100 disabled:text-primary-400",
        ),
        outlineGreen: cn(
          "border border-metallicSeaweed-600 text-primary-900 bg-transparent",
          "hover:bg-metallicSeaweed-50 focus-visible:bg-metallicSeaweed-50",
          "active:bg-metallicSeaweed-100",
          "disabled:bg-primary-100 disabled:text-primary-400 disabled:border-primary-100",
        ),
        selector: cn(
          "bg-transparent text-primary-500",
          "hover:bg-primary-900/80 hover:text-primary-50 focus-visible:bg-primary-900/80 focus-visible:text-primary-50",
          "active:bg-primary-900/90 active:text-primary-50",
          "data-[active=true]:bg-primary-100 data-[active=true]:text-primary-900",
          "disabled:bg-primary-100 disabled:text-primary-400",
        ),
      },

      $size: {
        ss: "h-[20px] w-[24px] p-[4px]",
        xs: "h-[31px] px-[12px] py-[8px]",
        sm: "h-[34px] px-[12px] py-[8px]",
        base: "h-[37px] px-[20px] py-[10px]",
        l: "h-[42px] px-[20px] py-[12px]",
        xl: "h-[52px] px-[24px] py-[14px]",
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
      $size: "base",
    },
  },
);

const sizeToTypo: Record<
  string,
  { $variant: TypographyProps["$variant"]; className?: string }
> = {
  ss: { $variant: "sm" },
  xs: { $variant: "sm" },
  sm: { $variant: "sm", className: "font-medium" },
  base: { $variant: "sm", className: "font-medium" },
  l: { $variant: "base", className: "font-medium" },
  xl: { $variant: "base", className: "font-medium" },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  $as?: React.ElementType;
  $loading?: boolean;
  $leftIcon?: React.ReactNode;
  $rightIcon?: React.ReactNode;
  "data-active"?: boolean;
  $typography?: TypographyProps["$variant"];
  $textProps?: Partial<TypographyProps>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      $variant,
      $size = "base",
      $fullWidth,
      $as,
      $loading,
      $leftIcon,
      $rightIcon,
      $typography,
      $textProps,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = $as || "button";
    const typo =
      sizeToTypo[($size as keyof typeof sizeToTypo) ?? "base"] ??
      sizeToTypo.base;

    return (
      <Comp
        ref={ref}
        disabled={disabled || !!$loading}
        className={cn(
          buttonVariants({ $variant, $size, $fullWidth, $loading }),
          className,
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

        <span
          className={cn(
            "inline-flex items-center gap-1.5",
            $loading && "opacity-0",
          )}
        >
          {$leftIcon && <span className="shrink-0">{$leftIcon}</span>}
          {typeof children === "string" ? (
            <Typography
              $as="span"
              $variant={$typography ?? typo.$variant}
              className={cn("text-inherit", typo.className)}
              {...$textProps}
            >
              {children}
            </Typography>
          ) : (
            children
          )}
          {$rightIcon && <span className="shrink-0">{$rightIcon}</span>}
        </span>
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };