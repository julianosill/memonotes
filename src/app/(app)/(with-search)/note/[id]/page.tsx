import parse from 'html-react-parser'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getNote } from '@/api/get-note'
import { BackButton } from '@/components/back-button'
import { DeleteNote } from '@/components/delete-note'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/format-date'

import { EditNoteButton } from './_components/edit-note-button'

interface NotePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const note = await getNote(params.id)

  return { title: note.title }
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = params
  if (!id) redirect('/')

  const note = await getNote(id).catch(() => {
    redirect('/')
  })

  return (
    <main className="flex flex-1 flex-col rounded-2xl bg-card p-8 shadow-md dark:border dark:border-border-soft md:p-12">
      <div className="flex items-start justify-between">
        <BackButton />

        <section className="flex justify-end gap-2">
          <DeleteNote id={note.id} title={note.title} />
          <EditNoteButton id={note.id} />
        </section>
      </div>

      <h2 className="py-8 text-2xl font-semibold text-strong">{note.title}</h2>

      <div
        className={cn(
          'prose max-w-full flex-1',
          'prose-headings:mb-4 prose-headings:mt-10 prose-headings:font-semibold',
          'prose-p:mb-3 prose-p:mt-0 prose-p:leading-relaxed',
          'prose-strong:font-semibold',
        )}
      >
        {parse(note.content)}
      </div>

      <footer className="mt-12 flex gap-6 border-t border-border-soft pt-6 max-lg:flex-col lg:gap-12">
        <div className="flex flex-col gap-4 text-sm text-muted-foreground max-lg:order-2">
          {note.updatedAt && (
            <div>
              <h3 className="mb-1 font-medium">Atualizada em</h3>
              <span>
                {formatDate({ date: note.updatedAt, withTime: true })}
              </span>
            </div>
          )}

          <div>
            <h3 className="mb-1 font-medium">Criada em</h3>
            <span>
              {note.createdAt &&
                formatDate({ date: note.createdAt, withTime: true })}
            </span>
          </div>
        </div>
        {note.tags.length > 0 && (
          <div className="flex flex-1 flex-col gap-3 text-sm max-lg:order-1">
            <h3 className="font-medium text-muted-foreground">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {note.tags.map((tag: string) => {
                return (
                  <Button key={tag} variant="muted" size="xs" asChild>
                    <Link key={tag} href={`/tag/${tag}`}>
                      {tag}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </footer>
    </main>
  )
}
