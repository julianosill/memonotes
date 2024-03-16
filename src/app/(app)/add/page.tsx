import { BackButton } from '@/components/back-button'
import { NoteForm } from '@/components/note-form'

export default function AddNote() {
  return (
    <main className="flex flex-1 flex-col gap-8 rounded-2xl bg-card p-12 shadow-md dark:border dark:border-border-soft">
      <BackButton className="self-start" />
      <header>
        <h1 className="text-xl font-medium text-strong">Adicionar nota</h1>
      </header>
      <NoteForm />
    </main>
  )
}
