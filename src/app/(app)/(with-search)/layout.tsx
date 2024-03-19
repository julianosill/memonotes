import { ReactNode } from 'react'

import { SearchForm } from '@/components/search-form'

export default function PageWithSearchLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <SearchForm className="mb-4 md:mb-6 lg:mb-8" />
      {children}
    </>
  )
}
