'use client'

import { CircleCheck, Info, LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'

import { INote } from '@/app/store'

import { Input } from '../input'
import { Popover } from '../popover'
import { Button } from '../ui/button'
import { SpeechToTextDialog } from './speech-to-text-dialog'
import { useNoteForm } from './useNoteForm'

interface NoteFormProps {
  note?: INote
}

export function NoteForm({ note }: NoteFormProps) {
  const {
    title,
    setTitle,
    content,
    setContent,
    tagsInString,
    setTagsInString,
    isSpeechRecognitionAPIAvailable,
    setIsSpeechRecognitionAPIAvailable,
    addTranscriptionToNote,
    isSubmitDisabled,
    handleSubmit,
    isPending,
    handleCancel,
  } = useNoteForm({ note })

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      if (note.tags) setTagsInString(note.tags.join(' '))
    }
  }, [note, setTitle, setContent, setTagsInString])

  useEffect(() => {
    setIsSpeechRecognitionAPIAvailable(
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
    )
  }, [setIsSpeechRecognitionAPIAvailable])

  return (
    <form className="flex flex-1 flex-col gap-8" onSubmit={handleSubmit}>
      <Input.Root className="flex flex-col gap-2">
        <Input.Label>Título</Input.Label>
        <Input.Wrapper>
          <Input.Control
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Insira o título da sua nota"
            required
          />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root className="flex flex-1 flex-col gap-2">
        <div className="flex items-end justify-between">
          <Input.Label>Conteúdo</Input.Label>
          {isSpeechRecognitionAPIAvailable && (
            <SpeechToTextDialog
              onAddTranscriptionToNote={addTranscriptionToNote}
            />
          )}
        </div>
        <Input.Wrapper className="min-h-[240px] flex-1">
          <Input.Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite ou grave seu áudio para transcrever"
            required
          />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root className="flex flex-col gap-2">
        <Input.Label className="flex items-center gap-2">
          Tags
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
            <Popover.Content className="flex flex-col gap-3">
              <div className="font-semibold">Observações</div>
              <ul className="list-disc space-y-1 pl-4">
                <li>Adicione tags separadas por espaço;</li>
                <li>Cada tag deve conter 3 ou mais letras.</li>
              </ul>
              <span className="rounded border border-border-soft bg-muted px-2 py-1.5 font-mono text-xs">
                Exemplo: estudos viagem trabalho
              </span>
            </Popover.Content>
          </Popover.Root>
        </Input.Label>

        <Input.Wrapper>
          <Input.Control
            value={tagsInString}
            onChange={(e) => setTagsInString(e.target.value)}
            placeholder="Separe as tags por espaço, exemplo: estudos trabalho viagem"
          />
        </Input.Wrapper>
      </Input.Root>

      <div className="flex justify-end gap-4">
        <Button type="button" onClick={handleCancel} variant="muted">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitDisabled}>
          {isPending ? (
            <>
              <LoaderCircle className="size-5 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <CircleCheck className="size-5" />
              Salvar
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
