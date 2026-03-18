import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { TextInput } from "../../atoms/TextInput/TextInput";
import { ThemeToggle } from "../../atoms/ThemeToggle/ThemeToggle";
import { Typography } from "../../atoms/Typography/Typography";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

const meta = {
  title: "molecules/FormField",
  component: FormField,
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
    disabled: {
      control: "boolean",
    },
    $fullWidth: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    caption: {
      control: "text",
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Name",
    caption: "Enter your full name",
    children: <TextInput placeholder="John Doe" />,
  },
};

export const WithTextInput: Story = {
  args: {
    label: "Email Address",
    caption: "We will never share your email.",
    children: <TextInput $startIcon={<Mail size={16} />} placeholder="name@example.com" />,
  },
};

export const Success: Story = {
  args: {
    $hasSuccess: true,
    label: "Username",
    caption: "Username is available!",
    children: <TextInput $hasSuccess defaultValue="antigravity" $endIcon={<CheckCircle size={16} className="text-green-500" />} />,
  },
};

export const Error: Story = {
  args: {
    $hasError: true,
    label: "Password",
    caption: "Password is too short.",
    children: <TextInput $hasError type="password" defaultValue="123" $endIcon={<AlertCircle size={16} className="text-red-500" />} />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Account ID",
    caption: "This field cannot be edited.",
    children: <TextInput disabled defaultValue="ACC-123456" />,
  },
};

export const WithCustomChildren: Story = {
  args: {
    label: "Bio",
    caption: "Tell us a bit about yourself.",
    children: (
      <textarea
        className="w-full p-3 rounded border border-[#D1D5DB] dark:border-[#525A64] bg-white dark:bg-[#41464F] text-[#111111] dark:text-white focus:outline-none focus:border-[#525A64] min-h-[100px] transition-colors"
        placeholder="Type something..."
      />
    ),
  },
};

export const DarkModePreview: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 items-center p-8 min-w-100 bg-primary-50 dark:bg-primary-900 rounded-2xl transition-colors">
      <div className="flex flex-col items-center gap-2 p-4 border rounded-xl bg-white dark:bg-primary-800 border-primary-200 dark:border-primary-700 shadow-sm">
        <Typography $variant="xs" $weight="medium" className="text-primary-500 dark:text-primary-400 uppercase tracking-wider">
          Dark Mode Preview
        </Typography>
        <ThemeToggle />
      </div>

      <div className="w-full space-y-6">
        <FormField {...args} label="Email Address" caption="Default helper text">
          <TextInput $startIcon={<Mail size={16} />} placeholder="name@example.com" />
        </FormField>
        
        <FormField {...args} $hasError label="Password" caption="Invalid password pattern">
          <TextInput $hasError type="password" placeholder="••••••••" />
        </FormField>

        <FormField {...args} $hasSuccess label="Username" caption="Username is valid">
          <TextInput $hasSuccess defaultValue="johndoe" $endIcon={<CheckCircle size={16} className="text-green-500" />} />
        </FormField>
      </div>
    </div>
  ),
};
