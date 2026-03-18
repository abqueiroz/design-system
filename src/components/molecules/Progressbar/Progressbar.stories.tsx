import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { cn } from '../../../lib/utils'
import { Button, Typography, useTheme } from '../../../'
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
        <Typography $variant='xs' $weight='medium' className='text-text-secondary'>
          Small (sm)
        </Typography>
        <ProgressBar {...args} size='sm' />
      </div>
      <div className='space-y-1.5'>
        <Typography $variant='xs' $weight='medium' className='text-text-secondary'>
          Medium (md)
        </Typography>
        <ProgressBar {...args} size='md' />
      </div>
      <div className='space-y-1.5'>
        <Typography $variant='xs' $weight='medium' className='text-text-secondary'>
          Large (lg)
        </Typography>
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [progress, setProgress] = React.useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
          <Button
            onClick={() => setProgress(0)}
            $variant='primary'
            $size='xs'
          >
            Reset Progress
          </Button>
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { toggleTheme, theme } = useTheme()
    return (
      <div
        className={cn(
          'p-12 rounded-xl transition-all duration-500 border border-outline-1 bg-primary-0 shadow-lg'
        )}
      >
        <Button onClick={toggleTheme} $variant='outline' className="mb-8">
          Toggle Theme
        </Button>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <Typography $variant='sm' $weight='bold' className='uppercase tracking-widest text-text-secondary'>
              Current Theme: {theme}
            </Typography>
          </div>
          <ProgressBar {...args} />
          <ProgressBar {...args} value={null} label='Indeterminate State' />
        </div>
      </div>
    )
  },
}
