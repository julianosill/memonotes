import { ReactNode } from 'react'

import { SearchForm } from '@/components/search-form'

export default function PageWithSearchLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <SearchForm />
      {children}
    </div>
  )
}
