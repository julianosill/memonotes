import { ReactNode } from 'react'

import { Sidebar } from '@/components/sidebar'

import { FetchNotes } from './fetch-notes'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen gap-12 p-12">
      <Sidebar />
      {children}
      <FetchNotes />
    </div>
  )
}
