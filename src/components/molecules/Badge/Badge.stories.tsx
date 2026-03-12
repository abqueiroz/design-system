import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'molecules/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'success', 'primary', 'warning', 'gray', 'light-gray'],
    },
    size: {
      control: 'select',
      options: ['medium', 'small'],
    },
    isDot: {
      control: 'boolean',
    },
    value: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    isDot: false,
    value: 9,
  },
}

export const VisualMatch: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-6">
        <span className="w-16 text-sm text-(--color-text-secondary)"></span>
        <span className="w-12 text-center text-sm font-medium">error</span>
        <span className="w-16 text-center text-sm font-medium">success</span>
        <span className="w-16 text-center text-sm font-medium">primary</span>
        <span className="w-16 text-center text-sm font-medium">warning</span>
        <span className="w-12 text-center text-sm font-medium">gray</span>
        <span className="w-16 text-center text-sm font-medium">light gray</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="w-16 text-sm">medium</span>
        <div className="w-12 flex justify-center"><Badge variant="error" size="medium" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="success" size="medium" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="primary" size="medium" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="warning" size="medium" value={99} /></div>
        <div className="w-12 flex justify-center"><Badge variant="gray" size="medium" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="light-gray" size="medium" value={99} /></div>
      </div>

      <div className="flex items-center gap-6">
        <span className="w-16 text-sm">small</span>
        <div className="w-12 flex justify-center"><Badge variant="error" size="small" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="success" size="small" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="primary" size="small" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="warning" size="small" value={99} /></div>
        <div className="w-12 flex justify-center"><Badge variant="gray" size="small" value={99} /></div>
        <div className="w-16 flex justify-center"><Badge variant="light-gray" size="small" value={99} /></div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <h3 className="text-lg font-bold">Badge dot</h3>
        <div className="flex items-center gap-4 rounded-md border border-primary-subtle p-2 w-max">
          <Badge variant="error" isDot />
          <Badge variant="success" isDot />
          <Badge variant="primary" isDot />
          <Badge variant="warning" isDot />
          <Badge variant="gray" isDot />
        </div>
      </div>
    </div>
  ),
}

export const ThemeToggle: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    value: 9,
    isDot: false,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDark, setIsDark] = React.useState(false)
    return (
      <div className={isDark ? 'dark' : ''}>
        <div className="bg-surface-1 p-20 rounded-xl flex flex-col gap-6 items-center transition-colors border border-outline-1 shadow-sm">
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 bg-primary-main text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
          >
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </button>
          <div className="flex items-center gap-4">
            <Badge {...args} />
            <Badge {...args} isDot />
          </div>
          <p className="text-sm text-text-secondary">
            Testing colors in {isDark ? 'Dark' : 'Light'} theme
          </p>
        </div>
      </div>
    )
  },
}
