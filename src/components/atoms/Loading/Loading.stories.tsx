import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";
import { Button, Typography } from "../";
import { useTheme } from "../../../hooks/use-theme";

const meta = {
  title: "atoms/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["infinite", "text", "dots"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    text: {
      control: "text",
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Infinite: Story = {
  args: {
    variant: "infinite",
    size: "md",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    text: "Carregando...",
  },
};

export const TextCycling: Story = {
  args: {
    variant: "text",
    text: ["Carregando...", "Preparando café...", "Quase lá...", "Pronto!"],
    interval: 2000,
  },
};

export const Dots: Story = {
  args: {
    variant: "dots",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Loading variant="infinite" size="sm" />
        <Loading variant="infinite" size="md" />
        <Loading variant="infinite" size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Loading variant="dots" size="sm" />
        <Loading variant="dots" size="md" />
        <Loading variant="dots" size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Loading variant="text" size="sm" text="Small text..." />
        <Loading variant="text" size="md" text="Medium text..." />
        <Loading variant="text" size="lg" text="Large text..." />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <div className="flex flex-col items-center gap-2">
        <Typography $variant="xs" $weight="medium" className="text-text-secondary">Infinite</Typography>
        <Loading variant="infinite" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Typography $variant="xs" $weight="medium" className="text-text-secondary">Dots</Typography>
        <Loading variant="dots" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Typography $variant="xs" $weight="medium" className="text-text-secondary">Text</Typography>
        <Loading variant="text" />
      </div>
    </div>
  ),
};

export const LightAndDarkToggler: Story = {
  args: {
    text: "cvbcvbcbv"
  },

  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { theme, toggleTheme } = useTheme();
    return (
      <div
        className={`flex gap-8 p-12 flex-col w-[600px] rounded-3xl justify-center items-center transition-all duration-300 bg-primary-0 border border-outline-1 shadow-2xl`}
      >
        <div className="flex items-center gap-6 mb-4">
          <Typography $variant="xl" $weight="bold" className="text-primary-main uppercase tracking-[0.2em]">
            Mode: {theme}
          </Typography>
          <Button
            $variant="outline"
            $size="sm"
            onClick={toggleTheme}
            className="rounded-full px-6"
          >
            Toggle Theme
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-12 w-full items-center justify-items-center">
          <div className="flex flex-col items-center gap-3">
            <Loading variant="infinite" size="lg" />
            <Typography $variant="xs" $weight="bold" className="text-text-secondary uppercase tracking-widest text-[10px]">Infinite</Typography>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Loading variant="dots" size="lg" />
            <Typography $variant="xs" $weight="bold" className="text-text-secondary uppercase tracking-widest text-[10px]">Dots</Typography>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 flex items-center justify-center">
              <Loading 
                variant="text" 
                text={["Loading...", "Almost there...", "Done!"]} 
                className="typo-button-1"
              />
            </div>
            <Typography $variant="xs" $weight="bold" className="text-text-secondary uppercase tracking-widest text-[10px]">Cycling Text</Typography>
          </div>
        </div>
      </div>
    );
  }
};
