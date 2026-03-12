import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/atoms'
import { useTheme } from '@/hooks'

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
  <div className="flex flex-col gap-2 p-2 rounded-lg border border-outline-1 bg-surface-1 shadow-sm transition-all hover:shadow-md">
    <div
      className="h-16 w-full rounded-md border border-outline-1"
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div className="px-1">
      <p className="text-xs font-bold text-text-primary truncate" title={name}>{name}</p>
      <code className="text-[10px] text-text-secondary select-all">{variable}</code>
    </div>
  </div>
)

const ColorGroup = ({ title, colors }: { title: string; colors: { name: string; variable: string }[] }) => (
  <div className="flex flex-col gap-4 mb-8">
    <h3 className="text-xl font-bold border-b border-outline-1 pb-2 text-text-primary">{title}</h3>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 p-8 rounded-2xl border border-outline-1 bg-surface-2 shadow-sm transition-all">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold text-text-primary">Interactive Palette</h1>
            <p className="text-text-secondary text-lg">
              Toggle the theme to see how colors adapt dynamically across the design system.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-surface-1 p-4 rounded-xl border border-outline-1 shadow-inner">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-widest text-text-disabled">Active Theme</span>
              <span className="text-sm font-black text-primary-main uppercase tracking-tight">{theme}</span>
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
          title="Primary Palette"
          colors={[
            { name: 'Main', variable: '--color-primary-main' },
            { name: 'Subtle', variable: '--color-primary-subtle' },
            { name: 'Bold', variable: '--color-primary-bold' },
            { name: 'Deep', variable: '--color-primary-deep' },
            { name: 'Hover', variable: '--color-primary-hover' },
            { name: 'Selected', variable: '--color-primary-selected' },
            { name: 'Disabled', variable: '--color-primary-disabled' },
            { name: 'Outline', variable: '--color-primary-outline' },
            { name: 'Subtle Hover', variable: '--color-primary-subtle-hover' },
            { name: 'Subtle Selected', variable: '--color-primary-subtle-selected' },
          ]}
        />

        <ColorGroup
          title="Semantic Colors"
          colors={[
            { name: 'Error Main', variable: '--color-error-main' },
            { name: 'Error Bold', variable: '--color-error-bold' },
            { name: 'Warning Main', variable: '--color-warning-main' },
            { name: 'Warning Bold', variable: '--color-warning-bold' },
            { name: 'Success Main', variable: '--color-success-main' },
            { name: 'Success Bold', variable: '--color-success-bold' },
            { name: 'Info Main', variable: '--color-info-main' },
            { name: 'Info Bold', variable: '--color-info-bold' },
          ]}
        />

        <ColorGroup
          title="Neutral: Internal Layout"
          colors={[
            { name: 'Surface 1', variable: '--color-surface-1' },
            { name: 'Surface 2', variable: '--color-surface-2' },
            { name: 'Surface 3', variable: '--color-surface-3' },
            { name: 'Surface Deep', variable: '--color-surface-deep' },
            { name: 'Outline 1', variable: '--color-outline-1' },
            { name: 'Outline 2', variable: '--color-outline-2' },
          ]}
        />

        <ColorGroup
          title="Neutral: Typography"
          colors={[
            { name: 'Text Primary', variable: '--color-text-primary' },
            { name: 'Text Secondary', variable: '--color-text-secondary' },
            { name: 'Text Disabled', variable: '--color-text-disabled' },
          ]}
        />
      </div>
    )
  },
}
