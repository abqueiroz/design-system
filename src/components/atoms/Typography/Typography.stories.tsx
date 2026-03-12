
import type { Meta, StoryObj } from "@storybook/react";
import { Typography, type TypographyProps } from "./Typography";
import { useTheme } from "@/hooks";
import { Button } from "..";

const meta: Meta<TypographyProps> = {
  title: "atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "display-1",
        "display-2",
        "display-3",
        "h1",
        "h2",
        "h3",
        "body-1",
        "body-2",
        "caption",
      ],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "muted",
        "error",
        "success",
        "warning",
        "info",
        "white",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    as: {
      control: "text",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "body-1",
  },
};

export const Display1: Story = {
  args: {
    children: "Display 1",
    variant: "display-1",
  },
};

export const Display2: Story = {
  args: {
    children: "Display 2",
    variant: "display-2",
  },
};

export const Display3: Story = {
  args: {
    children: "Display 3",
    variant: "display-3",
  },
};

export const Heading1: Story = {
  args: {
    children: "Heading 1",
    variant: "h1",
  },
};

export const Heading2: Story = {
  args: {
    children: "Heading 2",
    variant: "h2",
  },
};

export const Heading3: Story = {
  args: {
    children: "Heading 3",
    variant: "h3",
  },
};

export const Body1: Story = {
  args: {
    children: "Body 1 / Button 1 / Link",
    variant: "body-1",
  },
};

export const Body2: Story = {
  args: {
    children: "Body 2 / Button 2",
    variant: "body-2",
  },
};

export const Caption: Story = {
  args: {
    children: "Caption text",
    variant: "caption",
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants = [
      "display-1",
      "display-2",
      "display-3",
      "h1",
      "h2",
      "h3",
      "body-1",
      "body-2",
      "caption",
    ] as const;

    return (
      <div className="flex flex-col gap-8 p-8 min-w-200">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex flex-col gap-2 border-b pb-4 border-outline-1 last:border-0"
          >
            <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
              {variant}
            </span>
            <Typography variant={variant}>
              The quick brown fox jumps over the lazy dog
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
        className={`flex gap-8 p-12 flex-col w-200 rounded-2xl justify-center items-center transition-all duration-300 border border-outline-1 ${theme === "light" ? "bg-surface-1" : "dark bg-surface-1"
          }`}
      >
        <div className="flex items-center gap-6 mb-4 w-full justify-between">
          <div className="flex flex-col">
            <Typography
              variant="h3"
              className="text-text-primary uppercase tracking-tight"
            >
              Interactive Preview
            </Typography>
            <Typography
              variant="caption"
              className="text-text-secondary uppercase tracking-[0.2em]"
            >
              Current Theme: {theme}
            </Typography>
          </div>
          <Button
            variant="outlined-secondary"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle Theme
          </Button>
        </div>

        <div className="flex flex-col gap-12 w-full p-8 rounded-xl border border-outline-1 bg-surface-2/30 backdrop-blur-sm">
          <div className="space-y-8">
            <div className="pb-4 border-b border-outline-1">
              <Typography variant="h2" color="primary" className="mb-2">
                Typography System
              </Typography>
              <Typography variant="body-1" color="secondary">
                Complete set of typographic scales for the application.
              </Typography>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <Typography
                  variant="caption"
                  className="uppercase tracking-widest text-text-secondary"
                >
                  Headers
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography variant="display-1">Display 1</Typography>
                    <Typography variant="caption" color="muted">
                      Display 1
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography variant="h1">Heading 1</Typography>
                    <Typography variant="caption" color="muted">
                      H1
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography variant="h2">Heading 2</Typography>
                    <Typography variant="caption" color="muted">
                      H2
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography variant="h3">Heading 3</Typography>
                    <Typography variant="caption" color="muted">
                      H3
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Typography
                  variant="caption"
                  className="uppercase tracking-widest text-text-secondary"
                >
                  Body & Caption
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography variant="body-1">Body 1 / Button 1</Typography>
                    <Typography variant="caption" color="muted">
                      Body 1
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography variant="body-2">Body 2 / Button 2</Typography>
                    <Typography variant="caption" color="muted">
                      Body 2
                    </Typography>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-outline-1 pb-2 border-dashed">
                    <Typography variant="caption">Caption Text</Typography>
                    <Typography variant="caption" color="muted">
                      Caption
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Typography
                  variant="caption"
                  className="uppercase tracking-widest text-text-secondary"
                >
                  Colors
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <Typography variant="body-2" color="primary">
                    Primary Text
                  </Typography>
                  <Typography variant="body-2" color="secondary">
                    Secondary Text
                  </Typography>
                  <Typography variant="body-2" color="muted">
                    Muted Text
                  </Typography>
                  <Typography variant="body-2" color="error">
                    Error Text
                  </Typography>
                  <Typography variant="body-2" color="success">
                    Success Text
                  </Typography>
                  <Typography variant="body-2" color="warning">
                    Warning Text
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
