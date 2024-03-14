'use client'

import { CircleCheck, LoaderCircle, Mic } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

import { useStore } from '@/app/store'

import { Input } from './input'
import { Button } from './ui/button'

interface NoteFormProps {
  closeDialog: () => void
}

export function NoteForm({ closeDialog }: NoteFormProps) {
  const { addNote, isPending } = useStore((store) => {
    return { isPending: store.isPending, addNote: store.addNote }
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagsInString, setTagsInString] = useState('')

  const isSubmitDisabled =
    title.trim().length <= 0 || content.trim().length <= 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitDisabled) {
      return toast.warning('Não é possível adicionar vazia!')
    }

    const uniqueTags = Array.from(new Set(tagsInString.split(' ')))
    const shortTag = uniqueTags.find((tag) => tag.length < 3)

    if (shortTag) {
      return toast.warning('Cada Tag deve conter 3 ou mais letras.')
    }

    const tags = uniqueTags.filter((tag) => tag.length >= 3)

    await addNote({ title, content, tags }).then(() => {
      toast.success('Nota adicionada com sucesso!')
      setTitle('')
      setContent('')
      closeDialog()
    })
  }

  function handleCancel() {
    setTitle('')
    setContent('')
    closeDialog()
  }

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
        <Input.Label>Tags</Input.Label>
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
