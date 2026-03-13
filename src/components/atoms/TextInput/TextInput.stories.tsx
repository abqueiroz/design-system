import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "../TextInput/TextInput";
import { Search as SearchIcon, Mail, Lock, Eye, Bell } from "lucide-react";

const meta = {
  title: "atoms/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    hasError: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["default", "full"],
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
    size: "full",
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
    placeholder: "Email address",
    startIcon: <Mail />,
    type: "email",
  },
};

export const WithEndIcon: Story = {
  args: {
    placeholder: "Search components...",
    endIcon: <SearchIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
    startIcon: <Lock />,
    endIcon: <Eye />,
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email...",
    startIcon: <Mail />,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    startIcon: <Lock />,
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
    startIcon: <SearchIcon />,
  },
};

export const Error: Story = {
  args: {
    hasError: true,
    placeholder: "Error input",
    startIcon: <Bell />,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    startIcon: <Lock />,
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
