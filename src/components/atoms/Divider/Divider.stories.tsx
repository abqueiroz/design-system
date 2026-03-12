import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta = {
  title: 'atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    $position: {
      control: 'select',
      options: ['left', 'center', 'right', 'top', 'bottom'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <div className='w-75 flex flex-col gap-4'>
      <div className='text-sm font-medium'>Content Above</div>
      <Divider {...args} />
      <div className='text-sm font-medium'>Content Below</div>
    </div>
  ),
  args: {
    $orientation: 'horizontal',
  },
}

export const Vertical: Story = {
  render: (args) => (
    <div className='flex h-10 items-center space-x-4 text-sm'>
      <div>Dashboard</div>
      <Divider {...args} />
      <div>Settings</div>
      <Divider {...args} />
      <div>Profile</div>
    </div>
  ),
  args: {
    $orientation: 'vertical',
  },
}

export const CustomStyling: Story = {
  render: (args) => (
    <div className='w-75 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <span className='text-xs text-text-secondary uppercase tracking-wider font-bold'>
          Primary Color
        </span>
        <Divider
          className='bg-primary-main via-primary-main opacity-100 h-0.5'
          {...args}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <span className='text-xs text-text-secondary uppercase tracking-wider font-bold'>
          Thick & Bold
        </span>
        <Divider
          className='h-1 bg-linear-to-r from-error-main via-warning-main to-success-main opacity-100 rounded-full'
          {...args}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <span className='text-xs text-text-secondary uppercase tracking-wider font-bold'>
          Subtle Dotted (using border)
        </span>
        <Divider
          className='bg-transparent border-t border-dashed border-outline-3'
          {...args}
        />
      </div>
    </div>
  ),
}

export const WithChildrenHorizontal: Story = {
  render: (args) => {
    const { $orientation, $position, ...rest } = args
    return (
      <div className='w-100 flex flex-col gap-8'>
        <Divider {...rest} $orientation='horizontal' $position='left'>
          Left Position
        </Divider>
        <Divider {...rest} $orientation='horizontal' $position='center'>
          Center Position
        </Divider>
        <Divider {...rest} $orientation='horizontal' $position='right'>
          Right Position
        </Divider>
      </div>
    )
  },
  args: {
    $orientation: 'horizontal',
  },
}

export const WithChildrenVertical: Story = {
  render: (args) => {
    const { $orientation, $position, ...rest } = args
    return (
      <div className='flex h-64 items-center justify-center space-x-16 text-sm'>
        <Divider {...rest} $orientation='vertical' $position='top'>
          Top
        </Divider>
        <Divider {...rest} $orientation='vertical' $position='center'>
          Center
        </Divider>
        <Divider {...rest} $orientation='vertical' $position='bottom'>
          Bottom
        </Divider>
      </div>
    )
  },
  args: {
    $orientation: 'vertical',
  },
}
