import { Metadata } from 'next'

import { BackButton } from '@/components/back-button'
import { NoteForm } from '@/components/note-form'

export const metadata: Metadata = {
  title: 'Adicionar nota',
}

export default function AddNotePage() {
  return (
    <main className="flex flex-1 flex-col gap-6 rounded-2xl bg-card p-6 shadow-md dark:border dark:border-border-soft md:p-8 lg:gap-8 lg:p-10">
      <BackButton className="self-start" />

      <h1 className="text-xl font-medium text-strong">Adicionar nota</h1>

      <NoteForm />
    </main>
  )
}
