'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { createContext, ReactNode, useContext, useState } from 'react'

import { cn } from '@/utils/class-name-merge'

import { SidebarContent } from './content'
import { SidebarTrigger } from './trigger'

interface SidebarContentProps {
  children: ReactNode
}

interface SidebarContextType {
  open: boolean
  onNavigation: () => void
}

const SidebarContext = createContext({} as SidebarContextType)

export function Sidebar({ children }: SidebarContentProps) {
  const [open, setOpen] = useState(false)

  function closeMenu() {
    setOpen(false)
  }

  const scrollBarClasses =
    'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-memonotes-400 dark:scrollbar-thumb-memonotes-600'

  return (
    <SidebarContext.Provider value={{ open, onNavigation: closeMenu }}>
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className={cn(
          scrollBarClasses,
          'bg-memonotes-600 dark:bg-memonotes-900',
          'fixed inset-0 z-10 flex h-12 w-full flex-col overflow-y-auto px-6',
          'transition-all duration-300 ease-out data-[state=open]:h-screen',
          'md:inset-auto md:w-[14rem] md:rounded-2xl',
          'md:p-10 md:data-[state=closed]:h-[calc(100vh-6rem)] md:data-[state=open]:h-[calc(100vh-6rem)]',
        )}
      >
        <SidebarTrigger />
        <SidebarContent>{children}</SidebarContent>
      </Collapsible.Root>
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
