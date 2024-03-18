'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Moon, Settings as SettingsIcon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { twMerge } from 'tailwind-merge'

import { Button } from '../../ui/button'
import { SettingsItem } from './settings-button'

export function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          className={twMerge(
            'group h-fit p-2',
            'bg-memonotes-500 text-memonotes-200',
            'hover:bg-memonotes-700 hover:text-memonotes-100',
            'dark:bg-memonotes-800 dark:text-memonotes-400 dark:hover:bg-memonotes-950',
          )}
          aria-label="Configurações"
        >
          <SettingsIcon className="group-hover:animate-revolve" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          side="top"
          className="space-y-4 rounded-md bg-background p-6 shadow-lg ring-1 ring-border-soft"
        >
          <DropdownMenu.Group className="space-y-1">
            <DropdownMenu.Label className="pb-1 text-sm font-semibold">
              Alterar tema
            </DropdownMenu.Label>

            {theme !== 'light' && (
              <SettingsItem onClick={() => setTheme('light')}>
                <Sun className="size-4" /> Claro
              </SettingsItem>
            )}

            {theme !== 'dark' && (
              <SettingsItem onClick={() => setTheme('dark')}>
                <Moon className="size-4" /> Escuro
              </SettingsItem>
            )}

            <SettingsItem
              onClick={() => setTheme('system')}
              disabled={theme === 'system'}
            >
              <SunMoon className="size-4" /> Sistema
            </SettingsItem>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
