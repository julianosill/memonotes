import { ArrowLeft, NotebookPen, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NoteDetails() {
  return (
    <main className="flex-1 rounded-xl bg-card p-12 shadow transition-shadow hover:shadow-md dark:border dark:border-border-soft">
      <div className="flex items-start justify-between">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
        <section className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-fit p-2 text-muted-foreground"
          >
            <Trash2 className="size-5" />
            <span className="sr-only">Excluir</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-fit p-2 text-muted-foreground"
          >
            <NotebookPen className="size-5" />
            <span className="sr-only">Editar</span>
          </Button>
        </section>
      </div>

      <h2 className="py-8 text-2xl font-semibold text-strong">
        Título da nota
      </h2>

      <p className="leading-relaxed text-card-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        vehicula diam quis lacus convallis tincidunt. Suspendisse potenti. Proin
        lacinia, lectus vitae fringilla efficitur.
      </p>

      <footer className="mt-12 flex gap-12 border-t border-border-soft pt-6">
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-medium text-muted-foreground">Criada em</h3>
          <span className="text-muted-foreground">24 de janeiro de 2024</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 text-sm">
          <h3 className="font-medium text-muted-foreground">Tags</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="muted" size="xs">
              Typescript
            </Button>
            <Button variant="muted" size="xs">
              Next.js
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}
