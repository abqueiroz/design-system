import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { ThemeToggle } from "../ThemeToggle";
import { Mail, ArrowRight, Plus, Settings } from "lucide-react";
import { useTheme, ThemeProvider } from '../../../hooks/use-theme';

const meta = {
  title: "atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    $variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "outlineSecondary",
        "orange",
        "outlineOrange",
        "green",
        "outlineGreen",
        "selector"
      ],
    },
    $size: {
      control: "select",
      options: [
        "ss",
        "xs",
        "sm",
        "base",
        "l",
        "xl",
        "icon-ss",
        "icon-xs",
        "icon-sm",
        "icon-base",
        "icon-l",
        "icon-xl"
      ],
    },
    $fullWidth: {
      control: "boolean",
    },
    $loading: {
      control: "boolean",
    },
    $leftIcon: {
      control: "text",
    },
    $rightIcon: {
      control: "text",
    },
    $typography: {
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
        "120pt",
      ],
      description: "Typography variant for the button text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    $variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    $variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    $variant: "outline",
  },
};

export const OutlineSecondary: Story = {
  args: {
    children: "Outline Secondary Button",
    $variant: "outlineSecondary",
  },
};

export const Orange: Story = {
  args: {
    children: "Orange Button",
    $variant: "orange",
  },
};

export const Green: Story = {
  args: {
    children: "Green Button",
    $variant: "green",
  },
};

export const OutlineOrange: Story = {
  args: {
    children: "Outline Orange Button",
    $variant: "outlineOrange",
  },
};

export const OutlineGreen: Story = {
  args: {
    children: "Outline Green Button",
    $variant: "outlineGreen",
  },
};

export const Selector: Story = {
  args: {
    children: "Selector Item",
    $variant: "selector",
    "data-active": true,
  },
};

export const VariantGallery: Story = {
  render: () => {
    const variants = [
      "primary",
      "secondary",
      "outline",
      "outlineSecondary",
      "orange",
      "outlineOrange",
      "green",
      "outlineGreen",
      "selector",
    ] as const;

    return (
      <div className="flex flex-col gap-6 p-8">
        <h2 className="text-2xl font-bold mb-4">Button Variants Gallery</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {variants.map((v) => (
            <div key={v} className="flex flex-col gap-2 p-4 border rounded-lg border-outline-1 bg-surface-1">
              <div className="text-sm font-mono text-primary-500 mb-2">{v}</div>
              <div className="flex flex-col gap-4">
                <Button $variant={v}>Button</Button>
                <Button $variant={v} disabled>Disabled</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const WithTextProps: Story = {
  args: {
    children: "Custom Typography",
    $variant: "primary",
    $textProps: {
      $weight: "bold",
      className: "text-metallicSeaweed-500",
    },
  },
};

export const TypographyOverride: Story = {
  args: {
    children: "Large Text Button",
    $variant: "primary",
    $typography: "xl",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    $size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large (l)",
    $size: "l",
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    $fullWidth: true,
  },
};

export const WithIcons: Story = {
  args: {
    children: "With Icons",
    $leftIcon: <Mail size={16} />,
    $rightIcon: <ArrowRight size={16} />,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    $loading: true,
  },
};

export const LightAndDarkToggler: Story = {
  args: {
    children: "Button",
    $variant: "primary",
  },
  render: (args) => {
    const { theme, setTheme } = useTheme();
    return (
      <div
        className={`flex gap-4 p-8 flex-col w-[600px] rounded-lg justify-center items-center transition-colors bg-surface-1 border border-outline-1`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-foreground text-2xl font-bold">
            Theme Status:
          </span>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button {...args} $variant="primary">
            Primary
          </Button>
          <Button {...args} $variant="secondary">
            Secondary
          </Button>
          <Button {...args} $variant="outlineSecondary">
            Outline White
          </Button>
          <Button {...args} $variant="outlineOrange">
            Outline Orange
          </Button>
          <Button {...args} $variant="outlineGreen">
            Outline Green
          </Button>
          <Button {...args} $variant="primary" $fullWidth>
            Full Width
          </Button>
          <Button {...args} $variant="selector">
            Selector Item
          </Button>
        </div>
      </div>
    );
  },
};

export const ThemeOverrideInteractive: Story = {
  render: () => {
    const [isApplied, setIsApplied] = React.useState(false);
    const containerId = "scoped-theme-container";

    const customTheme = {
      light: {
        "primary-900": "oklch(60% 0.15 30)", // Reddish/orange
        "primary-800": "oklch(65% 0.15 30)",
        "red-600": "oklch(45% 0.2 25)",      // Darker red for danger
      },
      dark: {
        "primary-900": "oklch(70% 0.15 130)", // Greenish
        "primary-800": "oklch(75% 0.15 130)",
      },
      radius: {
        "md": "2px", // Squarer rounded-md
      },
    };

    return (
      <div className="flex flex-col gap-8 p-8 min-w-[600px]">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Interactive Theme Override</h2>
          <p className="text-primary-600">
            Click the button below to apply a custom orange theme to the preview
            area. This uses a scoped selector to ensure other stories remain
            unaffected.
          </p>

          <Button
            $variant={isApplied ? "outlineSecondary" : "primary"}
            onClick={() => setIsApplied(!isApplied)}
          >
            {isApplied ? "Reset Theme" : "Apply Orange Theme"}
          </Button>
        </div>

        <div
          id={containerId}
          className="p-12 border-2 border-dashed rounded-2xl bg-surface-1 transition-all"
        >
          {isApplied && (
            <ThemeProvider theme={customTheme} selector={`#${containerId}`} />
          )}

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold border-b pb-2">
              Preview Area (Scoped)
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button $variant="primary">Primary Button</Button>
              <Button $variant="secondary">Secondary</Button>
              <Button $variant="outlineSecondary">Outline Secondary</Button>
              <Button $variant="selector">Selector</Button>
            </div>

            <div className="dark p-8 bg-surface-1 border border-outline-1 rounded-xl space-y-4">
              <p className="text-foreground/60 text-sm">Dark Mode Preview</p>
              <div className="flex flex-wrap gap-4">
                <Button $variant="primary">Dark Primary</Button>
                <Button $variant="outlineSecondary">Dark Outline</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const TypographyGallery: Story = {
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
      "120pt",
    ] as const;

    return (
      <div className="flex flex-col gap-6 p-8">
        <h2 className="text-2xl font-bold mb-4">Typography Gallery</h2>
        <div className="flex flex-col gap-6">
          {variants.map((variant) => (
            <div key={variant} className="flex items-center gap-4 border-b pb-4">
              <div className="w-24 shrink-0 text-sm font-mono text-primary-500">
                {variant}
              </div>
              <Button $typography={variant} $variant="primary">
                Button Text {variant}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
