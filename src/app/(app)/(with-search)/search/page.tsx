'use client'

import { SearchX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

import { INote, useStore } from '@/app/store'
import emptyImage from '@/assets/empty.png'
import { BackButton } from '@/components/back-button'
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
    <main className="flex flex-1 flex-col items-start gap-6">
      <BackButton />

      {notes && notes.length > 0 ? (
        <section className="space-y-8">
          <p className="text-sm">
            Exibindo resultados para:{' '}
            <span className="font-medium text-strong">{query}</span>
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </section>
      ) : (
        <section className="flex w-full flex-1 flex-col items-center justify-center pb-12 text-center">
          <div className="w-fit rounded-md bg-card p-2 text-muted-foreground">
            <SearchX className="size-8" />
          </div>
          <p className="pb-4 pt-6 text-lg">
            Não há notas salvas contendo a palavra{' '}
            <span className="font-medium text-strong">{query}</span>
          </p>
          <p className="text-sm">
            Faça uma nova busca ou acesse a{' '}
            <Link
              href="/"
              className="font-medium text-strong underline underline-offset-2 hover:text-accent-foreground"
            >
              página inicial
            </Link>
            .
          </p>
          <Image
            src={emptyImage}
            width={480}
            height={440}
            quality={90}
            priority
            className="mt-12 w-10/12 max-w-[480px]"
            alt="Gato com um cabo de energia arrebentado na boca atrás de um notebook exibindo um ícone de vazio (círculo riscado) em sua tela"
          />
        </section>
      )}
    </main>
  )
}
