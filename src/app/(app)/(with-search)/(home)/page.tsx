/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useStore } from '@/app/store'
import emptyImage from '@/assets/empty.png'
import { NoteCard } from '@/components/note-card'

export default function Home() {
  const { notes } = useStore((store) => {
    return { notes: store.notes }
  })

  return (
    <main className="flex flex-1 flex-col items-start gap-6">
      {notes && notes.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </section>
      ) : (
        <section className="flex w-full flex-1 flex-col items-center justify-center pb-12 text-center">
          <p className="pb-4 pt-6 text-lg font-medium text-strong">
            Sua lista de notas está vazia
          </p>
          <p className="text-sm">
            Adicione sua primera nota{' '}
            <Link
              href="/add"
              className="font-medium text-strong underline underline-offset-2 hover:text-accent-foreground"
            >
              clicando aqui
            </Link>{' '}
            ou no botão ao lado.
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
