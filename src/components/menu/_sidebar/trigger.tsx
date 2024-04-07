'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

import { LogoMemonotes } from '@/components/logo/memonotes'

import { useSidebar } from '.'

export function SidebarTrigger() {
  const { open, onNavigation } = useSidebar()

  return (
    <div className="flex items-center justify-between py-3">
      <Link href="/" onClick={onNavigation}>
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
  )
}
