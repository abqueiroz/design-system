import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";
import { ThemeProvider } from "@/hooks/use-theme";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label Text",
  },
};

export const DarkMode: Story = {
  args: {
    children: "Dark Label",
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <div className="dark bg-background p-8 rounded-lg text-foreground">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
