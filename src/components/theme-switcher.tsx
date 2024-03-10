'use client'

import { SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md bg-border p-2 text-accent hover:text-white"
    >
      <SunMoon className="size-5" />
    </button>
  )
}
