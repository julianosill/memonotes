'use client'

import { CircleCheck, Info, LoaderCircle, Mic } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { INote, useStore } from '@/app/store'

import { Input } from './input'
import { Popover } from './popover'
import { Button } from './ui/button'

interface NoteFormProps {
  note?: INote
  closeDialog: () => void
}

export function NoteForm({ note, closeDialog }: NoteFormProps) {
  const { isPending, addNote, updateNote, fetchNotes } = useStore((store) => {
    return {
      isPending: store.isPending,
      addNote: store.addNote,
      updateNote: store.updateNote,
      fetchNotes: store.fetchNotes,
    }
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagsInString, setTagsInString] = useState('')

  const router = useRouter()

  const isSubmitDisabled =
    title.trim().length <= 0 || content.trim().length <= 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitDisabled) {
      return toast.warning('Não é possível adicionar uma nota vazia!')
    }

    let tags: string[] = []

    if (tagsInString.length > 0) {
      tags = Array.from(new Set(tagsInString.split(/\s+/)))
      const shortTag = tags.find((tag) => tag.length < 3)

      if (shortTag) {
        return toast.warning('Cada Tag deve conter 3 ou mais letras.')
      }
    }

    note
      ? await updateNote({ id: note.id, title, content, tags })
          .then(() => {
            toast.success('Nota atualizada com sucesso!')
            closeDialog()
            router.push('/')
            fetchNotes()
          })
          .catch(() => {
            toast.error('Ops, algo deu errado!')
          })
      : await addNote({ title, content, tags })
          .then(() => {
            toast.success('Nota adicionada com sucesso!')
            setTitle('')
            setContent('')
            setTagsInString('')
            closeDialog()
            router.push('/')
            fetchNotes()
          })
          .catch(() => {
            toast.error('Ops, algo deu errado!')
          })
  }

  function handleCancel() {
    setTitle('')
    setContent('')
    closeDialog()
  }

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      if (note.tags) setTagsInString(note.tags.join(' '))
    }
  }, [note])

  return (
    <form className="flex flex-1 flex-col gap-8" onSubmit={handleSubmit}>
      <Input.Root className="flex flex-col gap-2">
        <Input.Label>Título</Input.Label>
        <Input.Wrapper>
          <Input.Control
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Insira o título da sua nota..."
            required
          />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root className="flex flex-1 flex-col gap-2">
        <div className="flex items-end justify-between">
          <Input.Label>Conteúdo</Input.Label>
          <Button type="button" variant="outline" size="sm" className="w-40">
            <Mic className="size-4 text-green-500" />
            Iniciar gravação
          </Button>
        </div>
        <Input.Wrapper className="flex-1">
          <Input.Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Inicie a gravação para transcrever sua fala ou digite seu texto..."
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
            <Popover.Content className="flex flex-col gap-2">
              <div className="font-medium">Observações:</div>
              <ol className="list-inside list-decimal">
                <li>Adicione tags separadas por espaço;</li>
                <li>Cada tag deve conter 3 ou mais letras.</li>
              </ol>
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
