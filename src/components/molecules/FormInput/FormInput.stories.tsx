import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "./FormInput";
import { Search as SearchIcon, Mail, Lock, CheckCircle } from "lucide-react";
import { ThemeToggle } from "../../atoms/ThemeToggle/ThemeToggle";
import { Typography } from "../../atoms/Typography/Typography";

const meta = {
  title: "molecules/FormInput",
  component: FormInput,
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
    label: {
      control: "text",
    },
    caption: {
      control: "text",
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
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name...",
    caption: "Your full legal name as it appears on your ID.",
  },
};

export const WithStartIcon: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    $startIcon: <Mail />,
    type: "email",
    caption: "We'll never share your email with anyone else.",
  },
};

export const WithEndIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search components...",
    $endIcon: <SearchIcon />,
  },
};

export const Success: Story = {
  args: {
    $hasSuccess: true,
    label: "Username",
    placeholder: "Username",
    $startIcon: <CheckCircle />,
    defaultValue: "antigravity_dev",
    caption: "Username is available!",
  },
};

export const Error: Story = {
  args: {
    $hasError: true,
    label: "Password",
    placeholder: "Enter password",
    $startIcon: <Lock />,
    defaultValue: "123",
    caption: "Password must be at least 8 characters.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Account ID",
    placeholder: "Disabled input",
    disabled: true,
    $startIcon: <Lock />,
    caption: "Contact support to change this.",
  },
};

export const DarkModePreview: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 items-center p-8 min-w-100 bg-primary-0 rounded-2xl transition-colors duration-300 shadow-xl border border-outline-1">
      <div className="flex flex-col items-center gap-2 p-4 border rounded-xl bg-white dark:bg-primary-800 border-primary-200 dark:border-primary-700 shadow-sm">
        <Typography $variant="xs" $weight="medium" className="text-primary-500 dark:text-primary-400 uppercase tracking-wider">
          Dark Mode Preview
        </Typography>
        <ThemeToggle />
      </div>

      <div className="w-full space-y-6">
        <FormInput {...args} label="Email Address" placeholder="name@example.com" caption="Default helper text" />
        <FormInput {...args} $hasError label="Password" type="password" placeholder="••••••••" caption="Invalid password pattern" />
        <FormInput {...args} $hasSuccess label="Username" defaultValue="johndoe" caption="Username is valid" $endIcon={<CheckCircle className="text-green-500" />} />
        <FormInput {...args} disabled label="Locked Field" placeholder="Account ID" caption="Contact support to change this" />
      </div>
    </div>
  ),
  args: {
    $size: "md",
    $startIcon: <Mail />,
  }
};
