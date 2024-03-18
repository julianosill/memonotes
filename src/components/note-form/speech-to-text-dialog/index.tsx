import * as RadixDialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import {
  CircleCheck,
  ClipboardCopy,
  Copy,
  Info,
  Mic,
  Paintbrush,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Dialog } from '@/components/dialog'
import { Popover } from '@/components/popover'
import { Tooltip } from '@/components/tooltip'

import { Input } from '../../input'
import { Button } from '../../ui/button'
import { useSpeechToText } from './useSpeechToText'

interface SpeechToTextDialogProps {
  onAddTranscriptionToNote: (transcription: string) => void
}

export function SpeechToTextDialog({
  onAddTranscriptionToNote,
}: SpeechToTextDialogProps) {
  const {
    open,
    setOpen,
    transcription,
    setTranscription,
    isRecording,
    handleRecording,
    clipToClipboard,
    handleAddTranscriptionToNote,
    handleCancel,
  } = useSpeechToText({
    onAddTranscriptionToNote,
  })
  const [isClipboardSupported, setIsClipboardSupported] = useState(false)
  const [openClearPopover, setOpenClearPopover] = useState(false)

  const isActionsDisabled = !transcription.trim() || isRecording

  function handleClearTranscription() {
    setTranscription('')
    setOpenClearPopover(false)
  }

  useEffect(() => {
    setIsClipboardSupported('clipboard' in navigator)
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Mic className="size-4 text-green-500" />
          Transcrever gravação
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="flex flex-col gap-8 md:h-[720px]">
        <RadixDialog.Title className="flex gap-4 text-lg font-medium text-strong">
          Transcreva sua gravação de voz
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
                <li>
                  Inicie a gravação e aguarde pelo menos 2 segundos para falar;
                </li>
                <li>
                  Fale próximo ao microfone, de forma clara e articulada para
                  melhorar o reconhecimento das palavras.
                </li>
              </ul>
              <div className="h-px w-full bg-border-soft" />
              <p className="text-sm">
                Alguns navegadores não são compatíveis com o reconhecimento de
                voz. Confira através{' '}
                <Link
                  className="font-medium text-strong underline underline-offset-2 hover:text-accent-foreground"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility"
                >
                  deste link
                </Link>
                .
              </p>
            </Popover.Content>
          </Popover.Root>
        </RadixDialog.Title>

        <VisuallyHidden.Root>
          <RadixDialog.Description>
            Inicie a gravação de voz e acompanhe abaixo a transcrição da sua
            fala em tempo real.
          </RadixDialog.Description>
        </VisuallyHidden.Root>

        <section className="flex flex-1 flex-col gap-4">
          <Input.Root className="flex flex-1 flex-col gap-2">
            <Input.Label className="text-sm">Conteúdo</Input.Label>
            <Input.Wrapper className="flex-1">
              <Input.Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Inicie a gravação clicando no botão abaixo"
                className="disabled:cursor-not-allowed"
                disabled={isRecording}
                required
              />
            </Input.Wrapper>
          </Input.Root>

          <div className="flex gap-2">
            {isClipboardSupported && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="w-full whitespace-nowrap"
                disabled={isActionsDisabled}
                onClick={clipToClipboard}
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
                  className="w-full whitespace-nowrap"
                  disabled={isActionsDisabled}
                  onClick={handleAddTranscriptionToNote}
                >
                  <ClipboardCopy className="size-4" />
                  Adicionar à nota
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="max-w-72 text-center">
                Se a nota já tiver conteúdo, a transcrição será adicionada no
                final.
              </Tooltip.Content>
            </Tooltip.Root>

            <Popover.Root
              open={openClearPopover}
              onOpenChange={setOpenClearPopover}
            >
              <Popover.Trigger asChild>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="w-full whitespace-nowrap"
                  disabled={isActionsDisabled}
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
        </section>

        <section className="flex gap-4">
          <Button
            onClick={handleRecording}
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
          <Button onClick={handleCancel} type="button" variant="muted">
            Cancelar
          </Button>
        </section>

        <RadixDialog.Close asChild>
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-8 top-8 size-8 p-0 text-muted-foreground sm:right-4 sm:top-4"
          >
            <X className="size-6 sm:size-5" />
            <span className="sr-only">Fechar</span>
          </Button>
        </RadixDialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
