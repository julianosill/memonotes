import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { INote } from '@/app/store'
import { formatDate } from '@/utils/format-date'
import { getExcerpt } from '@/utils/get-excerpt'

import { DeleteNote } from './delete-note'
import { Button } from './ui/button'

interface NoteCardProps {
  note: INote
}

export function NoteCard({ note }: NoteCardProps) {
  const router = useRouter()

  return (
    <div className="group relative flex flex-col rounded-xl border border-transparent bg-card p-8 shadow transition-shadow hover:shadow-md dark:border-border-soft">
      <div className="absolute right-3 top-3 opacity-0 transition-all group-hover:opacity-100">
        <DeleteNote id={note.id} title={note.title} size="sm" />
      </div>

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
