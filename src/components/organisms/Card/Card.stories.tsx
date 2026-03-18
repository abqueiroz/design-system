import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button, Typography, useTheme } from '../../../'


const meta = {
  title: 'organisms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    subhead: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    image: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Title',
    subhead: 'Subhead',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    labels: ['label', 'label', 'label'],
    primaryButtonText: 'Primary',
    secondaryButtonText: 'Secondary',
    menuOptions: [
      { label: 'Edit' },
      { label: 'Delete' },
    ],
  },
}

export const NoImage: Story = {
  args: {
    title: 'Title',
    subhead: 'Subhead',
    description: 'No image provided, shows placeholder.',
    primaryButtonText: 'Primary',
  },
}

export const Minimal: Story = {
  args: {
    title: 'Just a Title',
  },
}

export const WithThemeToggler: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { theme, toggleTheme } = useTheme()
    return (
      <div
        className={`flex gap-6 p-8 flex-col rounded-2xl justify-center items-center transition-colors duration-300 min-h-75 bg-primary-0 shadow-lg border border-outline-1`}
      >
        <div className="flex items-center gap-4 mb-4">
          <Typography $variant="2xl" $weight="bold" className="text-primary-main uppercase tracking-widest">
            Theme: {theme}
          </Typography>
          <Button
            $variant="outline"
            $size="sm"
            onClick={toggleTheme}
          >
            Toggle theme
          </Button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center text-left">
          <Card {...args} />
        </div>
      </div>
    )
  },
}
