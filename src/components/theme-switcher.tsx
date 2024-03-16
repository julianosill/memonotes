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
      className="rounded-md bg-memonotes-700 p-2 text-memonotes-200 hover:text-white dark:bg-memonotes-800"
    >
      <SunMoon className="size-5" />
    </button>
  )
}
