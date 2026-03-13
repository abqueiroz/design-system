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
    variant: {
      control: "select",
      options: [
        "primary",
        "error",
        "secondary",
        "outlined",
        "outlined-secondary",
        "text",
        "text-error",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "icon", "icon-sm"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const Error: Story = {
  args: {
    children: "Button",
    variant: "error",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const Outlined: Story = {
  args: {
    children: "Button",
    variant: "outlined",
  },
};

export const OutlinedSecondary: Story = {
  args: {
    children: "Button",
    variant: "outlined-secondary",
  },
};

export const Text: Story = {
  args: {
    children: "Button",
    variant: "text",
  },
};

export const TextError: Story = {
  args: {
    children: "Button",
    variant: "text-error",
  },
};

export const Loading: Story = {
  args: {
    children: "Button",
    loading: true,
  },
};

export const WithIcons: Story = {
  args: {
    children: "With Icons",
    leftIcon: <Mail />,
    rightIcon: <ArrowRight />,
  },
};

export const LeftIconOnly: Story = {
  args: {
    children: "Left Icon",
    leftIcon: <Plus />,
  },
};

export const RightIconOnly: Story = {
  args: {
    children: "Right Icon",
    rightIcon: <LogOut />,
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <a href="https://google.com" target="_blank" rel="noreferrer">
        Link as Button
      </a>
    ),
  },
};

export const FigmaGallery: Story = {
  render: () => {
    const variants = [
      "primary",
      "error",
      "secondary",
      "outlined",
      "outlined-secondary",
      "text",
      "text-error",
    ] as const;
    const sizes = ["default", "sm"] as const;
    const states = ["Default", "Disabled", "Loading", "Icon"] as const;

    return (
      <div className="flex flex-col gap-8 p-8 bg-surface-1">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">
              {size === "default" ? "40px" : "32px"}
            </h3>
            <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-4 items-center">
              <div />
              {variants.map((v) => (
                <div
                  key={v}
                  className="text-center text-xs font-medium text-text-secondary"
                >
                  {v}
                </div>
              ))}

              {states.map((state) => (
                <React.Fragment key={state}>
                  <div className="text-sm font-medium text-text-secondary">
                    {state}
                  </div>
                  {variants.map((variant) => (
                    <div
                      key={`${size}-${variant}-${state}`}
                      className="flex justify-center"
                    >
                      <Button
                        variant={variant}
                        size={size}
                        disabled={state === "Disabled"}
                        loading={state === "Loading"}
                        leftIcon={state === "Icon" ? <Plus /> : undefined}
                        rightIcon={
                          state === "Icon" ? <ArrowRight /> : undefined
                        }
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
    variant: "primary",
  },
  render: (args) => {
    const { theme, setTheme } = useTheme();
    return (
      <div
        className={`flex gap-4 p-8 flex-col w-[600px] rounded-lg justify-center items-center transition-colors ${theme === "light" ? "bg-white" : "bg-slate-950"
          }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary-main text-2xl font-bold uppercase tracking-widest">
            Theme: {theme}
          </span>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle theme
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button {...args} variant="primary">
            Primary
          </Button>
          <Button {...args} variant="error">
            Error
          </Button>
          <Button {...args} variant="secondary">
            Secondary
          </Button>
          <Button {...args} variant="outlined">
            Outlined
          </Button>
          <Button {...args} variant="outlined-secondary">
            Outlined Secondary
          </Button>
          <Button {...args} variant="text">
            Text
          </Button>
          <Button {...args} variant="text-error">
            Text Error
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
        "primary-main": "oklch(60% 0.15 30)", // Reddish/orange
        "primary-hover": "oklch(65% 0.15 30)",
        "text-primary": "oklch(20% 0.05 30)",
      },
      dark: {
        "primary-main": "oklch(70% 0.15 130)",
        "primary-hover": "oklch(75% 0.15 130)",
        "text-primary": "oklch(95% 0.05 130)",
      },
      radius: {
        "btn-pill": "4px", // Squared instead of pill
        "teardrop-tl": "4px",
      },
      spacing: {
        "btn-h": "48px", // Taller buttons
        "btn-px": "32px", // Wider horizontal padding
      },
      typography: {
        "font-size-body-1": "36pt",
        "leading-body-1": "10rem",
        "tracking-body-1": "0.006em",
        "font-size-body-2": "48pt",
        "leading-body-2": "8.25rem",
        "tracking-body-2": "0.003em",
        "font-weight-regular": "400",
        "font-weight-medium": "500",
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
            variant={isApplied ? "error" : "primary"}
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
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </div>

            <div className="dark p-8 bg-slate-950 rounded-xl space-y-4">
              <p className="text-slate-400 text-sm">Dark Mode Preview</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Dark Primary</Button>
                <Button variant="outlined">Dark Outlined</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
