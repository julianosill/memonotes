'use client'

import Link from 'next/link'

import { useStore } from '@/app/store'

export function Tags() {
  const { notes } = useStore((store) => {
    return { notes: store.notes }
  })
  const tags = notes?.map((note) => note.tags).flat()
  const uniqueTags = Array.from(new Set(tags)).sort()

  if (!uniqueTags || uniqueTags.length === 0) return null

  return (
    <section>
      <span className="text-sm font-semibold text-memonotes-300 dark:text-memonotes-400">
        Tags
      </span>

      <div className="mt-6 flex flex-col items-start gap-4">
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className="text-sm font-medium text-zinc-200 hover:text-white dark:text-zinc-300 dark:hover:text-white"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  )
}
