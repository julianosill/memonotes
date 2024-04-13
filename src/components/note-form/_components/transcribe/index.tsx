import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Mic } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Dialog } from '@/components/dialog'
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'

import { TranscribeActions } from './transcribe-actions'
import { TranscribeInstructions } from './transcribe-instructions'

interface TranscribeDialogProps {
  onAddTranscriptionToNote: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function TranscribeDialog({
  onAddTranscriptionToNote,
}: TranscribeDialogProps) {
  const [open, setOpen] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const isActionsDisabled = !transcription.trim() || isRecording

  function handleRecording() {
    isRecording ? stopRecording() : startRecording()
  }

  function startRecording() {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      return toast.error(
        'Este navegador não tem suporte ao reconhecimento de fala.',
      )
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition
    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.interimResults = true
    speechRecognition.maxAlternatives = 1

    speechRecognition.onresult = (event) => {
      const transcribed = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      const previousContent = transcription.trim()
      previousContent
        ? setTranscription(`${transcription}\n\n${transcribed}`)
        : setTranscription(transcribed)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
      setIsRecording(false)

      if (event.error === 'no-speech') {
        return toast.error(
          'Nenhuma fala foi detectada. Por favor, inicie a gravação novamente.',
        )
      }

      cancel()
      toast.error('Este navegador não tem suporte ao reconhecimento de fala.')
    }

    speechRecognition.start()
    setIsRecording(true)
  }

  function stopRecording() {
    speechRecognition?.stop()
    setIsRecording(false)
  }

  function handleAddTranscriptionToNote() {
    onAddTranscriptionToNote(transcription)
    setTranscription('')
    setOpen(false)
  }

  function clearTranscription() {
    setTranscription('')
  }

  function cancel() {
    setTranscription('')
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Mic className="size-4 text-green-500" />
          Transcrever gravação
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="flex flex-col gap-8 max-md:pb-16 md:h-[720px]">
        <Dialog.Title className="flex w-10/12 items-center gap-2">
          <TranscribeInstructions />
          Transcreva sua gravação de voz
        </Dialog.Title>

        <VisuallyHidden.Root>
          <Dialog.Description>
            Inicie a gravação de voz e acompanhe abaixo a transcrição da sua
            fala em tempo real.
          </Dialog.Description>
        </VisuallyHidden.Root>

        <section className="flex flex-1 flex-col gap-4">
          <Input.Root className="flex flex-1 flex-col gap-2">
            <Input.Label className="text-sm">Conteúdo</Input.Label>
            <Input.Wrapper className="flex-1">
              <Input.Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Inicie a gravação clicando no botão abaixo"
                className="min-h-[120px] disabled:cursor-not-allowed"
                disabled={isRecording}
                required
              />
            </Input.Wrapper>
          </Input.Root>

          <TranscribeActions
            content={transcription}
            disabled={isActionsDisabled}
            isRecording={isRecording}
            onToogleRecording={handleRecording}
            onAddTranscription={handleAddTranscriptionToNote}
            onClearTranscription={clearTranscription}
            onCancel={cancel}
          />
        </section>
      </Dialog.Content>
    </Dialog.Root>
  )
}
