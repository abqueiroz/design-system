import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectSearch } from "./SelectSearch";
import { Typography } from "../../atoms/Typography";
import { useTheme } from "../../../hooks";
import { Button } from "../../atoms/Button";


const meta = {
  title: "Molecules/SelectSearch",

  component: SelectSearch,
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
} satisfies Meta<typeof SelectSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "pineapple", label: "Pineapple" },
  { value: "strawberry", label: "Strawberry" },
  { value: "watermelon", label: "Watermelon" },
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
    $searchPlaceholder: "Search fruits...",
  },
};

export const WithLabel: Story = {
  args: {
    $items: fruits,
    placeholder: "Select a fruit...",
    $searchPlaceholder: "Search...",
    label: "Favorite Fruit",
  },
};

export const Small: Story = {
  args: {
    $items: fruits,
    placeholder: "Select...",
    $size: "sm",
    label: "Small Select with Search",
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
    $searchPlaceholder: "Search food...",
    label: "Food Selection",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="space-y-4 w-[300px]">
        <SelectSearch
          $value={value}
          $onValueChange={setValue}
          $items={fruits}
          placeholder="Select a fruit..."
          $searchPlaceholder="Find..."
          label="Controlled Select"
        />
        <div className="p-4 bg-primary-0 border border-primary-200 rounded-lg">
          <Typography $variant="xs" className="text-primary-900">
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

export const RemoteSearch: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [searchValue, setSearchValue] = React.useState("");

    // Simulate remote fetching
    const filteredFruits = React.useMemo(() => {
      if (!searchValue) return fruits;
      return fruits.filter(f => f.label.toLowerCase().includes(searchValue.toLowerCase()));
    }, [searchValue]);

    return (
      <div className="space-y-4 w-[300px]">
        <SelectSearch
          $value={value}
          $onValueChange={setValue}
          $onSearchChange={setSearchValue}
          $items={filteredFruits}
          placeholder="Select a fruit remotely..."
          $searchPlaceholder="Remote search..."
          label="Remote Search Example"
        />
        <div className="p-4 bg-primary-0 border border-primary-200 rounded-lg">
          <Typography $variant="xs" className="text-primary-900">
            Search query: {searchValue || "Empty"}
          </Typography>
        </div>
      </div>
    );
  },
};
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const { theme, setTheme } = useTheme();

    return (
      <div
        className={`flex min-h-[400px] w-[600px] flex-col gap-6 rounded-lg p-8 transition-colors bg-primary-0`}
      >
        <div className="flex items-center justify-between border-b border-primary-200 pb-4">
          <Typography $variant="xl" className="text-primary-900 font-medium">
            Select with Search
          </Typography>
          <Button
            $variant="outline"
            $size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle {theme === "light" ? "Dark" : "Light"}
          </Button>
        </div>

        <div className="space-y-4">
          <SelectSearch
            $value={value}
            $onValueChange={setValue}
            $items={fruits}
            placeholder="Select a fruit..."
            $searchPlaceholder="Search fruits..."
            label="Theme Aware Select"
          />

          <div className="p-4 bg-primary-0 rounded-lg border border-primary-200">
            <Typography $variant="xs" className="text-primary-900 block mb-1">
              Selected Value:
            </Typography>
            <Typography $variant="sm" $weight="medium">
              {value || "None selected"}
            </Typography>
          </div>

          <div className="flex gap-2">
            <Button
              $variant="primary"
              $size="sm"
              onClick={() => setValue("apple")}
              disabled={value === "apple"}
            >
              Set to Apple
            </Button>
            <Button
              $variant="outline"
              $size="sm"
              onClick={() => setValue("")}
              disabled={!value}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
