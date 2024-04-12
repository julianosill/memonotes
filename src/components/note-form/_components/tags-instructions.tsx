import { Info } from 'lucide-react'

import { Popover } from '@/components/popover'
import { Button } from '@/components/ui/button'

export function TagsInstructions() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-fit p-1 text-muted-foreground"
        >
          <Info strokeWidth={1.5} className="size-5" />
          <span className="sr-only">Excluir nota</span>
        </Button>
      </Popover.Trigger>
      <Popover.Content className="flex max-w-[320px] flex-col gap-3">
        <div className="font-semibold">Observações</div>
        <ul className="list-disc space-y-1 pl-4">
          <li>Adicione tags separadas por vírgula;</li>
          <li>Cada tag deve conter 3 ou mais letras.</li>
        </ul>
        <span className="rounded border border-border-soft bg-muted px-2 py-1.5 font-mono text-xs">
          Exemplo: estudos, viagem, trabalho
        </span>
      </Popover.Content>
    </Popover.Root>
  )
}
