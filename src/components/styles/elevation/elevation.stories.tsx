import { Typography, Button } from '../../../components/atoms'
import { Card } from '../../../components/organisms'
import { useTheme } from '../../../hooks/use-theme'
import type { Meta, StoryObj } from '@storybook/react'


const meta = {
  title: 'Styles/Elevation',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const ElevationLevels: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { theme, toggleTheme } = useTheme()
    const shadowLevels = [
      { level: 'Level 1', class: 'shadow-level-1' },
      { level: 'Level 2', class: 'shadow-level-2' },
      { level: 'Level 3', class: 'shadow-level-3' },
      { level: 'Level 4', class: 'shadow-level-4' },
      { level: 'Level 5', class: 'shadow-level-5' },
    ]

    return (
      <div
        className={`flex flex-col gap-8 p-12 rounded-3xl transition-colors duration-300 bg-primary-0 shadow-xl border border-outline-1`}
      >
        <div className="flex items-center justify-between gap-4 mb-2">
          <Typography $variant="2xl" $weight="bold">Elevation Levels</Typography>
          <div className="flex items-center gap-4">
            <Typography $variant="sm" $weight="medium">
              Theme: <Typography $variant="sm" $weight="bold" className="uppercase">{theme}</Typography>
            </Typography>
            <Button
              $variant="outline"
              $size="sm"
              onClick={toggleTheme}
            >
              Toggle theme
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-12 gap-x-32 w-full">
          {shadowLevels.map((shadow, index) => (
            <div
              key={shadow.level}
              className={`flex flex-col gap-4 ${index % 2 === 0 ? 'items-start' : 'items-end'
                }`}
            >
              <Card
                title={shadow.level}
                description={`Applied with class \`${shadow.class}\``}
                className={shadow.class}
                image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
}
