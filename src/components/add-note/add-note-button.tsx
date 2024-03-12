'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { AddNoteCard } from './add-note-card'

export function AddNoteButton() {
  const [open, setOpen] = useState(false)

  function closeDialog() {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="group bg-memonotes-500 text-sm dark:bg-memonotes-800 dark:hover:bg-memonotes-700 dark:hover:text-white">
          <CirclePlus className="size-4 text-memonotes-300 transition-colors group-hover:text-primary dark:group-hover:text-white" />
          Adicionar nota
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-zinc-950/90" />
        <AddNoteCard closeDialog={closeDialog} />
      </Dialog.Portal>
    </Dialog.Root>
  )
}
