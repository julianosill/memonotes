'use client'

import {
  Info,
  Moon,
  Settings as SettingsIcon,
  Sun,
  SunMoon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Dialog } from '@/components/dialog'
import { DropdownMenu } from '@/components/dropdown-menu'

import { Button } from '../../ui/button'
import { AboutContent } from './about-content'
import { SettingsItem } from './settings-item'

export function Settings() {
  const { theme, setTheme } = useTheme()
  const dropdownTriggerRef = useRef(null)

  return (
    <Dialog.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild ref={dropdownTriggerRef}>
          <Button
            className={twMerge(
              'group h-fit w-fit p-2',
              'bg-memonotes-500 text-memonotes-200',
              'hover:bg-memonotes-700 hover:text-memonotes-100',
              'dark:bg-memonotes-800 dark:text-memonotes-400 dark:hover:bg-memonotes-950',
            )}
            aria-label="Configurações"
          >
            <SettingsIcon className="size-6 group-hover:animate-revolve md:size-5" />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Alterar tema</DropdownMenu.Label>

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

          <DropdownMenu.Separator className="h-px bg-border-soft" />

          <Dialog.Trigger asChild>
            <SettingsItem>
              <Info className="size-4" /> Sobre
            </SettingsItem>
          </Dialog.Trigger>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <AboutContent trigger={dropdownTriggerRef} />
    </Dialog.Root>
  )
}
