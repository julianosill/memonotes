import { useAutoAnimate } from '@formkit/auto-animate/react'

import { INote } from '@/app/store'

import { NoteCard } from './note-card'

interface NoteListProps {
  notes: INote[]
}

export function NoteList({ notes }: NoteListProps) {
  const [parent] = useAutoAnimate({ duration: 300, easing: 'ease-in-out' })

  return (
    <section
      ref={parent}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  )
}
