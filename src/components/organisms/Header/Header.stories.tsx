import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { ThemeProvider } from "@/hooks/use-theme";

const meta = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};

export const DarkMode: Story = {
  args: {
    user: {
      name: 'Dark Mode User',
    },
  },
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
