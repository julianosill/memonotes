import { Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { INote, useStore } from '@/app/store'
import { formatDate } from '@/utils/format-date'
import { getExcerpt } from '@/utils/get-excerpt'

import { Button } from './ui/button'

interface NoteCardProps {
  note: INote
}

export function NoteCard({ note }: NoteCardProps) {
  const { isLoading, deleteNote } = useStore((store) => {
    return { isLoading: store.isLoading, deleteNote: store.deleteNote }
  })

  const router = useRouter()

  async function handleDeleteNote() {
    await deleteNote(note.id).then(() => {
      toast.success('Nota deletada com sucesso!')
    })
  }

  return (
    <div className="group relative flex flex-col rounded-xl bg-card p-8 shadow transition-shadow hover:shadow-md dark:border dark:border-border-soft">
      <Button
        onClick={handleDeleteNote}
        variant="ghost"
        className="absolute right-3 top-3 h-fit p-2 text-muted-foreground opacity-0 transition-all group-hover:opacity-100"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}

        <span className="sr-only">Remover nota</span>
      </Button>

      <span className="text-xs text-muted-foreground">
        {formatDate({ date: note.createdAt })}
      </span>

      <Link href={`/note/${note.id}`} className="flex-1">
        <h2 className="py-4 text-lg font-semibold text-strong transition-colors hover:text-primary">
          {note.title}
        </h2>
        <p className="text-sm leading-relaxed text-card-foreground">
          {getExcerpt(note.content)}
        </p>
      </Link>

      {note.tags.length > 0 && (
        <section className="mt-6 flex flex-wrap gap-3">
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
        </section>
      )}
    </div>
  )
}
