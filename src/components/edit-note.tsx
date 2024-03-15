'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { NotebookPen, X } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { INote } from '@/app/store'

import { NoteForm } from './note-form'
import { Tooltip } from './tooltip'
import { Button } from './ui/button'

interface EditNoteProps {
  note: INote
}

export function EditNote({ note }: EditNoteProps) {
  const [open, setOpen] = useState(false)

  function closeDialog() {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Dialog.Trigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-fit p-2 text-muted-foreground"
            >
              <NotebookPen className="size-5" />
              <span className="sr-only">Editar nota</span>
            </Button>
          </Dialog.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content>Editar nota</Tooltip.Content>
      </Tooltip.Root>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-memonotes-950/90 backdrop-blur-sm dark:bg-zinc-950/90" />
        <Dialog.Content
          className={twMerge(
            'fixed inset-0 flex w-full flex-col gap-8 overflow-y-auto bg-card p-8',
            'sm:p-12',
            'md:inset-auto md:left-1/2 md:top-1/2 md:h-[960px] md:max-h-[90vh] md:max-w-[720px] md:-translate-x-1/2 md:-translate-y-1/2',
            'md:rounded-xl md:border md:border-border-soft md:shadow-md',
          )}
        >
          <header className="flex flex-col justify-between gap-8 sm:flex-row">
            <Dialog.Title className="text-xl font-medium text-strong">
              Editar nota
            </Dialog.Title>
            <VisuallyHidden.Root>
              <Dialog.Description>
                Edite conteúdo da sua nota através dos campos abaixo.
              </Dialog.Description>
            </VisuallyHidden.Root>
          </header>

          <NoteForm note={note} closeDialog={closeDialog} />

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
