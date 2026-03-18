import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const loadingVariants = cva(
  "inline-flex items-center justify-center text-primary-900",
  {
    variants: {
      variant: {
        infinite: "animate-spin rounded-full border-2 border-current border-t-transparent",
        text: "animate-pulse typo-body-1",
        dots: "flex gap-1.5 items-center justify-center",
      },
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-10",
      },
    },
    defaultVariants: {
      variant: "infinite",
      size: "md",
    },
  }
);

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof loadingVariants> {
  text?: string | string[];
  interval?: number;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, text = "Carregando...", interval = 2000, ...props }, ref) => {
    const [textIndex, setTextIndex] = React.useState(0);
    const textArray = Array.isArray(text) ? text : [text];

    React.useEffect(() => {
      if (textArray.length > 1) {
        const timer = setInterval(() => {
          setTextIndex((prev) => (prev + 1) % textArray.length);
        }, interval);
        return () => clearInterval(timer);
      }
    }, [textArray.length, interval]);

    if (variant === "dots") {
      const dotSize = size === "sm" ? "size-2" : size === "lg" ? "size-4" : "size-3";

      return (
        <div
          ref={ref}
          className={cn(loadingVariants({ variant, size: undefined, className }))}
          {...props}
        >
          <span className={cn(dotSize, "rounded-full bg-current animate-bounce [animation-duration:0.6s] [animation-delay:-0.3s]")} />
          <span className={cn(dotSize, "rounded-full bg-current animate-bounce [animation-duration:0.6s] [animation-delay:-0.15s]")} />
          <span className={cn(dotSize, "rounded-full bg-current animate-bounce [animation-duration:0.6s]")} />
        </div>
      );
    }

    if (variant === "text") {
      return (
        <div
          ref={ref}
          className={cn(loadingVariants({ variant, size: undefined, className }), "relative overflow-hidden min-h-[1.5em] min-w-30")}
          {...props}
        >
          {textArray.map((t, i) => (
            <span
              key={i}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out",
                i === textIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              )}
            >
              {t}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(loadingVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Loading.displayName = "Loading";

export { Loading, loadingVariants };
