import { ReactNode } from 'react'

import { SearchForm } from '@/components/search-form'
import { Sidebar } from '@/components/sidebar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen gap-12 p-12">
      <Sidebar />
      <div className="flex-1 space-y-12">
        <SearchForm />
        {children}
      </div>
    </div>
  )
}
