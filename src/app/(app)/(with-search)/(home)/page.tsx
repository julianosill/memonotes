import Image from 'next/image'

import emptyImage from '@/assets/empty.png'
import { NoteList } from '@/components/note/note-list'
import { TextLink } from '@/components/text-link'
import { api } from '@/data/api'
import { INote } from '@/data/types/note'

async function fetchNotes(): Promise<INote[] | null> {
  const response = await api('/notes', {
    next: {
      revalidate: 60 * 60, // 1h
    },
  })
  const notes = await response.json()
  return notes
}

export default async function HomePage() {
  const notes = await fetchNotes()

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
            <TextLink href="/add">clicando aqui</TextLink>. ou no botão ao lado.
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
