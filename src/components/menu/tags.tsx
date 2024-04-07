'use client'

import Link from 'next/link'

import { useSidebar } from './_sidebar'

interface TagsProps {
  tags: string[]
}

export function Tags({ tags }: TagsProps) {
  const { onNavigation } = useSidebar()

  return (
    <section className="flex-1 pt-6">
      <span className="font-semibold text-memonotes-300 dark:text-memonotes-400 md:text-sm">
        Tags
      </span>

      <div className="flex flex-col gap-3 pt-5 md:gap-1 md:pt-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            onClick={onNavigation}
            className="py-0.5 font-medium text-zinc-200 hover:text-white dark:text-zinc-300 dark:hover:text-white md:text-sm"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  )
}
