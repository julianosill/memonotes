/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ArrowLeft, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { INote, useStore } from '@/app/store'
import { EditNote } from '@/components/edit-note'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/format-date'

interface NoteDetailsProps {
  params: {
    id: string
  }
}

export default function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = params
  const { getNote } = useStore((store) => {
    return { getNote: store.getNote }
  })
  const [note, setNote] = useState<INote | null>(null)

  const router = useRouter()

  useEffect(() => {
    const data = getNote(id)
    setNote(data)
  }, [])

  if (!note) return null

  return (
    <main className="flex-1 rounded-xl bg-card p-12 shadow transition-shadow hover:shadow-md dark:border dark:border-border-soft">
      <div className="flex items-start justify-between">
        <Button
          onClick={router.back}
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
        <section className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-fit p-2 text-muted-foreground"
          >
            <Trash2 className="size-5" />
            <span className="sr-only">Excluir</span>
          </Button>
          <EditNote note={note} />
        </section>
      </div>

      <h2 className="py-8 text-2xl font-semibold text-strong">{note.title}</h2>

      <p className="leading-relaxed text-card-foreground">{note.content}</p>

      <footer className="mt-12 flex gap-12 border-t border-border-soft pt-6">
        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
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
          <div className="flex flex-1 flex-col gap-3 text-sm">
            <h3 className="font-medium text-muted-foreground">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {note.tags.map((tag) => {
                return (
                  <Button
                    key={tag}
                    onClick={() => router.push(`/tag/${tag}`)}
                    variant="muted"
                    size="xs"
                  >
                    {tag}
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
