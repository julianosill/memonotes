import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getNote } from '@/api/get-note'
import { BackButton } from '@/components/back-button'
import { NoteForm } from '@/components/note-form'

interface EditNoteProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Editar nota',
}

export default async function EditNotePage({ params }: EditNoteProps) {
  const { id } = params
  if (!id) redirect('/')

  const note = await getNote({ userId: 'userTest', noteId: id }).catch(() => {
    redirect('/')
  })

  return (
    <main className="flex flex-1 flex-col gap-6 rounded-2xl bg-card p-6 shadow-md dark:border dark:border-border-soft md:p-8 lg:gap-8 lg:p-10">
      <BackButton className="self-start" />

      <h1 className="text-xl font-medium text-strong">Editar nota</h1>

      <NoteForm note={note} />
    </main>
  )
}
