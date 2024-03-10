'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeColorProviderProps {
  children: ReactNode
}

export function ThemeColorProvider({ children }: ThemeColorProviderProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
