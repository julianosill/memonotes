import { ReactNode, Suspense } from 'react'

import { SearchForm } from '@/components/search-form'

export default function PageWithSearchLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Suspense>
        <SearchForm className="mb-4 md:mb-6 lg:mb-8" />
      </Suspense>
      {children}
    </>
  )
}
