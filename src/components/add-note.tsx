'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { CirclePlus, X } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { NoteForm } from './note-form'
import { Button } from './ui/button'

export function AddNote() {
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
        <Dialog.Content
          className={twMerge(
            'fixed inset-0 flex w-full flex-col gap-8 overflow-y-auto bg-card p-8',
            'sm:p-12',
            'md:inset-auto md:left-1/2 md:top-1/2 md:h-[720px] md:max-h-[80vh] md:max-w-[720px] md:-translate-x-1/2 md:-translate-y-1/2',
            'md:rounded-xl md:border md:border-border-soft md:shadow-md',
          )}
        >
          <header className="flex flex-col justify-between gap-8 sm:flex-row">
            <Dialog.Title className="text-xl font-medium text-strong">
              Adicionar nota
            </Dialog.Title>
            <VisuallyHidden.Root>
              <Dialog.Description>
                Adicione o conteúdo da sua nota ou inicie a gravação para
                transcrever a sua fala.
              </Dialog.Description>
            </VisuallyHidden.Root>
          </header>

          <NoteForm closeDialog={closeDialog} />

          <Dialog.Close asChild>
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-8 top-8 size-8 p-0 text-muted-foreground sm:right-4 sm:top-4"
            >
              <X className="size-6 sm:size-5" />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
