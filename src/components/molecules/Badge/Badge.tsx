import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Typography } from "../../atoms";

const sizeToTypo = {
  sm: { $variant: "xs" as const },
  lg: { $variant: "sm" as const },
} satisfies Record<string, { $variant: "xs" | "sm" }>;

const badgeVariants = cva(
  "inline-flex items-center transition-colors px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-1",
  {
    variants: {
      $color: {
        gray: cn(
          "bg-[#F3F4F6] text-[#111111]",
          "dark:bg-[#41464F] dark:text-[#D1D5DB]",
        ),
        red: cn(
          "bg-[#FDE8E8] text-[#9B1C1C]",
          "dark:bg-[#771D1D] dark:text-[#F8B4B4]",
        ),
        yellow: cn(
          "bg-[#FDF6B2] text-[#723B13]",
          "dark:bg-[#633112] dark:text-[#FACA15]",
        ),
        green: cn(
          "bg-[#DEF7EC] text-[#03543F]",
          "dark:bg-[#014737] dark:text-[#84E1BC]",
        ),
        primary: cn(
          "bg-[#F3F4F6] text-[#2A2D31]",
          "dark:bg-[#111111] dark:text-[#D1D5DB]",
        ),
        indigo: cn(
          "bg-[#E5EDFF] text-[#42389D]",
          "dark:bg-[#362F78] dark:text-[#B4C6FC]",
        ),
        purple: cn(
          "bg-[#EDEBFE] text-[#5521B5]",
          "dark:bg-[#4A1D96] dark:text-[#CABFFD]",
        ),
        greenSinky: cn(
          "bg-[#E7F2F4] text-[#117483]",
          "dark:bg-[#117483] dark:text-[#E7F2F4]",
        ),
      },

      $size: {
        sm: "",
        lg: "",
      },

      clickable: {
        true: "cursor-pointer select-none active:scale-[0.98] hover:brightness-95 dark:hover:brightness-110",
        false: "",
      },

      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },

    compoundVariants: [
      {
        $size: "sm",
        class: "px-[10px] py-[4.5px] gap-[4px] rounded-[4px]",
      },
      {
        $size: "lg",
        class: "px-[12px] py-[5px] gap-[4px] rounded-[4px]",
      },
    ],

    defaultVariants: {
      $color: "gray",
      $size: "sm",
      clickable: false,
      disabled: false,
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
  VariantProps<typeof badgeVariants> {
  /** Ícone exibido à esquerda do texto (type=icon-text) ou o único elemento (type=only-icon). */
  $leftIcon?: React.ReactNode;
  /**
   * Ícone exibido à direita do texto — normalmente um "×" de fechar.
   * Só é renderizado quando $type="icon-text".
   */
  $rightIcon?: React.ReactNode;
  /** Variante tipográfica customizada. Se omitida, é inferida a partir de $size. */
  $typography?: "xs" | "sm";
  /** Callback executado ao clicar no botão de fechar. */
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Ícone customizado para o botão de fechar. */
  deleteIcon?: React.ReactNode;
  /** Define se o badge é interativo (focável e com hover state) */
  clickable?: boolean;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  (
    {
      className,
      $color,
      $size = "sm",
      $leftIcon,
      $rightIcon,
      $typography,
      children,
      onDelete,
      onClick,
      clickable,
      deleteIcon,
      disabled,
      ...props
    },
    ref,
  ) => {
    const typo = sizeToTypo[$size as keyof typeof sizeToTypo] ?? sizeToTypo.sm;
    const typographyVariant = $typography ?? typo.$variant;

    const isCircular =
      (React.Children.count(children) === 1 &&
        (React.isValidElement(children) ||
          (typeof children === "string" && children.length <= 2) ||
          (typeof children === "number" && children.toString().length <= 2)) &&
        !$leftIcon &&
        !$rightIcon) ||
      (!!$leftIcon && !children && !$rightIcon);

    const isClickable = !!onClick || !!clickable;
    const Component = isClickable && !onDelete ? "button" : "span";

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
          Component === "span" && isClickable ? handleKeydown : undefined
        }
        tabIndex={isClickable && !disabled ? 0 : undefined}
        role={isClickable && Component === "span" ? "button" : undefined}
        className={cn(
          badgeVariants({ $color, $size, clickable: isClickable, disabled }),
          isCircular &&
          "flex flex-row justify-center items-center px-2.5 py-0.5 absolute w-5 h-5 rounded-[80px]",
          className,
        )}
        {...(props as any)}
      >
        {/* Ícone esquerdo — presente em icon-text e only-icon */}
        {$leftIcon && (
          <div className="flex items-center justify-center shrink-0 text-current pointer-events-none">
            {$leftIcon}
          </div>
        )}

        {/* Texto — presente em icon-text e only-text */}
        {children !== undefined && (
          <Typography
            $as="span"
            $variant={typographyVariant}
            $weight="medium"
            className="text-inherit leading-none pointer-events-none"
          >
            {children}
          </Typography>
        )}

        {$rightIcon && !onDelete && (
          <div className="flex items-center justify-center shrink-0 text-current pointer-events-none">
            {$rightIcon}
          </div>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) onDelete(e);
            }}
            disabled={!!disabled}
            className="flex justify-center items-center shrink-0 -mr-1 ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:cursor-not-allowed"
            aria-label="Delete"
          >
            {deleteIcon || <X className="size-3" />}
          </button>
        )}
      </Component>
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };