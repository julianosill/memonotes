'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

import { INote, useStore } from '@/app/store'
import { NoteCard } from '@/components/note-card'

interface SearchProps {
  searchParams: {
    q: string
  }
}

export default function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams
  if (!query) redirect('/')

  const [notes, setNotes] = useState<INote[] | null>(null)

  const { notes: storedNotes } = useStore((store) => {
    return { notes: store.notes }
  })

  useEffect(() => {
    const filteredNotes = storedNotes?.filter((note) => {
      return (
        note.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        note.content.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    })

    if (!filteredNotes) return setNotes(null)

    setNotes(filteredNotes)
  }, [query, storedNotes])

  return (
    <main>
      <header className="mb-8 border-b border-border-soft pb-2">
        <p className="text-sm">
          Exibindo resultados para:{' '}
          <span className="font-medium text-strong">{query}</span>
        </p>
      </header>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {notes?.map((note) => <NoteCard key={note.id} note={note} />)}
      </section>
    </main>
  )
}
