'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Menu, NotebookText, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { LogoMemonotes } from '../logo/memonotes'
import { AddNoteButton } from './add-note-button'
import { NavItem } from './nav-item'
import { Settings } from './settings'

interface SidebarProps {
  tags: string[]
}

export function Sidebar({ tags }: SidebarProps) {
  const [open, setOpen] = useState(false)

  function handleCloseMenu() {
    setOpen(false)
  }

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={twMerge(
        'bg-memonotes-600 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-memonotes-400 dark:bg-memonotes-900 dark:scrollbar-thumb-memonotes-600',
        'fixed z-10 flex flex-col overflow-y-auto transition-all duration-300 ease-out',
        'inset-0 h-12 w-full px-6 data-[state=open]:h-screen',
        'md:inset-auto md:w-[14rem] md:rounded-2xl md:p-10 md:data-[state=closed]:h-[calc(100vh-96px)] md:data-[state=open]:h-[calc(100vh-96px)]',
      )}
    >
      <div className="flex items-center justify-between py-3">
        <Link href="/">
          <LogoMemonotes className="h-fit w-full max-w-[112px] fill-primary-foreground hover:fill-white md:max-w-full" />
        </Link>
        <Collapsible.Trigger className="text-white md:hidden">
          {open ? (
            <>
              <X className="size-6" />
              <span className="sr-only">Fechar menu</span>
            </>
          ) : (
            <>
              <Menu className="size-6" />
              <span className="sr-only">Abrir menu</span>
            </>
          )}
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className={twMerge(
          'flex flex-1 flex-col py-6',
          'data-[state=closed]:hidden md:pb-0 md:pt-8 md:data-[state=closed]:flex',
        )}
      >
        <div className="flex flex-1 flex-col gap-6 pb-12 md:pb-10">
          <nav>
            <NavItem href="/" onClick={handleCloseMenu} icon={<NotebookText />}>
              Notas
            </NavItem>
          </nav>

          <section className="w-full border-y border-memonotes-500 py-6 dark:border-memonotes-800">
            <AddNoteButton onNavigation={handleCloseMenu} to="/add" />
          </section>

          {tags && (
            <section className="flex flex-1 flex-col gap-6 md:gap-4">
              <span className="text-base font-semibold text-memonotes-300 dark:text-memonotes-400 md:text-sm">
                Tags
              </span>

              <div className="flex flex-col gap-4 md:gap-3">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    onClick={handleCloseMenu}
                    href={`/tag/${tag}`}
                    className="text-base font-medium text-zinc-200 hover:text-white dark:text-zinc-300 dark:hover:text-white md:text-sm"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <Settings />
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
