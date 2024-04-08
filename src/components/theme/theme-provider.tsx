'use client'

import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')

    if (localTheme) {
      setTheme(localTheme)
    }
  }, [setTheme, theme])

  return (
    <NextThemeProvider attribute="class" defaultTheme="system">
      {children}
    </NextThemeProvider>
  )
}
