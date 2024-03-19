import { INote } from '@/app/store'

import { NoteCard } from './note-card'

interface NoteListProps {
  notes: INote[]
}

export function NoteList({ notes }: NoteListProps) {
  return (
    <section className="grid-cols-notes sm:grid-cols-sm-notes xl:grid-cols-xl-notes 2xl:grid-cols-2xl-notes grid gap-4 lg:gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  )
}
