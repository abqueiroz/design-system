import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../atoms/Button/Button'
import { useTheme } from '../../../hooks'

/**
 * This story showcases the comprehensive color palette defined in the design system's theme.
 * All colors are accessible via CSS variables (e.g., `var(--color-primary-main)`) and are 
 * automatically updated when the theme is toggled between light and dark modes.
 */
const meta = {
  title: 'Styles/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const ColorSwatch = ({ name, variable }: { name: string; variable: string }) => (
  <div className="flex flex-col gap-2 p-2 rounded-lg border border-primary-100 bg-primary-50 shadow-sm transition-all hover:shadow-md">
    <div
      className="h-16 w-full rounded-md border border-primary-100 dark:border-primary-800"
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div className="px-1">
      <p className="text-xs font-bold text-primary-900 truncate" title={name}>{name}</p>
      <code className="text-[10px] text-primary-500 select-all">{variable}</code>
    </div>
  </div>
)

const ColorGroup = ({ title, colors }: { title: string; colors: { name: string; variable: string }[] }) => (
  <div className="flex flex-col gap-4 mb-8">
    <h3 className="text-xl font-bold border-b border-primary-100 pb-2 text-primary-900 dark:border-primary-800 dark:text-primary-50">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {colors.map((color) => (
        <ColorSwatch key={color.variable} {...color} />
      ))}
    </div>
  </div>
)

export const Palette: Story = {
  render: () => {
    const { theme, toggleTheme } = useTheme()

    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 p-8 rounded-2xl border border-primary-100 bg-primary-50 shadow-sm transition-all dark:border-primary-800 dark:bg-primary-900/50">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold text-primary-900 dark:text-primary-50">Interactive Palette</h1>
            <p className="text-primary-500 text-lg">
              Toggle the theme to see how colors adapt dynamically across the design system.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-primary-100/20 p-4 rounded-xl border border-primary-100 shadow-inner dark:bg-primary-900 dark:border-primary-800">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary-400">Active Theme</span>
              <span className="text-sm font-black text-primary-600 uppercase tracking-tight dark:text-primary-400">{theme}</span>
            </div>
            <Button
              variant="outlined"
              onClick={toggleTheme}
              className="min-w-32"
            >
              Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>
        </div>

        <ColorGroup
          title="Primary (Grayscale)"
          colors={[
            { name: "50", variable: "--color-primary-50" },
            { name: "100", variable: "--color-primary-100" },
            { name: "200", variable: "--color-primary-200" },
            { name: "300", variable: "--color-primary-300" },
            { name: "400", variable: "--color-primary-400" },
            { name: "500", variable: "--color-primary-500" },
            { name: "600", variable: "--color-primary-600" },
            { name: "700", variable: "--color-primary-700" },
            { name: "800", variable: "--color-primary-800" },
            { name: "900", variable: "--color-primary-900" },
          ]}
        />

        <ColorGroup
          title="Red Palette"
          colors={[
            { name: "50", variable: "--color-red-50" },
            { name: "100", variable: "--color-red-100" },
            { name: "200", variable: "--color-red-200" },
            { name: "300", variable: "--color-red-300" },
            { name: "400", variable: "--color-red-400" },
            { name: "500", variable: "--color-red-500" },
            { name: "600", variable: "--color-red-600" },
            { name: "700", variable: "--color-red-700" },
            { name: "800", variable: "--color-red-800" },
            { name: "900", variable: "--color-red-900" },
          ]}
        />

        <ColorGroup
          title="Yellow Palette"
          colors={[
            { name: "50", variable: "--color-yellow-50" },
            { name: "100", variable: "--color-yellow-100" },
            { name: "200", variable: "--color-yellow-200" },
            { name: "300", variable: "--color-yellow-300" },
            { name: "400", variable: "--color-yellow-400" },
            { name: "500", variable: "--color-yellow-500" },
            { name: "600", variable: "--color-yellow-600" },
            { name: "700", variable: "--color-yellow-700" },
            { name: "800", variable: "--color-yellow-800" },
            { name: "900", variable: "--color-yellow-900" },
          ]}
        />

        <ColorGroup
          title="Green Palette"
          colors={[
            { name: "50", variable: "--color-green-50" },
            { name: "100", variable: "--color-green-100" },
            { name: "200", variable: "--color-green-200" },
            { name: "300", variable: "--color-green-300" },
            { name: "400", variable: "--color-green-400" },
            { name: "500", variable: "--color-green-500" },
            { name: "600", variable: "--color-green-600" },
            { name: "700", variable: "--color-green-700" },
            { name: "800", variable: "--color-green-800" },
            { name: "900", variable: "--color-green-900" },
          ]}
        />

        <ColorGroup
          title="Metallic Seaweed Palette"
          colors={[
            { name: "50", variable: "--color-metallicSeaweed-50" },
            { name: "100", variable: "--color-metallicSeaweed-100" },
            { name: "200", variable: "--color-metallicSeaweed-200" },
            { name: "300", variable: "--color-metallicSeaweed-300" },
            { name: "400", variable: "--color-metallicSeaweed-400" },
            { name: "500", variable: "--color-metallicSeaweed-500" },
            { name: "600", variable: "--color-metallicSeaweed-600" },
            { name: "700", variable: "--color-metallicSeaweed-700" },
            { name: "800", variable: "--color-metallicSeaweed-800" },
            { name: "900", variable: "--color-metallicSeaweed-900" },
          ]}
        />

        <ColorGroup
          title="Solar Orange Palette"
          colors={[
            { name: "50", variable: "--color-solarOrange-50" },
            { name: "100", variable: "--color-solarOrange-100" },
            { name: "200", variable: "--color-solarOrange-200" },
            { name: "300", variable: "--color-solarOrange-300" },
            { name: "400", variable: "--color-solarOrange-400" },
            { name: "500", variable: "--color-solarOrange-500" },
            { name: "600", variable: "--color-solarOrange-600" },
            { name: "700", variable: "--color-solarOrange-700" },
            { name: "800", variable: "--color-solarOrange-800" },
            { name: "900", variable: "--color-solarOrange-900" },
          ]}
        />

        <ColorGroup
          title="Chart Colors"
          colors={[
            { name: "Bordo", variable: "--color-chart-bordo" },
            { name: "Red", variable: "--color-chart-red" },
            { name: "Orange", variable: "--color-chart-orange" },
            { name: "Yellow", variable: "--color-chart-yellow" },
            { name: "Green", variable: "--color-chart-green" },
            { name: "Blue", variable: "--color-chart-blue" },
            { name: "Indigo", variable: "--color-chart-indigo" },
            { name: "Purple", variable: "--color-chart-purple" },
            { name: "Violet", variable: "--color-chart-violet" },
            { name: "Pink", variable: "--color-chart-pink" },
          ]}
        />

        <ColorGroup
          title="Functional Colors"
          colors={[
            { name: "Input Default", variable: "--color-input-default" },
          ]}
        />
      </div>
    )
  },
}
