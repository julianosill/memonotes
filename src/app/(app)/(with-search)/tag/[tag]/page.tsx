import { SearchX } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { fetchNotes } from '@/api/fetch-notes'
import emptyImage from '@/assets/empty.png'
import { BackButton } from '@/components/back-button'
import { NoteList } from '@/components/note/note-list'
import { TextLink } from '@/components/ui/text-link'

interface TagsProps {
  params: {
    tag: string
  }
}

export default async function Tags({ params }: TagsProps) {
  const { tag } = params
  if (!tag) redirect('/')

  const notes = await fetchNotes({ tag })

  return (
    <main className="flex flex-1 flex-col gap-6">
      <BackButton className="self-start" />

      {notes && notes.length > 0 ? (
        <section className="space-y-4 lg:space-y-6">
          <p className="text-sm">
            Exibindo notas contendo a tag:{' '}
            <span className="font-medium text-strong">{tag}</span>
          </p>
          <NoteList notes={notes} />
        </section>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
          <div className="w-fit rounded-md bg-card p-2 text-muted-foreground">
            <SearchX className="size-6" />
          </div>
          <p className="pb-2 pt-4 text-lg">
            Não há notas salvas com a tag{' '}
            <span className="font-medium text-strong">{tag}</span>
          </p>
          <p className="text-sm">
            Faça uma nova busca ou acesse a{' '}
            <TextLink href="/">página inicial</TextLink>.
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
