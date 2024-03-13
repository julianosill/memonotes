import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { CircleCheck, LoaderCircle, Mic, X } from 'lucide-react'
import { ChangeEvent, FormEvent, forwardRef, useState } from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import { useStore } from '@/app/store'

import { Input } from '../input'
import { Button } from '../ui/button'

interface AddNoteCardProps {
  closeDialog: () => void
}

export const AddNoteCard = forwardRef<HTMLDivElement, AddNoteCardProps>(
  ({ closeDialog }, ref) => {
    const { isLoading, addNote } = useStore((store) => {
      return { isLoading: store.isLoading, addNote: store.addNote }
    })
    const [isRecording, setIsRecording] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const disableSubmit =
      isRecording ||
      isLoading ||
      title.trim().length <= 0 ||
      content.trim().length <= 0

    function handleChangeContent(event: ChangeEvent<HTMLTextAreaElement>) {
      setContent(event.target.value)
    }

    function handleRecording() {
      isRecording ? setIsRecording(false) : setIsRecording(true)
    }

    async function handleAddNote(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      await addNote({ title, content, tags: ['js', 'node', 'test'] }).then(
        () => {
          toast.success('Nota adicionada com sucesso!')
          setTitle('')
          setContent('')
          closeDialog()
        },
      )
    }

    return (
      <Dialog.Content
        ref={ref}
        className={twMerge(
          'fixed inset-0 flex w-full flex-col gap-8 overflow-y-auto bg-card p-8',
          'sm:p-12',
          'md:inset-auto md:left-1/2 md:top-1/2 md:h-[720px] md:max-h-[80vh] md:max-w-[720px] md:-translate-x-1/2 md:-translate-y-1/2',
          'md:rounded-xl md:border md:border-border-soft md:shadow-md',
        )}
      >
        <header className="flex flex-col justify-between gap-8 sm:flex-row">
          <Dialog.Title className="text-xl font-medium text-strong">
            Adicionar nota
          </Dialog.Title>
          <Button
            onClick={handleRecording}
            variant="outline"
            size="sm"
            className="w-40"
          >
            {isRecording ? (
              <>
                <Mic className="size-4 animate-pulse text-destructive" />
                Parar gravação
              </>
            ) : (
              <>
                <Mic className="size-4 text-green-500" />
                Iniciar gravação
              </>
            )}
          </Button>
        </header>

        <VisuallyHidden.Root>
          <Dialog.Description>
            Adicione o conteúdo da sua nota ou inicie a gravação para
            transcrever a sua fala.
          </Dialog.Description>
        </VisuallyHidden.Root>

        <form className="flex flex-1 flex-col gap-6" onSubmit={handleAddNote}>
          <Input.Root className="flex flex-col gap-2">
            <Input.Label>Título</Input.Label>
            <Input.Wrapper>
              <Input.Control
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Insira o título da sua nota..."
              />
            </Input.Wrapper>
          </Input.Root>

          <Input.Root className="flex flex-1 flex-col gap-2">
            <Input.Label>Conteúdo</Input.Label>
            <Input.Wrapper className="flex-1">
              <Input.Textarea
                value={content}
                onChange={handleChangeContent}
                placeholder="Inicie a gravação para transcrever sua fala ou digite seu texto..."
              />
            </Input.Wrapper>
          </Input.Root>

          <div className="flex justify-end gap-4">
            <Dialog.Close asChild>
              <Button type="button" variant="muted">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={disableSubmit}>
              {isLoading ? (
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

        <Dialog.Close asChild>
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-8 top-8 size-8 p-0 text-muted-foreground sm:right-2 sm:top-2"
          >
            <X className="size-6 sm:size-4" />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    )
  },
)

AddNoteCard.displayName = 'AddNoteCard'
