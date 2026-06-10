import { createContext, useContext } from 'react'

type ColorMode = 'light' | 'dark'

export interface ColorModeContextValue {
  mode: ColorMode
  toggleMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined)

export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error('useColorMode must be used within AppThemeProvider')
  }

  return context
}
