import { useState } from 'react'
import { toast } from 'sonner'

let speechRecognition: SpeechRecognition | null = null

interface useSpeechToTextProps {
  onAddTranscriptionToNote: (transcription: string) => void
}

export function useSpeechToText({
  onAddTranscriptionToNote,
}: useSpeechToTextProps) {
  const [open, setOpen] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const isActionsDisabled = !transcription.trim() || isRecording

  async function clipToClipboard() {
    if (isActionsDisabled) return

    try {
      await navigator.clipboard.writeText(transcription)
      toast.success('A transcrição foi copiada para sua área de transferência.')
    } catch (error) {
      console.error(error)
      toast.error('Não foi possível copiar o texto.')
    }
  }

  function handleAddTranscriptionToNote() {
    onAddTranscriptionToNote(transcription.trim())
    setTranscription('')
    setOpen(false)
    toast.success('Transcrição adicionada à nota com sucesso!')
  }

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

      handleCancel()
      toast.error('Este navegador não tem suporte ao reconhecimento de fala.')
    }

    speechRecognition.start()
    setIsRecording(true)
  }

  function stopRecording() {
    speechRecognition?.stop()
    setIsRecording(false)
  }

  function handleCancel() {
    setTranscription('')
    setOpen(false)
  }

  return {
    open,
    setOpen,
    transcription,
    setTranscription,
    isRecording,
    clipToClipboard,
    handleAddTranscriptionToNote,
    handleRecording,
    handleCancel,
  }
}
