import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';
import { ThemeProvider } from "@/hooks/use-theme";

const meta = {
  title: 'Pages/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <div className="dark bg-background min-h-screen text-foreground">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

