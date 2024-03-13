/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

import { useStore } from '@/app/store'
import { NoteCard } from '@/components/note-card'

export default function Home() {
  const { notes, fetchNotes } = useStore((store) => {
    return { notes: store.notes, fetchNotes: store.fetchNotes }
  })

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <main>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {notes?.map((note) => <NoteCard key={note.id} note={note} />)}
      </section>
    </main>
  )
}
