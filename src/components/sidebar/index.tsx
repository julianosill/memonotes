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
import { Tags } from './tags'

export function Sidebar() {
  const [open, setOpen] = useState(false)

  function handleCloseMenu() {
    setOpen(false)
  }

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={twMerge(
        'flex flex-col bg-memonotes-600 dark:bg-memonotes-900',
        'fixed left-0 top-0 z-10 w-full overflow-y-auto px-6 py-1 data-[state=open]:bottom-0',
        'md:bottom-12 md:left-12 md:top-12 md:w-[16rem] md:rounded-2xl md:p-10 md:data-[state=open]:bottom-12',
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-memonotes-400 dark:scrollbar-thumb-memonotes-600',
      )}
    >
      <div className="flex items-center justify-between py-3">
        <Link href="/">
          <LogoMemonotes className="h-fit w-full max-w-[112px] fill-primary-foreground hover:fill-white md:max-w-full" />
        </Link>
        <Collapsible.Trigger className="md:hidden">
          {open ? (
            <>
              <X className="size-6 text-accent-foreground" />
              <span className="sr-only">Fechar menu</span>
            </>
          ) : (
            <>
              <Menu className="size-6 text-accent-foreground" />
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
          <Tags onNavigation={handleCloseMenu} />
        </div>

        <Settings />
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
