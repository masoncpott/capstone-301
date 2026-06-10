import { useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { ColorModeContext } from './themeContext'

type ColorMode = 'light' | 'dark'

const STORAGE_KEY = 'streamscope-color-mode'

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' ? 'light' : 'dark'
  })

  const toggleMode = () => {
    setMode((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#0c0b0e',
                  paper: '#141318',
                },
                primary: { main: '#3BBDB5' },
                secondary: { main: '#F4527F' },
              }
            : {
                background: {
                  default: '#f4f4f6',
                  paper: '#ffffff',
                },
                primary: { main: '#1d857f' },
                secondary: { main: '#F12B87' },
              }),
        },
        typography: {
          fontFamily: 'Sora, "Segoe UI", sans-serif',
          h4: { fontWeight: 700 },
          h6: { fontWeight: 600 },
        },
        shape: { borderRadius: 14 },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
