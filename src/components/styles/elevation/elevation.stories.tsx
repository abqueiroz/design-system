import { Typography, Button } from '@/components/atoms'
import { Card } from '@/components/organisms'
import { useTheme } from '@/hooks'
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
    const { theme, setTheme } = useTheme()
    const shadowLevels = [
      { level: 'Level 1', class: 'shadow-level-1' },
      { level: 'Level 2', class: 'shadow-level-2' },
      { level: 'Level 3', class: 'shadow-level-3' },
      { level: 'Level 4', class: 'shadow-level-4' },
      { level: 'Level 5', class: 'shadow-level-5' },
    ]

    return (
      <div
        className={`flex flex-col gap-12 p-12 rounded-xl transition-colors min-w-200 ${theme === 'light' ? 'bg-surface-2' : 'bg-gray-600'
          }`}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <Typography variant="h2" weight="bold">Elevation Levels</Typography>
          <div className="flex items-center gap-4">
            <Typography variant="body-1" weight="medium">
              Theme: <span className="uppercase">{theme}</span>
            </Typography>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              Toggle theme
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {shadowLevels.map((shadow) => (
            <div key={shadow.level} className="flex flex-col gap-4 items-center">
              <Card
                title={shadow.level}
                description={`Applied with class \`${shadow.class}\``}
                className={shadow.class}
              //image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
}
