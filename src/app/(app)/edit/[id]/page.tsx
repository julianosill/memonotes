'use client'

import { useEffect, useState } from 'react'

import { INote, useStore } from '@/app/store'
import { BackButton } from '@/components/back-button'
import { NoteForm } from '@/components/note-form'

interface EditNoteProps {
  params: {
    id: string
  }
}

export default function EditNote({ params }: EditNoteProps) {
  const { id } = params
  const { getNote } = useStore((store) => {
    return { getNote: store.getNote }
  })
  const [note, setNote] = useState<INote | null>(null)

  useEffect(() => {
    const data = getNote(id)
    setNote(data)
  }, [id, getNote])

  if (!note) return null

  return (
    <main className="flex flex-1 flex-col gap-6 rounded-2xl bg-card p-6 shadow-md dark:border dark:border-border-soft md:p-8 lg:gap-8 lg:p-10">
      <BackButton className="self-start" />
      <header>
        <h1 className="text-xl font-medium text-strong">Editar nota</h1>
      </header>
      <NoteForm note={note} />
    </main>
  )
}
