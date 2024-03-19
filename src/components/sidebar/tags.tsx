'use client'

import Link from 'next/link'

import { useStore } from '@/app/store'

interface TagsProps {
  onNavigation: () => void
}

export function Tags({ onNavigation }: TagsProps) {
  const { notes } = useStore((store) => {
    return { notes: store.notes }
  })
  const tags = notes?.map((note) => note.tags).flat()
  const uniqueTags = Array.from(new Set(tags)).sort()

  if (!uniqueTags || uniqueTags.length === 0) return null

  return (
    <section className="flex flex-1 flex-col">
      <span className="text-base font-semibold text-memonotes-300 dark:text-memonotes-400 md:text-sm">
        Tags
      </span>

      <div className="mt-6 flex flex-col gap-4 md:mt-4 md:gap-3">
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            onClick={onNavigation}
            href={`/tag/${tag}`}
            className="text-base font-medium text-zinc-200 hover:text-white dark:text-zinc-300 dark:hover:text-white md:text-sm"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  )
}
