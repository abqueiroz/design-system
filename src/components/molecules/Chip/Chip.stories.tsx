import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";
import { useTheme } from '../../../hooks';
import { User, Mail, Check, Star, Heart, AlertCircle } from "lucide-react";

const meta = {
  title: "molecules/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["subtle", "bold", "outlined"],
    },
    color: {
      control: "select",
      options: ["default", "error", "success", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    format: {
      control: "select",
      options: ["default", "point-corner"],
    },
    label: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Chip",
    variant: "subtle",
    color: "default",
  },
};

// Subtle variant (light background)
export const SubtleVariants: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip
        label="Default"
        variant="subtle"
        color="default"
        format="point-corner"
      />
      <Chip label="Error" variant="subtle" color="error" />
      <Chip label="Success" variant="subtle" color="success" />
      <Chip label="Warning" variant="subtle" color="warning" />
      <Chip label="Info" variant="subtle" color="info" />
    </div>
  ),
};

// Bold variant (dark filled)
export const BoldVariants: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Default" variant="bold" color="default" />
      <Chip label="Error" variant="bold" color="error" />
      <Chip label="Success" variant="bold" color="success" />
      <Chip label="Warning" variant="bold" color="warning" />
      <Chip label="Info" variant="bold" color="info" />
    </div>
  ),
};

// Outlined variant
export const OutlinedVariants: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Default" variant="outlined" color="default" />
      <Chip label="Error" variant="outlined" color="error" />
      <Chip label="Success" variant="outlined" color="success" />
      <Chip label="Warning" variant="outlined" color="warning" />
      <Chip label="Info" variant="outlined" color="info" />
    </div>
  ),
};

export const Sizes: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-text-secondary text-sm w-20">Small:</span>
        <Chip label="Small" size="sm" />
        <Chip label="Deletable" size="sm" onDelete={() => alert("Deleted!")} />
        <Chip label="With Icon" size="sm" icon={<Star />} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-text-secondary text-sm w-20">Default:</span>
        <Chip label="Default" size="default" />
        <Chip
          label="Deletable"
          size="default"
          onDelete={() => alert("Deleted!")}
        />
        <Chip label="With Icon" size="default" icon={<Star />} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-text-secondary text-sm w-20">Large:</span>
        <Chip label="Large" size="lg" />
        <Chip label="Deletable" size="lg" onDelete={() => alert("Deleted!")} />
        <Chip label="With Icon" size="lg" icon={<Star />} />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="User" icon={<User />} variant="bold" />
      <Chip label="Email" icon={<Mail />} variant="outlined" />
      <Chip
        label="Verified"
        icon={<Check />}
        variant="subtle"
        color="success"
      />
      <Chip label="Favorite" icon={<Heart />} variant="bold" color="error" />
      <Chip
        label="Alert"
        icon={<AlertCircle />}
        variant="outlined"
        color="warning"
      />
    </div>
  ),
};

export const WithAvatar: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip
        label="John Doe"
        avatar={
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Avatar"
            className="w-6 h-6 rounded-full"
          />
        }
        variant="subtle"
      />
      <Chip
        label="Jane Smith"
        avatar={
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="Avatar"
            className="w-6 h-6 rounded-full"
          />
        }
        variant="bold"
      />
      <Chip
        label="Bob Johnson"
        avatar={
          <div className="w-6 h-6 rounded-full bg-primary-main text-white flex items-center justify-center text-xs font-bold">
            BJ
          </div>
        }
        variant="outlined"
      />
    </div>
  ),
};

export const Deletable: Story = {
  args: { label: "" },
  render: () => {
    const [chips, setChips] = React.useState([
      {
        id: 1,
        label: "React",
        variant: "bold" as const,
        color: "default" as const,
      },
      {
        id: 2,
        label: "TypeScript",
        variant: "bold" as const,
        color: "info" as const,
      },
      {
        id: 3,
        label: "Tailwind",
        variant: "bold" as const,
        color: "success" as const,
      },
      {
        id: 4,
        label: "Storybook",
        variant: "bold" as const,
        color: "warning" as const,
      },
    ]);

    const handleDelete = (id: number) => {
      setChips(chips.filter((chip) => chip.id !== id));
    };

    return (
      <div className="flex flex-col gap-4">
        <p className="text-text-secondary text-sm">
          Click the X to delete chips:
        </p>
        <div className="flex flex-wrap gap-3">
          {chips.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.label}
              variant={chip.variant}
              color={chip.color}
              onDelete={() => handleDelete(chip.id)}
            />
          ))}
        </div>
        {chips.length === 0 && (
          <p className="text-text-disabled italic">All chips deleted!</p>
        )}
      </div>
    );
  },
};

export const Clickable: Story = {
  args: { label: "" },
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);

    const options = [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
      { id: "angular", label: "Angular" },
      { id: "svelte", label: "Svelte" },
    ];

    return (
      <div className="flex flex-col gap-4">
        <p className="text-text-secondary text-sm">
          Click to select a framework:
        </p>
        <div className="flex flex-wrap gap-3">
          {options.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              variant={selected === option.id ? "bold" : "outlined"}
              onClick={() => setSelected(option.id)}
              clickable
            />
          ))}
        </div>
        {selected && (
          <p className="text-primary-main font-medium">
            Selected: {options.find((o) => o.id === selected)?.label}
          </p>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-text-secondary text-sm">Disabled chips:</p>
      <div className="flex flex-wrap gap-3">
        <Chip label="Disabled" variant="subtle" disabled />
        <Chip label="Disabled" variant="bold" disabled />
        <Chip label="Disabled" variant="outlined" disabled />
        <Chip label="Deletable" variant="subtle" onDelete={() => { }} disabled />
        <Chip label="Clickable" variant="bold" onClick={() => { }} disabled />
      </div>
    </div>
  ),
};

export const ComponentMatrix: Story = {
  args: { label: "" },
  render: () => {
    const colorSchemes = [
      { name: "Default", color: "default" },
      { name: "Critical / Error", color: "error" },
      { name: "Positive / Success", color: "success" },
      { name: "Warning", color: "warning" },
      { name: "Info", color: "info" },
    ] as const;

    return (
      <div className="flex flex-col gap-6 p-8 bg-surface-1 min-w-[900px]">
        <h3 className="text-2xl font-bold">Component Matrix</h3>

        <div className="grid gap-6">
          {colorSchemes.map(({ name, color }) => (
            <div
              key={name}
              className="grid grid-cols-[150px_1fr] gap-4 items-center"
            >
              <span className="text-sm font-medium text-text-secondary">
                {name}
              </span>
              <div className="flex flex-wrap gap-3">
                <Chip label="subtle" variant="subtle" color={color} />
                <Chip label="bold" variant="bold" color={color} />
                <Chip label="outlined" variant="outlined" color={color} />
                <Chip
                  label="label"
                  variant="subtle"
                  color={color}
                  avatar={
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="Avatar"
                      className="w-5 h-5 rounded-full"
                    />
                  }
                />
                <Chip
                  label="label"
                  variant="bold"
                  color={color}
                  avatar={
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="Avatar"
                      className="w-5 h-5 rounded-full"
                    />
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Demo: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-surface-1">
      <h3 className="text-2xl font-bold">Demo</h3>
      <div className="flex flex-wrap gap-3 p-6 border border-outline-2 rounded-lg">
        <Chip label="Tag" variant="subtle" onDelete={() => alert("Deleted!")} />
        <Chip label="Online" variant="outlined" color="success" />
        <Chip label="Offline" variant="outlined" />
        <Chip
          label="label"
          variant="subtle"
          avatar={
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Avatar"
              className="w-6 h-6 rounded-full"
            />
          }
          onDelete={() => alert("Deleted!")}
        />
        <Chip label="label" variant="bold" color="info" />
      </div>
    </div>
  ),
};

export const LightAndDarkToggler: Story = {
  args: { label: "" },
  render: () => {
    const { theme, setTheme } = useTheme();
    return (
      <div
        className={`flex gap-4 p-8 flex-col w-[800px] rounded-lg justify-center items-center transition-colors ${theme === "light" ? "bg-white" : "bg-slate-950"
          }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary-main text-2xl font-bold uppercase tracking-widest">
            Theme: {theme}
          </span>
          <Chip
            label={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            variant="outlined"
            size="default"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            clickable
          />
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-text-secondary">Subtle</p>
            <Chip label="Default" variant="subtle" color="default" />
            <Chip label="Error" variant="subtle" color="error" />
            <Chip label="Success" variant="subtle" color="success" />
            <Chip label="Warning" variant="subtle" color="warning" />
            <Chip label="Info" variant="subtle" color="info" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-text-secondary">Bold</p>
            <Chip label="Default" variant="bold" color="default" />
            <Chip label="Error" variant="bold" color="error" />
            <Chip label="Success" variant="bold" color="success" />
            <Chip label="Warning" variant="bold" color="warning" />
            <Chip label="Info" variant="bold" color="info" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-text-secondary">
              Outlined
            </p>
            <Chip label="Default" variant="outlined" color="default" />
            <Chip label="Error" variant="outlined" color="error" />
            <Chip label="Success" variant="outlined" color="success" />
            <Chip label="Warning" variant="outlined" color="warning" />
            <Chip label="Info" variant="outlined" color="info" />
          </div>
        </div>
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  args: { label: "" },
  render: () => {
    const [tags, setTags] = React.useState([
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Angular",
    ]);
    const [inputValue, setInputValue] = React.useState("");

    const handleAddTag = () => {
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    };

    const handleDeleteTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleAddTag();
      }
    };

    return (
      <div className="flex flex-col gap-6 p-6 bg-surface-1 rounded-lg min-w-[500px]">
        <div>
          <h3 className="text-lg font-semibold mb-2">Tag Manager</h3>
          <p className="text-text-secondary text-sm">
            Add or remove tags using the input below
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a tag and press Enter"
            className="flex-1 px-4 py-2 border border-outline-2 rounded-full text-body-2 outline-none focus:ring-2 focus:ring-primary-main"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-2 bg-primary-main text-white rounded-full text-body-2 font-medium hover:bg-primary-hover transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 border-2 border-dashed border-outline-2 rounded-lg">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="bold"
                onDelete={() => handleDeleteTag(tag)}
              />
            ))
          ) : (
            <p className="text-text-disabled italic">
              No tags yet. Add some above!
            </p>
          )}
        </div>
      </div>
    );
  },
};
