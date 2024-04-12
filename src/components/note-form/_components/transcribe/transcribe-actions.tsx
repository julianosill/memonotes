import { CircleCheck, ClipboardCopy, Copy, Mic, Paintbrush } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Popover } from '@/components/popover'
import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'

interface TranscribeActionsProps {
  content: string
  disabled?: boolean
  isRecording: boolean
  onToogleRecording: () => void
  onAddTranscription: () => void
  onClearTranscription: () => void
  onCancel: () => void
}

export function TranscribeActions({
  content,
  disabled,
  isRecording,
  onToogleRecording,
  onAddTranscription,
  onClearTranscription,
  onCancel,
}: TranscribeActionsProps) {
  const [isClipboardSupported, setIsClipboardSupported] = useState(false)
  const [isClearPopoverOpen, setIsClearPopoverOpen] = useState(false)

  async function handleClipToClipboard() {
    if (disabled) return

    try {
      await navigator.clipboard.writeText(content)
      toast.success('A transcrição foi copiada para sua área de transferência.')
    } catch (error) {
      console.error(error)
      toast.error('Não foi possível copiar o texto.')
    }
  }

  function handleClearTranscription() {
    onClearTranscription()
    setIsClearPopoverOpen(false)
  }

  useEffect(() => {
    setIsClipboardSupported('clipboard' in navigator)
  }, [])

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap gap-2 sm:flex-nowrap">
        {isClipboardSupported && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="flex-1 whitespace-nowrap"
            disabled={disabled}
            onClick={handleClipToClipboard}
          >
            <Copy className="size-4" />
            Copiar
          </Button>
        )}

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="flex-1 whitespace-nowrap"
              disabled={disabled}
              onClick={onAddTranscription}
            >
              <ClipboardCopy className="size-4" />
              Adicionar à nota
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content className="max-w-72 text-center">
            Se a nota já tiver conteúdo, a transcrição será adicionada no final.
          </Tooltip.Content>
        </Tooltip.Root>

        <Popover.Root
          open={isClearPopoverOpen}
          onOpenChange={setIsClearPopoverOpen}
        >
          <Popover.Trigger asChild>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="flex-1 whitespace-nowrap"
              disabled={disabled}
            >
              <Paintbrush className="size-4" />
              Limpar
            </Button>
          </Popover.Trigger>
          <Popover.Content className="flex max-w-[240px] flex-col gap-4 p-6">
            <h6 className="font-semibold">
              Tem certeza que deseja limpar a transcrição?
            </h6>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleClearTranscription}
            >
              <CircleCheck className="size-4" />
              Confirmar
            </Button>
          </Popover.Content>
        </Popover.Root>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onToogleRecording}
          type="button"
          variant="outline"
          className="w-full"
          autoFocus
        >
          {isRecording ? (
            <>
              <Mic className="size-5 animate-pulse text-red-500" />
              Parar gravação
            </>
          ) : (
            <>
              <Mic className="size-5 text-green-500" />
              Iniciar gravação
            </>
          )}
        </Button>
        <Button onClick={onCancel} type="button" variant="ghost">
          Cancelar
        </Button>
      </div>
    </section>
  )
}
