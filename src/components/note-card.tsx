import { Trash2 } from 'lucide-react'

import { Button } from './ui/button'

export function NoteCard() {
  return (
    <div className="group relative rounded-xl bg-card p-8 shadow transition-shadow hover:shadow-md dark:border dark:border-border-soft">
      <Button
        variant="ghost"
        className="absolute right-3 top-3 h-fit p-2 text-muted-foreground opacity-0 transition-all group-hover:opacity-100"
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
        vehicula diam quis lacus convallis tincidunt. Suspendisse potenti. Proin
        lacinia, lectus vitae fringilla efficitur.
      </p>

      <section className="mt-6 flex gap-3">
        <Button variant="muted" size="xs">
          Typescript
        </Button>
        <Button variant="muted" size="xs">
          Next.js
        </Button>
      </section>
    </div>
  )
}
