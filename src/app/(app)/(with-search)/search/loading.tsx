import { BackButton } from '@/components/back-button'
import { Skeleton } from '@/components/skeleton'

export default function SearchLoading() {
  return (
    <main className="flex flex-1 flex-col gap-6">
      <BackButton className="self-start" />

      <section className="space-y-4 lg:space-y-6">
        <p className="text-sm">Carregando notas...</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
        </div>
      </section>
    </main>
  )
}
