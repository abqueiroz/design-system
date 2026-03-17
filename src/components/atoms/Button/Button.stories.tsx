import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { Mail, ArrowRight, Plus, LogOut } from "lucide-react";
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
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    $size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
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

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    $variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    $variant: "danger",
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
    children: "Large",
    $size: "lg",
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

export const IconOnly: Story = {
  args: {
    children: <Plus size={20} />,
    $size: "icon",
    "aria-label": "Add item",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    $loading: true,
  },
};

export const FigmaGallery: Story = {
  render: () => {
    const variants = ["primary", "secondary", "outline", "ghost", "danger"] as const;
    const sizes = ["sm", "md", "lg"] as const;
    const states = ["Default", "Disabled", "Loading", "Full Width", "Icon"] as const;

    return (
      <div className="flex flex-col gap-8 p-8 bg-surface-1">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-4">
            <h3 className="text-xl font-bold uppercase text-primary-900 border-b pb-2">
              Size: {size}
            </h3>
            <div className="grid grid-cols-[120px_repeat(5,1fr)] gap-6 items-center">
              <div />
              {variants.map((v) => (
                <div
                  key={v}
                  className="text-center text-xs font-bold uppercase tracking-wider text-primary-600"
                >
                  {v}
                </div>
              ))}

              {states.map((state) => (
                <React.Fragment key={state}>
                  <div className="text-sm font-medium text-primary-900">
                    {state}
                  </div>
                  {variants.map((variant) => (
                    <div
                      key={`${size}-${variant}-${state}`}
                      className="flex justify-center"
                    >
                      <Button
                        $variant={variant}
                        $size={size}
                        $fullWidth={state === "Full Width"}
                        $loading={state === "Loading"}
                        $leftIcon={state === "Icon" ? <Plus size={16} /> : undefined}
                        disabled={state === "Disabled"}
                      >
                        Button
                      </Button>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
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
        className={`flex gap-4 p-8 flex-col w-150 rounded-lg justify-center items-center transition-colors ${theme === "light" ? "bg-white" : "bg-slate-950"
          }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary-main text-2xl font-bold uppercase tracking-widest">
            Theme: {theme}
          </span>
          <Button
            $variant="outline"
            $size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle theme
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button {...args} $variant="primary">
            Primary
          </Button>
          <Button {...args} $variant="secondary">
            Secondary
          </Button>
          <Button {...args} $variant="outline">
            Outline
          </Button>
          <Button {...args} $variant="ghost">
            Ghost
          </Button>
          <Button {...args} $variant="danger">
            Danger
          </Button>
          <Button {...args} $variant="primary" $fullWidth>
            Full Width
          </Button>
        </div>
      </div>
    );
  },
};

export const ThemeOverrideInteractive: Story = {
  render: () => {
    const [isApplied, setIsApplied] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
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
          <p className="text-text-secondary">
            Click the button below to apply a custom orange theme to the preview
            area. This uses a scoped selector to ensure other stories remain
            unaffected.
          </p>

          <Button
            $variant={isApplied ? "danger" : "primary"}
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
              <Button $variant="outline">Outline</Button>
              <Button $variant="ghost">Ghost</Button>
            </div>

            <div className="dark p-8 bg-slate-950 rounded-xl space-y-4">
              <p className="text-slate-400 text-sm">Dark Mode Preview</p>
              <div className="flex flex-wrap gap-4">
                <Button $variant="primary">Dark Primary</Button>
                <Button $variant="outline">Dark Outline</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
