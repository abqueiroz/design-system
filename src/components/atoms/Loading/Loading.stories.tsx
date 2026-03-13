import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";
import { Button } from "../Button";
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
        <span className="text-xs text-text-secondary font-medium">Infinite</span>
        <Loading variant="infinite" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-text-secondary font-medium">Dots</span>
        <Loading variant="dots" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-text-secondary font-medium">Text</span>
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
    const { theme, setTheme } = useTheme();
    return (
      <div
        className={`flex gap-8 p-12 flex-col w-[600px] rounded-2xl justify-center items-center transition-all duration-500 ${
          theme === "light" ? "bg-surface-1 shadow-xl" : "bg-slate-950 shadow-2xl shadow-primary-main/10"
        }`}
      >
        <div className="flex items-center gap-6 mb-4">
          <span className="text-primary-main text-xl font-bold uppercase tracking-[0.2em]">
            Mode: {theme}
          </span>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full px-6"
          >
            Toggle Theme
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-12 w-full items-center justify-items-center">
          <div className="flex flex-col items-center gap-3">
            <Loading variant="infinite" size="lg" />
            <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Infinite</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Loading variant="dots" size="lg" />
            <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Dots</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 flex items-center justify-center">
              <Loading 
                variant="text" 
                text={["Loading...", "Almost there...", "Done!"]} 
                className="typo-button-1"
              />
            </div>
            <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Cycling Text</span>
          </div>
        </div>
      </div>
    );
  }
};
