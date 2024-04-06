'use client'

import { AboutDialog } from '@/components/about-dialog'
import { Dialog } from '@/components/dialog'

export function AboutProject() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded text-sm font-medium underline underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-foreground">
        Sobre o projeto
      </Dialog.Trigger>
      <AboutDialog />
    </Dialog.Root>
  )
}
