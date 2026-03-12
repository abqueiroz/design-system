import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Typography } from '@/components/atoms';
import { cn } from '@/lib';

const chipVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all overflow-hidden shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: { subtle: "", bold: "", outlined: "border bg-transparent" },
      color: {
        default: "bg-surface-4 text-surface-deep",
        error: "bg-error-subtle text-error-deep",
        success: "bg-success-subtle text-success-deep",
        warning: "bg-warning-subtle text-warning-deep",
        info: "bg-info-subtle text-info-deep",
      },
      size: {
        sm: "h-6 px-3 gap-1",
        default: "h-8 px-4 gap-1.5",
        lg: "h-10 px-5 gap-2",
      },
      clickable: {
        true: "cursor-pointer select-none active:scale-[0.98]",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
      format: {
        default: "rounded-full",
        "point-corner": "rounded-full rounded-tl-[4px]",
      },
    },
    compoundVariants: [
      // Bold Variants
      {
        variant: "bold",
        color: "default",
        className: "bg-surface-6 text-white",
      },
      {
        variant: "bold",
        color: "error",
        className: "bg-error-bold text-white",
      },
      {
        variant: "bold",
        color: "success",
        className: "bg-success-bold text-white",
      },
      {
        variant: "bold",
        color: "warning",
        className: "bg-warning-bold text-white",
      },
      { variant: "bold", color: "info", className: "bg-info-bold text-white" },

      // Outlined Variants
      {
        variant: "outlined",
        color: "default",
        className: "border-outline-2 text-text-primary",
      },
      {
        variant: "outlined",
        color: "error",
        className: "border-error-main text-error-deep",
      },
      {
        variant: "outlined",
        color: "success",
        className: "border-success-main text-success-deep",
      },
      {
        variant: "outlined",
        color: "warning",
        className: "border-warning-main text-warning-deep",
      },
      {
        variant: "outlined",
        color: "info",
        className: "border-info-main text-info-deep",
      },

      // Simplified Hover Logic via data attributes or utility focus
      {
        clickable: true,
        variant: "subtle",
        className: "hover:opacity-80 active:opacity-70",
      },
      { clickable: true, variant: "bold", className: "hover:opacity-90" },
      { clickable: true, variant: "outlined", className: "hover:bg-surface-2" },
    ],
    defaultVariants: {
      variant: "subtle",
      color: "default",
      size: "default",
      clickable: false,
      disabled: false,
      format: "default",
    },
  }
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onDelete" | "color">,
  VariantProps<typeof chipVariants> {
  label: string;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  disabled?: boolean;
}

const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      className,
      variant,
      color,
      size,
      label,
      onDelete,
      onClick,
      avatar,
      icon,
      deleteIcon,
      format,
      clickable,
      disabled,
      ...props
    },
    ref
  ) => {
    // If it has onClick, it should be a button.
    // If it has onDelete, it should probably be a div to avoid nested buttons.
    const isClickable = !!onClick || !!clickable;
    const Component = isClickable && !onDelete ? "button" : "div";

    const typographyMap = {
      sm: "caption",
      lg: "body-1",
      default: "body-2",
    } as const;

    const handleKeydown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (onClick as React.MouseEventHandler<HTMLElement>)?.(e as any);
      }
    };

    return (
      <Component
        ref={ref as any}
        type={Component === "button" ? "button" : undefined}
        disabled={Component === "button" ? disabled : undefined}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={
          Component === "div" && isClickable ? handleKeydown : undefined
        }
        tabIndex={isClickable && !disabled ? 0 : undefined}
        role={isClickable && Component === "div" ? "button" : undefined}
        className={cn(
          chipVariants({
            variant,
            color,
            size,
            clickable: isClickable,
            disabled,
            format,
            className,
          })
        )}
        {...(props as any)}
      >
        {avatar && <span className="inline-flex shrink-0 -ml-1">{avatar}</span>}
        {icon && <span className="inline-flex shrink-0">{icon}</span>}

        <Typography
          variant={typographyMap[size || "default"]}
          weight="medium"
          className="truncate text-inherit pointer-events-none"
          as="span"
        >
          {label}
        </Typography>

        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) onDelete(e);
            }}
            disabled={disabled}
            className="inline-flex shrink-0 -mr-1 ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:cursor-not-allowed"
            aria-label="Delete"
          >
            {deleteIcon || <X className="size-3.5" />}
          </button>
        )}
      </Component>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
