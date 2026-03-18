import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { Typography } from "../Typography";
import { Button } from "../Button";
import { useTheme } from "../../../hooks";

const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    $size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    $hasError: {
      control: "boolean",
    },
    $hasSuccess: {
      control: "boolean",
    },
    $fullWidth: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const groupedItems = [
  {
    label: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
  {
    label: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
  },
];

export const Default: Story = {
  args: {
    $items: fruits,
    placeholder: "Select a fruit...",
  },
};

export const WithLabel: Story = {
  args: {
    $items: fruits,
    placeholder: "Select a fruit...",
    label: "Favorite Fruit",
  },
};

export const Small: Story = {
  args: {
    $items: fruits,
    placeholder: "Select...",
    $size: "sm",
    label: "Small Select",
  },
};

export const Large: Story = {
  args: {
    $items: fruits,
    placeholder: "Select...",
    $size: "lg",
    label: "Large Select",
  },
};

export const Error: Story = {
  args: {
    $items: fruits,
    placeholder: "Select...",
    $hasError: true,
    label: "Error state",
  },
};

export const Success: Story = {
  args: {
    $items: fruits,
    placeholder: "Select...",
    $hasSuccess: true,
    label: "Success state",
  },
};

export const FullWidth: Story = {
  args: {
    $items: fruits,
    placeholder: "Select...",
    $fullWidth: true,
    label: "Full width Select",
  },
};

export const Disabled: Story = {
  args: {
    $items: fruits,
    placeholder: "Disabled...",
    disabled: true,
    label: "Disabled Select",
  },
};

export const WithGroups: Story = {
  args: {
    $groups: groupedItems,
    placeholder: "Select food...",
    label: "Food Selection",
  },
};

export const WithDisabledItems: Story = {
  args: {
    $items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "orange", label: "Orange" },
      { value: "grape", label: "Grape", disabled: true },
      { value: "mango", label: "Mango" },
    ],
    placeholder: "Select a fruit...",
    label: "Some items disabled",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="space-y-4 w-75">
        <Select
          $value={value}
          $onValueChange={setValue}
          $items={fruits}
          placeholder="Select a fruit..."
          label="Controlled Select"
        />
        <div className="p-4 bg-primary-50 dark:bg-primary-800 rounded-lg">
          <Typography $variant="xs" className="text-primary-500 dark:text-primary-400">
            Selected: {value || "None"}
          </Typography>
        </div>
        <Button $variant="outline" $size="sm" onClick={() => setValue("")}>
          Clear Selection
        </Button>
      </div>
    );
  },
};

export const MultipleSelects: Story = {
  render: () => {
    const [country, setCountry] = React.useState("");
    const [language, setLanguage] = React.useState("");

    const countries = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
    ];

    const languages = [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
    ];

    return (
      <div className="w-[400px] space-y-6 p-8 bg-white dark:bg-primary-900 rounded-xl border border-primary-200 dark:border-primary-700">
        <Typography $variant="xl" $weight="medium" className="mb-4 text-primary-900 dark:text-primary-0">
          User Preferences
        </Typography>

        <Select
          $value={country}
          $onValueChange={setCountry}
          $items={countries}
          placeholder="Select country..."
          label="Country"
        />

        <Select
          $value={language}
          $onValueChange={setLanguage}
          $items={languages}
          placeholder="Select language..."
          label="Language"
        />

        <div className="p-4 bg-primary-50 dark:bg-primary-800 rounded-lg space-y-2">
          <Typography $variant="sm" $weight="medium">
            Selection Summary
          </Typography>
          <Typography $variant="xs" className="text-primary-500 dark:text-primary-400">
            Country: {country || "Not selected"}
          </Typography>
          <Typography $variant="xs" className="text-primary-500 dark:text-primary-400">
            Language: {language || "Not selected"}
          </Typography>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      category: "",
      priority: "",
      status: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="w-[450px] space-y-6 p-8 bg-white dark:bg-primary-900 rounded-xl border border-primary-200 dark:border-primary-700"
      >
        <Typography $variant="xl" $weight="medium" className="mb-4 text-primary-900 dark:text-primary-0">
          Create Task
        </Typography>

        <Select
          $value={formData.category}
          $onValueChange={(value: any) =>
            setFormData({ ...formData, category: value })
          }
          $items={[
            { value: "bug", label: "Bug" },
            { value: "feature", label: "Feature" },
            { value: "improvement", label: "Improvement" },
          ]}
          placeholder="Select category..."
          label="Category"
        />

        <Select
          $value={formData.priority}
          $onValueChange={(value: any) =>
            setFormData({ ...formData, priority: value })
          }
          $items={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "critical", label: "Critical" },
          ]}
          placeholder="Select priority..."
          label="Priority"
        />

        <Select
          $value={formData.status}
          $onValueChange={(value: any) =>
            setFormData({ ...formData, status: value })
          }
          $items={[
            { value: "todo", label: "To Do" },
            { value: "in-progress", label: "In Progress" },
            { value: "review", label: "In Review" },
            { value: "done", label: "Done" },
          ]}
          placeholder="Select status..."
          label="Status"
        />

        <Button type="submit" $variant="primary" className="w-full">
          Create Task
        </Button>
      </form>
    );
  },
};

export const InteractiveTheme: Story = {
  render: () => {
    const { theme, setTheme } = useTheme();
    const [value, setValue] = React.useState("");

    return (
      <div
        className={`flex gap-8 p-12 flex-col w-[600px] rounded-2xl transition-all duration-300 border border-primary-200 dark:border-primary-700 ${theme === "light" ? "bg-white" : "dark bg-primary-900"
          }`}
      >
        <div className="flex items-center gap-6 mb-4 w-full justify-between">
          <div className="flex flex-col">
            <Typography
              $variant="xl" $weight="medium"
              className="text-primary-900 dark:text-primary-0 uppercase tracking-tight"
            >
              Interactive Preview
            </Typography>
            <Typography
              $variant="xs"
              className="text-primary-500 dark:text-primary-400 uppercase tracking-[0.2em]"
            >
              Current Theme: {theme}
            </Typography>
          </div>
          <Button
            $variant="outlineSecondary"
            $size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle Theme
          </Button>
        </div>

        <div className="space-y-6">
          <Select
            $value={value}
            $onValueChange={setValue}
            $items={fruits}
            placeholder="Select a fruit..."
            label="Favorite Fruit"
          />

          <Select
            $groups={groupedItems}
            placeholder="Select food..."
            label="Food Selection (Grouped)"
          />

          <Select
            $items={fruits}
            placeholder="Disabled select..."
            label="Disabled State"
            disabled
          />
        </div>
      </div>
    );
  },
};
