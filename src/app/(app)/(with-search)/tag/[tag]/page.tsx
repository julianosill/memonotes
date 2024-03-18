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
    <main className="flex flex-1 flex-col items-start gap-6">
      <BackButton />

      {notes && notes.length > 0 ? (
        <section className="space-y-8">
          <p className="border-b border-border-soft pb-2 text-sm">
            Exibindo notas contendo a tag:{' '}
            <span className="font-medium text-strong">{tag}</span>
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
            Não há notas salvas com a tag{' '}
            <span className="font-medium text-strong">{tag}</span>
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
