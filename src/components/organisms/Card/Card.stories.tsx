import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { useTheme } from '../../../hooks/use-theme'
import { Button } from '../../atoms'


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
    const { theme, setTheme } = useTheme()
    return (
      <div
        className={`flex gap-6 p-8 flex-col rounded-lg justify-center items-center transition-colors min-h-75 ${theme === 'light' ? 'bg-white' : 'bg-slate-950'} ${theme === 'dark' ? 'dark' : ''}`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary-main text-2xl font-bold uppercase tracking-widest">
            Theme: {theme}
          </span>
          <Button
            $variant="outline"
            $size="sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
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
