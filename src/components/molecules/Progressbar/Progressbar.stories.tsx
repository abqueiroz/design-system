import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { cn } from '../../../lib/utils'
import { useTheme } from '../../../hooks'
import { Button } from '../../atoms/Button/Button'
import { ProgressBar } from './Progressbar'

const meta = {
  title: 'molecules/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    max: {
      control: { type: 'number', min: 1 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showValue: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
    className: 'w-[400px]',
  },
}

export const Indeterminate: Story = {
  args: {
    value: null,
    label: 'Downloading files',
    showValue: true,
    className: 'w-[400px]',
  },
}

export const WithLabelAndValue: Story = {
  args: {
    value: 75,
    label: 'System Update',
    showValue: true,
    className: 'w-[400px]',
  },
}

export const Sizes: Story = {
  args: {
    value: 60,
    className: 'w-[400px]',
  },
  render: (args) => (
    <div className='flex flex-col gap-6 w-[400px]'>
      <div className='space-y-1.5'>
        <span className='text-xs font-medium text-text-secondary'>
          Small (sm)
        </span>
        <ProgressBar {...args} size='sm' />
      </div>
      <div className='space-y-1.5'>
        <span className='text-xs font-medium text-text-secondary'>
          Medium (md)
        </span>
        <ProgressBar {...args} size='md' />
      </div>
      <div className='space-y-1.5'>
        <span className='text-xs font-medium text-text-secondary'>
          Large (lg)
        </span>
        <ProgressBar {...args} size='lg' />
      </div>
    </div>
  ),
}

export const CustomColors: Story = {
  args: {
    value: 40,
    label: 'Custom Styling',
    showValue: true,
    className: 'w-[400px]',
    trackClassName: 'bg-error-subtle/20',
    indicatorClassName:
      'bg-linear-to-r from-error-main to-error-bold shadow-(--error-glow)',
  },
}

export const Interactive: Story = {
  args: {
    className: 'w-[400px]',
    value: 0,
  },
  render: (args) => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
      }, 1000)
      return () => clearInterval(timer)
    }, [])

    return (
      <div className={cn('space-y-4', args.className)}>
        <ProgressBar
          {...args}
          value={progress}
          label='Automatic Progress'
          showValue
        />
        <div className='flex justify-center'>
          <button
            onClick={() => setProgress(0)}
            className='px-3 py-1 text-xs bg-primary-main text-white rounded-md hover:bg-primary-hover transition-colors'
          >
            Reset Progress
          </button>
        </div>
      </div>
    )
  },
}

export const ToggleTheme: Story = {
  args: {
    value: 65,
    label: 'Toggle Theme',
    showValue: true,
    className: 'w-[400px]',
  },
  render: (args) => {
    const { toggleTheme, theme } = useTheme()
    return (
      <div
        className={cn(
          'p-12 rounded-xl transition-all duration-500 border-2 border-dashed',
          'bg-white border-slate-200'
        )}
      >
        <Button onClick={toggleTheme} variant='outlined'>
          Toggle Theme
        </Button>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-bold uppercase tracking-widest text-slate-500'>
              Current Theme: {theme}
            </span>
          </div>
          <ProgressBar {...args} />
          <ProgressBar {...args} value={null} label='Indeterminate State' />
        </div>
      </div>
    )
  },
}
