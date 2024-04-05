import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { fetchTags } from '@/api/fetch-tags'
import { Sidebar } from '@/components/sidebar'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const tags = await fetchTags()

  return (
    <div
      className={twMerge(
        'flex min-h-screen flex-1 overflow-hidden p-6',
        'md:grid md:grid-cols-app md:gap-8 md:p-12',
        'lg:gap-12',
      )}
    >
      <Sidebar tags={tags} />
      <div className="flex w-full flex-col pt-14 md:col-start-2 md:pt-0">
        {children}
      </div>
    </div>
  )
}
