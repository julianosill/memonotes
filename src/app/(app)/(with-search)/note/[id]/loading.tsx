import { Loader2 } from 'lucide-react'

import { BackButton } from '@/components/back-button'

export default function NotePageLoading() {
  return (
    <main className="flex flex-1 flex-col rounded-2xl bg-card p-8 shadow-md dark:border dark:border-border-soft md:p-12">
      <div className="flex items-start justify-between">
        <BackButton />
      </div>

      <div className="flex items-center gap-2 py-8">
        <Loader2 className="size-6 animate-spin" />
        <span>Carregando nota...</span>
      </div>
    </main>
  )
}
