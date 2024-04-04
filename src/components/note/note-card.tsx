import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { INote } from '@/@types/note'
import { DeleteNote } from '@/components/delete-note'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/format-date'
import { getExcerpt } from '@/utils/get-excerpt'

interface NoteCardProps {
  note: INote
}

export function NoteCard({ note }: NoteCardProps) {
  const router = useRouter()

  return (
    <article className="group relative flex w-full flex-col rounded-xl border border-transparent bg-card p-5 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md dark:border-border-soft lg:p-8">
      <div className="absolute right-3 top-3 transition-all group-hover:opacity-100 md:opacity-0">
        <DeleteNote id={note.id} title={note.title} size="sm" />
      </div>

      <span className="text-xs text-muted-foreground">
        {formatDate({ date: note.createdAt })}
      </span>

      <Link href={`/note/${note.id}`} className="flex-1">
        <h2 className="pb-2 pt-3 text-base font-semibold leading-snug text-strong transition-colors hover:text-primary lg:py-4 lg:text-lg">
          {note.title}
        </h2>
        <p className="text-sm leading-relaxed text-card-foreground">
          {getExcerpt(note.content)}
        </p>
      </Link>

      {note.tags.length > 0 && (
        <section className="mt-4 flex flex-wrap gap-2 lg:mt-6 lg:gap-3">
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
    </article>
  )
}
