import type { Meta, StoryObj } from '@storybook/react'
import { Button, useTheme } from '../../../'

/**
 * These stories demonstrate the custom scrollbar styling defined in `globals.css`.
 * The scrollbars are styled globally for all elements that have overflow, using
 * the theme variables `--color-outline-2` and `--color-outline-3`.
 */
const meta = {
  title: 'Styles/Scrollbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom global scrollbar styling applied to all scrollable elements in the application. It features a modern, thin design with rounded capsules and theme-aware colors.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const ScrollbarGallery = () => (
  <div className='flex flex-col gap-12 p-8'>
    <div className='flex flex-col gap-4'>
      <h3 className='text-lg font-bold'>Horizontal</h3>
      <div className='w-[300px] h-[100px] border border-outline-1 rounded-lg overflow-x-auto overflow-y-hidden bg-surface-1 p-4'>
        <div className='w-[600px] h-full flex items-center justify-center text-text-secondary'>
          Long content to trigger horizontal scrollbar... Keep scrolling to see
          the results of our custom styling!
        </div>
      </div>
    </div>

    <div className='flex flex-col gap-4'>
      <h3 className='text-lg font-bold'>Vertical</h3>
      <div className='w-[200px] h-[200px] border border-outline-1 rounded-lg overflow-y-auto overflow-x-hidden bg-surface-1 p-4'>
        <div className='h-[400px] w-full flex flex-col items-center justify-center text-text-secondary text-center'>
          <p>Scroll down</p>
          <p>↓</p>
          <p>↓</p>
          <p>↓</p>
          <p>↓</p>
          <p>↓</p>
          <p>↓</p>
          <p>Vertical content</p>
        </div>
      </div>
    </div>

    <div className='flex flex-col gap-4'>
      <h3 className='text-lg font-bold'>Both Axis</h3>
      <div className='w-[300px] h-[300px] border border-outline-1 rounded-lg overflow-auto bg-surface-1 p-4'>
        <div className='w-[600px] h-[600px] flex items-center justify-center text-text-secondary text-center bg-[linear-gradient(45deg,var(--color-surface-2)_25%,transparent_25%,transparent_50%,var(--color-surface-2)_50%,var(--color-surface-2)_75%,transparent_75%,transparent)] [background-size:20px_20px]'>
          <div className='bg-surface-1 p-4 rounded-md shadow-sm border border-outline-1'>
            Scroll in any direction to see the custom scrollbar in action.
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const Interactive: Story = {
  render: () => {
    const { theme, toggleTheme } = useTheme()
    return (
      <div className='flex flex-col items-center gap-8'>
        <div className='flex items-center gap-4 p-4 border border-outline-1 rounded-xl bg-surface-2 shadow-sm'>
          <span className='text-sm font-medium'>
            Current Theme: <span className='capitalize'>{theme}</span>
          </span>
          <Button variant='outlined' size='sm' onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </div>
        <div className='border border-outline-1 rounded-2xl bg-surface-1 shadow-lg'>
          <ScrollbarGallery />
        </div>
      </div>
    )
  },
}

export const HorizontalAndVertical: Story = {
  render: () => (
    <div className='flex flex-col gap-12 p-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-bold'>Horizontal</h3>
        <div className='w-[300px] h-[100px] border border-outline-1 rounded-lg overflow-x-auto overflow-y-hidden bg-surface-1 p-4'>
          <div className='w-[600px] h-full flex items-center justify-center text-text-secondary'>
            Long content to trigger horizontal scrollbar... Keep scrolling to
            see the results of our custom styling!
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-bold'>Vertical</h3>
        <div className='w-[200px] h-[200px] border border-outline-1 rounded-lg overflow-y-auto overflow-x-hidden bg-surface-1 p-4'>
          <div className='h-[400px] w-full flex flex-col items-center justify-center text-text-secondary text-center'>
            <p>Scroll down</p>
            <p>↓</p>
            <p>↓</p>
            <p>↓</p>
            <p>↓</p>
            <p>↓</p>
            <p>↓</p>
            <p>Vertical content</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Both: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <h3 className='text-lg font-bold'>Both Axis</h3>
      <div className='w-[300px] h-[300px] border border-outline-1 rounded-lg overflow-auto bg-surface-1 p-4'>
        <div className='w-[600px] h-[600px] flex items-center justify-center text-text-secondary text-center bg-[linear-gradient(45deg,var(--color-surface-2)_25%,transparent_25%,transparent_50%,var(--color-surface-2)_50%,var(--color-surface-2)_75%,transparent_75%,transparent)] [background-size:20px_20px]'>
          <div className='bg-surface-1 p-4 rounded-md shadow-sm border border-outline-1'>
            Scroll in any direction to see the custom scrollbar in action.
          </div>
        </div>
      </div>
    </div>
  ),
}
