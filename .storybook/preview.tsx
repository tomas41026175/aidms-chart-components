import type { Preview } from '@storybook/react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import React from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#09090b', paper: '#111113' },
    primary: { main: '#a78bfa' },
  },
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div style={{ padding: 24, background: '#09090b', minHeight: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
}

export default preview
