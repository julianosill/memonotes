'use client'

import { SearchX } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

import { INote, useStore } from '@/app/store'
import emptyImage from '@/assets/empty.png'
import { BackButton } from '@/components/back-button'
import { ExternalLink } from '@/components/external-link'
import { NoteList } from '@/components/note/note-list'

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
    <main className="flex flex-1 flex-col gap-6">
      <BackButton className="self-start" />

      {notes && notes.length > 0 ? (
        <section className="space-y-4 lg:space-y-6">
          <p className="text-sm">
            Exibindo resultados para:{' '}
            <span className="font-medium text-strong">{query}</span>
          </p>
          <NoteList notes={notes} />
        </section>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
          <div className="w-fit rounded-md bg-card p-2 text-muted-foreground">
            <SearchX className="size-6" />
          </div>
          <p className="pb-2 pt-4 text-lg">
            Não há notas salvas contendo a palavra{' '}
            <span className="font-medium text-strong">{query}</span>
          </p>
          <p className="text-sm">
            Faça uma nova busca ou acesse a{' '}
            <ExternalLink href="/">página inicial</ExternalLink>.
          </p>
          <Image
            src={emptyImage}
            width={480}
            height={440}
            quality={90}
            priority
            className="mt-12 w-8/12 max-w-[480px]"
            alt="Gato com um cabo de energia arrebentado na boca atrás de um notebook exibindo um ícone de vazio (círculo riscado) em sua tela"
          />
        </section>
      )}
    </main>
  )
}
