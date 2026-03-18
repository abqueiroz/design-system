import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'
import { ThemeToggle, Button, Typography } from '../../atoms'
import { Check, X, Star } from 'lucide-react'

const meta: Meta<typeof Badge> = {
  title: 'molecules/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $color: {
      control: 'select',
      options: ['gray', 'red', 'yellow', 'green', 'primary', 'indigo', 'purple', 'greenSinky'],
      description: 'The theme/color of the badge',
    },
    $size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: 'The size of the badge',
    },
    $typography: {
      control: 'select',
      options: ['xs', 'sm'],
      description: 'Overwrites the default typography variant',
    },
    children: {
      control: 'text',
      description: 'The content of the badge',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the badge is interactive (hover, active, focus states)',
    },
    onDelete: {
      action: 'deleted',
      description: 'Callback when the delete button is clicked',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the badge is clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    $color: 'primary',
    $size: 'sm',
    children: 'Badge',
  },
}

export const AllThemes: Story = {
  render: () => {
    const themes = [
      'gray',
      'red',
      'yellow',
      'green',
      'primary',
      'indigo',
      'purple',
      'greenSinky',
    ] as const

    return (
      <div className="flex flex-col gap-8 p-4 bg-surface-primary">
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold mb-2">Size: Small (sm)</h3>
            <div className="flex flex-wrap gap-3">
              {themes.map((theme) => (
                <Badge key={`${theme}-sm`} $color={theme} $size="sm">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold mb-2">Size: Large (lg)</h3>
            <div className="flex flex-wrap gap-3">
              {themes.map((theme) => (
                <Badge key={`${theme}-lg`} $color={theme} $size="lg">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Badge $color="green" $leftIcon={<Check size={12} />}>
          Completed
        </Badge>
        <Badge $color="red" $rightIcon={<X size={12} />}>
          Remove
        </Badge>
        <Badge
          $color="indigo"
          $leftIcon={<Star size={12} fill="currentColor" />}
          $rightIcon={<X size={12} />}
        >
          Featured
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge $color="green" $size="lg" $leftIcon={<Check size={14} />}>
          Completed
        </Badge>
        <Badge $color="red" $size="lg" $rightIcon={<X size={14} />}>
          Remove
        </Badge>
        <Badge
          $color="indigo"
          $size="lg"
          $leftIcon={<Star size={14} fill="currentColor" />}
          $rightIcon={<X size={14} />}
        >
          Featured
        </Badge>
      </div>
    </div>
  ),
}

export const CircularTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-text-secondary">Type: only-icon (circular 20x20)</p>
        <div className="flex items-center gap-4">
          <Badge $color="red" $leftIcon={<X size={12} />} />
          <Badge $color="green" $leftIcon={<Check size={12} />} />
          <Badge $color="indigo" $leftIcon={<Star size={12} fill="currentColor" />} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-text-secondary">Type: only-text (circular 20x20)</p>
        <div className="flex items-center gap-4">
          <Badge $color="gray">1</Badge>
          <Badge $color="primary">2</Badge>
          <Badge $color="purple">9+</Badge>
        </div>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-semibold mb-2">Clickable Badges (hover, focus, and active states)</p>
      <div className="flex items-center gap-4">
        <Badge $color="primary" clickable onClick={() => console.log('Clicked primary badge')}>
          Click Me
        </Badge>
        <Badge $color="green" clickable $leftIcon={<Check size={12} />} onClick={() => console.log('Clicked green badge')}>
          Approve
        </Badge>
        <Badge $color="indigo" clickable $size="lg" onClick={() => console.log('Clicked large indigo badge')}>
          Large Clickable
        </Badge>
      </div>
    </div>
  ),
}

export const Deletable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [badges, setBadges] = React.useState([
      { id: '1', label: 'Removable', color: 'gray' as const },
      { id: '2', label: 'Error', color: 'red' as const },
      { id: '3', label: 'Special Role', color: 'purple' as const, size: 'lg' as const, icon: true },
    ])

    const handleDelete = (id: string) => {
      setBadges((prev) => prev.filter((badge) => badge.id !== id))
    }

    return (
      <div className="flex flex-col gap-6">
        <p className="text-sm font-semibold mb-2">Deletable Badges (with built-in close button)</p>
        <div className="flex items-center gap-4">
          {badges.length > 0 ? (
            badges.map((badge) => (
              <Badge
                key={badge.id}
                $color={badge.color}
                $size={badge.size || 'sm'}
                $leftIcon={badge.icon ? <Star size={12} fill="currentColor" /> : undefined}
                onDelete={() => handleDelete(badge.id)}
              >
                {badge.label}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-text-secondary italic">All badges deleted.</p>
          )}
        </div>
        {badges.length === 0 && (
          <Button
            onClick={() => setBadges([
              { id: '1', label: 'Removable', color: 'gray' as const },
              { id: '2', label: 'Error', color: 'red' as const },
              { id: '3', label: 'Special Role', color: 'purple' as const, size: 'lg' as const, icon: true },
            ])}
            $variant="outline"
            $size="xs"
            className="w-fit"
          >
            Reset Badges
          </Button>
        )}
      </div>
    )
  },
}

export const ThemeToggleStory: Story = {
  render: () => {
    return (
      <div className="bg-primary-0 p-20 rounded-3xl flex flex-col gap-8 items-center transition-colors duration-300 border border-outline-1 shadow-lg min-w-100">
        <ThemeToggle />

        <div className="flex flex-wrap justify-center gap-4">
          <Badge $color="green" $leftIcon={<Check size={12} />}>Status</Badge>
          <Badge $color="primary">Default</Badge>
          <Badge $color="indigo" $size="lg">Large</Badge>
        </div>

        <Typography $variant="sm" className="text-text-secondary">
          Integrated ThemeToggle component
        </Typography>
      </div>
    )
  },
}
