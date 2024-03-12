import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

const cards = [1, 2, 3, 4]

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((note) => (
          <div
            key={note}
            className="group relative rounded-xl bg-card p-8 shadow transition-shadow hover:shadow-md dark:border dark:border-border-soft"
          >
            <Button
              variant="ghost"
              className="absolute right-4 top-4 h-fit rounded p-2 text-muted-foreground opacity-0 transition-all group-hover:opacity-100"
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Remover nota</span>
            </Button>

            <span className="text-xs text-muted-foreground">24 jan 2024</span>

            <h2 className="py-4 text-lg font-semibold text-strong transition-colors hover:text-primary">
              Título da nota
            </h2>

            <p className="text-sm leading-relaxed text-card-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              vehicula diam quis lacus convallis tincidunt. Suspendisse potenti.
              Proin lacinia, lectus vitae fringilla efficitur.
            </p>

            <div className="mt-6 flex gap-3">
              <Button variant="muted" size="xs">
                Typescript
              </Button>
              <Button variant="muted" size="xs">
                Next.js
              </Button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
