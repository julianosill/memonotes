import { Info } from 'lucide-react'

import { Popover } from '@/components/popover'
import { Button } from '@/components/ui/button'
import { TextLink } from '@/components/ui/text-link'

export function TranscribeInstructions() {
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
      <Popover.Content className="flex max-w-[340px] flex-col gap-4 p-5 text-base">
        <h6 className="font-semibold">Recomendações</h6>
        <ul className="list-disc space-y-2 pl-5">
          <li>Inicie a gravação e aguarde pelo menos 2 segundos para falar;</li>
          <li>
            Fale próximo ao microfone, de forma clara e articulada para melhorar
            o reconhecimento das palavras.
          </li>
        </ul>
        <div className="h-px w-full bg-border-soft" />
        <p className="text-sm">
          Alguns navegadores não são compatíveis com o reconhecimento de voz.
          Confira através{' '}
          <TextLink href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility">
            deste link
          </TextLink>
          .
        </p>
      </Popover.Content>
    </Popover.Root>
  )
}
