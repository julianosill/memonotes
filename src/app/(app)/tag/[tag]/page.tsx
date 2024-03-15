'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

import { INote, useStore } from '@/app/store'
import { BackButton } from '@/components/back-button'
import { NoteCard } from '@/components/note-card'

interface TagsProps {
  params: {
    tag: string
  }
}

export default function Tags({ params }: TagsProps) {
  const { tag } = params
  if (!tag) redirect('/')

  const [notes, setNotes] = useState<INote[] | null>(null)

  const { notes: storedNotes } = useStore((store) => {
    return { notes: store.notes }
  })

  useEffect(() => {
    const filteredNotes = storedNotes?.filter((note) => {
      return note.tags.includes(tag)
    })

    if (!filteredNotes) return setNotes(null)

    setNotes(filteredNotes)
  }, [tag, storedNotes])

  return (
    <main>
      <header className="mb-8 space-y-6 border-b border-border-soft pb-2">
        <BackButton />
        <p className="text-sm">
          Exibindo notas contendo a tag:{' '}
          <span className="font-medium text-strong">{tag}</span>
        </p>
      </header>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {notes?.map((note) => <NoteCard key={note.id} note={note} />)}
      </section>
    </main>
  )
}
