import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "../TextInput/TextInput";
import { Search as SearchIcon, Mail, Lock, Eye, Bell, CheckCircle } from "lucide-react";
import { ThemeToggle } from "../../atoms/ThemeToggle/ThemeToggle";
import { Typography } from "../../atoms/Typography/Typography";

const meta = {
  title: "atoms/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    $hasError: {
      control: "boolean",
    },
    $hasSuccess: {
      control: "boolean",
    },
    $size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
  args: {
    $size: "md",
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithStartIcon: Story = {
  args: {
    placeholder: "name@example.com",
    $startIcon: <Mail />,
    type: "email",
  },
};

export const WithEndIcon: Story = {
  args: {
    placeholder: "Search components...",
    $endIcon: <SearchIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
    $startIcon: <Lock />,
    $endIcon: <Eye />,
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email...",
    $startIcon: <Mail />,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    $startIcon: <Lock />,
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search components...",
    $startIcon: <SearchIcon />,
  },
};

export const Success: Story = {
  args: {
    $hasSuccess: true,
    placeholder: "Username",
    $startIcon: <CheckCircle />,
    defaultValue: "antigravity_dev",
  },
};

export const Error: Story = {
  args: {
    $hasError: true,
    placeholder: "Enter password",
    $startIcon: <Lock />,
    defaultValue: "123",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    $startIcon: <Lock />,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is a default value",
  },
};

export const WithFile: Story = {
  args: {
    type: "file",
  },
};

/**
 * A preview of the TextInput in both light and dark modes.
 * Use the ThemeToggle to switch between modes.
 */
export const DarkModePreview: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 items-center p-8 min-w-100 bg-primary-0 rounded-2xl transition-colors duration-300 shadow-xl border border-outline-1">
      <div className="flex flex-col items-center gap-2 p-4 border rounded-xl bg-white dark:bg-primary-800 border-primary-200 dark:border-primary-700 shadow-sm">
        <Typography $variant="xs" $weight="medium" className="text-primary-500 dark:text-primary-400 uppercase tracking-wider">
          Dark Mode Preview
        </Typography>
        <ThemeToggle />
      </div>

      <div className="w-[364px] space-y-6">
        <TextInput {...args} placeholder="name@example.com" />
        <TextInput {...args} $hasError type="password" placeholder="••••••••" />
        <TextInput {...args} $hasSuccess defaultValue="johndoe" $endIcon={<CheckCircle className="text-green-500" />} />
        <TextInput {...args} disabled placeholder="Account ID" />
      </div>
    </div>
  ),
  args: {
    $size: "md",
    $startIcon: <Mail />,
  }
};

