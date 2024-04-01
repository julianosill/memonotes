import { Metadata } from 'next'
import Link from 'next/link'

import { BackButton } from '@/components/back-button'
import { DeleteNote } from '@/components/delete-note'
import { EditNoteButton } from '@/components/edit-note-button'
import { ParsedContent } from '@/components/parse-content'
import { Button } from '@/components/ui/button'
import { api } from '@/data/api'
import { INote } from '@/data/types/note'
import { formatDate } from '@/utils/format-date'

interface NoteProps {
  params: {
    id: string
  }
}

async function getNote(id: string): Promise<INote> {
  const response = await api(`/notes/${id}`, {
    next: {
      revalidate: 60 * 60, // 1h
    },
  })
  const note = await response.json()
  return note
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const note = await getNote(params.id)

  return { title: note.title }
}

export default async function NotePage({ params }: NoteProps) {
  const note = await getNote(params.id)

  if (!note) return null

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

      <div className="flex-1 leading-relaxed text-card-foreground">
        <ParsedContent text={note.content} />
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
        {note.tags && (
          <div className="flex flex-1 flex-col gap-3 text-sm max-lg:order-1">
            <h3 className="font-medium text-muted-foreground">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {note.tags.map((tag) => {
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
