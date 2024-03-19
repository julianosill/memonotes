'use client'

import Image from 'next/image'

import { useStore } from '@/app/store'
import emptyImage from '@/assets/empty.png'
import { ExternalLink } from '@/components/external-link'
import { NoteList } from '@/components/note/note-list'

export default function Home() {
  const { notes } = useStore((store) => {
    return { notes: store.notes }
  })

  return (
    <main className="flex flex-1 flex-col">
      {notes && notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
          <p className="pb-4 pt-6 text-lg font-medium text-strong">
            Sua lista de notas está vazia
          </p>
          <p className="text-sm">
            Adicione sua primera nota{' '}
            <ExternalLink href="/add">clicando aqui</ExternalLink>. ou no botão
            ao lado.
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
