import { Loader2 } from 'lucide-react'

import { BackButton } from '@/components/back-button'

export default function EditNotePageLoading() {
  return (
    <main className="flex flex-1 flex-col gap-6 rounded-2xl bg-card p-6 shadow-md dark:border dark:border-border-soft md:p-8 lg:gap-8 lg:p-10">
      <BackButton className="self-start" />

      <h1 className="text-xl font-medium text-strong">Adicionar nota</h1>

      <div className="flex items-center gap-2">
        <Loader2 className="size-6 animate-spin" />
        <span>Carregando formulário...</span>
      </div>
    </main>
  )
}
