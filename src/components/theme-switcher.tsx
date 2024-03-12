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
      className="bg-memonotes-700 dark:bg-memonotes-800 text-memonotes-200 rounded-md p-2 hover:text-white"
    >
      <SunMoon className="size-5" />
    </button>
  )
}
