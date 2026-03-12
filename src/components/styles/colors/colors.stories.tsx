import type { Meta, StoryObj } from '@storybook/react'

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
  render: () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-text-primary">Color Palette</h1>
        <p className="text-text-secondary text-lg">
          The following colors are defined in <code>theme.css</code> and drive the visual identity of the design system.
          Toggle the Storybook theme to see the Dark Mode overrides.
        </p>
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
        title="Semantic: Error" 
        colors={[
          { name: 'Main', variable: '--color-error-main' },
          { name: 'Subtle', variable: '--color-error-subtle' },
          { name: 'Bold', variable: '--color-error-bold' },
          { name: 'Deep', variable: '--color-error-deep' },
          { name: 'Hover', variable: '--color-error-hover' },
          { name: 'Selected', variable: '--color-error-selected' },
          { name: 'Disabled', variable: '--color-error-disabled' },
          { name: 'Outline', variable: '--color-error-outline' },
        ]} 
      />

      <ColorGroup 
        title="Semantic: Warning, Success, Info" 
        colors={[
          { name: 'Warning Main', variable: '--color-warning-main' },
          { name: 'Warning Subtle', variable: '--color-warning-subtle' },
          { name: 'Warning Bold', variable: '--color-warning-bold' },
          { name: 'Warning Deep', variable: '--color-warning-deep' },
          { name: 'Success Main', variable: '--color-success-main' },
          { name: 'Success Subtle', variable: '--color-success-subtle' },
          { name: 'Success Bold', variable: '--color-success-bold' },
          { name: 'Success Deep', variable: '--color-success-deep' },
          { name: 'Info Main', variable: '--color-info-main' },
          { name: 'Info Subtle', variable: '--color-info-subtle' },
          { name: 'Info Bold', variable: '--color-info-bold' },
          { name: 'Info Deep', variable: '--color-info-deep' },
        ]} 
      />

      <ColorGroup 
        title="Accent Palettes" 
        colors={[
          { name: 'Accent Primary Main', variable: '--color-accent-primary-main' },
          { name: 'Accent Primary Subtle', variable: '--color-accent-primary-subtle' },
          { name: 'Accent Primary Bold', variable: '--color-accent-primary-bold' },
          { name: 'Accent Primary Deep', variable: '--color-accent-primary-deep' },
          { name: 'Accent Secondary Main', variable: '--color-accent-secondary-main' },
          { name: 'Accent Secondary Subtle', variable: '--color-accent-secondary-subtle' },
          { name: 'Accent Secondary Bold', variable: '--color-accent-secondary-bold' },
          { name: 'Accent Secondary Deep', variable: '--color-accent-secondary-deep' },
        ]} 
      />

      <ColorGroup 
        title="Neutral: Surface" 
        colors={[
          { name: 'Surface 1 (Base)', variable: '--color-surface-1' },
          { name: 'Surface 2', variable: '--color-surface-2' },
          { name: 'Surface 3', variable: '--color-surface-3' },
          { name: 'Surface 4', variable: '--color-surface-4' },
          { name: 'Surface 5', variable: '--color-surface-5' },
          { name: 'Surface 6', variable: '--color-surface-6' },
          { name: 'Surface Deep', variable: '--color-surface-deep' },
        ]} 
      />

      <ColorGroup 
        title="Neutral: Outline & Action" 
        colors={[
          { name: 'Outline 1', variable: '--color-outline-1' },
          { name: 'Outline 2', variable: '--color-outline-2' },
          { name: 'Outline 3', variable: '--color-outline-3' },
          { name: 'Action Hover', variable: '--color-action-hover' },
          { name: 'Action Selected', variable: '--color-action-selected' },
          { name: 'Action Disabled', variable: '--color-action-disabled' },
          { name: 'Backdrop', variable: '--color-backdrop' },
        ]} 
      />

      <ColorGroup 
        title="Neutral: Text" 
        colors={[
          { name: 'Text Primary', variable: '--color-text-primary' },
          { name: 'Text Secondary', variable: '--color-text-secondary' },
          { name: 'Text Disabled', variable: '--color-text-disabled' },
          { name: 'Text Placeholder', variable: '--color-text-placeholder' },
        ]} 
      />

      <ColorGroup 
        title="Shadows" 
        colors={[
          { name: 'Key Color', variable: '--shadow-key-color' },
          { name: 'Ambient Color', variable: '--shadow-ambient-color' },
          { name: 'Light 1', variable: '--color-shadow-light-1' },
          { name: 'Light 2', variable: '--color-shadow-light-2' },
          { name: 'Ambient 2', variable: '--color-shadow-ambient-2' },
        ]} 
      />

      <ColorGroup 
        title="Input" 
        colors={[
          { name: 'Default', variable: '--color-input-default' },
        ]} 
      />
    </div>
  ),
}
