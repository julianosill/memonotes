'use client'

import * as Switch from '@radix-ui/react-switch'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ForwardedRef, forwardRef } from 'react'

import { cn } from '@/utils/class-name-merge'

export const ThemeSwitcher = forwardRef(
  (
    { className, ...props }: Switch.SwitchProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    const { theme, setTheme } = useTheme()

    const isDarkSytem =
      theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkTheme = theme === 'dark' || isDarkSytem

    function handleToggleTheme() {
      isDarkTheme ? setTheme('light') : setTheme('dark')
    }

    return (
      <Switch.Root
        ref={forwardedRef}
        checked={isDarkTheme}
        onCheckedChange={handleToggleTheme}
        title="Alterar tema"
        className={cn(
          'relative flex items-center rounded-full border border-zinc-200 bg-zinc-200/50 outline-none transition-colors',
          'dark:border-zinc-800 dark:bg-zinc-900/50',
          'focus-visible:outline-1 focus-visible:outline-zinc-200 dark:focus-visible:outline-zinc-700',

          className,
        )}
        {...props}
      >
        <Switch.Thumb className="absolute size-5 rounded-full bg-zinc-50 transition-all ease-in-out data-[state=checked]:translate-x-[100%] dark:bg-zinc-600" />
        <Sun className="relative m-1 size-3 text-zinc-500 dark:text-zinc-600" />
        <Moon className="relative m-1 size-3 text-zinc-400 " />
      </Switch.Root>
    )
  },
)

ThemeSwitcher.displayName = 'ThemeSwitcher'
