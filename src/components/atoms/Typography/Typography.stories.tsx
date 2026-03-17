
import type { Meta, StoryObj } from "@storybook/react";
import { Typography, type TypographyProps } from "./Typography";
import { useTheme } from "../../../hooks";
import { Button } from "..";

const meta: Meta<TypographyProps> = {
  title: "atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    $variant: {
      control: "select",
      options: [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl",
      ],
    },
    $weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
    $align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    $as: {
      control: "text",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hello, world!",
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants = [
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
      "8xl",
      "9xl",
    ] as const;

    return (
      <div className="flex flex-col gap-8 p-8 min-w-200 bg-background text-foreground transition-colors duration-300">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex flex-col gap-2 border-b pb-4 border-outline-1 last:border-0"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider bg-surface-2 px-2 py-1 rounded">
                {variant}
              </span>
              <span className="text-xs font-mono text-text-disabled uppercase tracking-wider">
                {variant === "xs"
                  ? "12px"
                  : variant === "sm"
                    ? "14px"
                    : variant === "base"
                      ? "16px"
                      : variant === "lg"
                        ? "18px"
                        : variant === "xl"
                          ? "20px"
                          : variant === "2xl"
                            ? "24px"
                            : variant === "3xl"
                              ? "32px"
                              : variant === "4xl"
                                ? "36px"
                                : variant === "5xl"
                                  ? "48px"
                                  : variant === "6xl"
                                    ? "60px"
                                    : variant === "7xl"
                                      ? "72px"
                                      : variant === "8xl"
                                        ? "96px"
                                        : variant === "9xl"
                                          ? "128px"
                                          : ""}
              </span>
            </div>
            <Typography $variant={variant}>
              Almost before we knew it, we had left the ground.
            </Typography>
          </div>
        ))}
      </div>
    );
  },
};

export const InteractiveTheme: Story = {
  render: () => {
    const { theme, setTheme } = useTheme();
    return (
      <div
        className={`flex gap-8 p-12 flex-col w-200 rounded-2xl justify-center items-center transition-all duration-300 border border-outline-1 ${theme === "dark" ? "dark bg-surface-1" : "bg-surface-1"
          }`}
      >
        <div className="flex items-center gap-6 mb-4 w-full justify-between">
          <div className="flex flex-col">
            <Typography
              $variant="lg"
              className="text-foreground uppercase tracking-tight"
            >
              Interactive Preview
            </Typography>
            <Typography
              $variant="xs"
              className="text-text-secondary uppercase tracking-[0.2em]"
            >
              Current Theme: {theme}
            </Typography>
          </div>
          <Button
            $variant="ghost"
            $size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle Theme
          </Button>
        </div>

        <div className="flex flex-col gap-12 w-full p-8 rounded-xl border border-outline-1 bg-surface-2/30 backdrop-blur-sm">
          <div className="space-y-8">
            <div className="pb-4 border-b border-outline-1">
              <Typography $variant="2xl" className="mb-2">
                Typography System
              </Typography>
              <Typography $variant="base">
                Complete set of typographic scales for the application.
              </Typography>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <Typography
                  $variant="xs"
                  className="uppercase tracking-widest text-text-secondary"
                >
                  Headers
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography $variant="9xl">9XL Display</Typography>
                    <Typography $variant="xs">
                      128px
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography $variant="3xl">3XL Heading</Typography>
                    <Typography $variant="xs">
                      32px
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography $variant="2xl">2XL Heading</Typography>
                    <Typography $variant="xs">
                      24px
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography $variant="lg">LG Heading</Typography>
                    <Typography $variant="xs">
                      18px
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Typography
                  $variant="xs"
                  className="uppercase tracking-widest text-text-secondary"
                >
                  Body & Caption
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography $variant="base">Base / Default</Typography>
                    <Typography $variant="xs">
                      Base
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography $variant="sm">Small</Typography>
                    <Typography $variant="xs">
                      SM
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography $variant="xs">Extra Small</Typography>
                    <Typography $variant="xs">
                      XS
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Typography
                  $variant="xs"
                  className="uppercase tracking-widest text-text-secondary"
                >
                  Colors
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

