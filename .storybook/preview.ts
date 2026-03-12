import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '../src/hooks/use-theme'
import React from 'react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      React.createElement(ThemeProvider, { defaultTheme: "light", children: React.createElement("div", { className: "p-8 min-h-[200px] bg-background text-foreground" }, React.createElement(Story)) })
    ),
  ],
};

export default preview;