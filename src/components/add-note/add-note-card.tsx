import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { CircleCheck, LoaderCircle, Mic, X } from 'lucide-react'
import { ChangeEvent, FormEvent, forwardRef, useState } from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import { Input } from '../input'
import { Button } from '../ui/button'

interface AddNoteCardProps {
  closeDialog: () => void
}

export const AddNoteCard = forwardRef<HTMLDivElement, AddNoteCardProps>(
  ({ closeDialog }, ref) => {
    const [isRecording, setIsRecording] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [content, setContent] = useState('')

    function handleChangeContent(event: ChangeEvent<HTMLTextAreaElement>) {
      setContent(event.target.value)
    }

    function handleRecording() {
      isRecording ? setIsRecording(false) : setIsRecording(true)
    }

    async function handleAddNote(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setIsPending(true)

      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log(content)

      setIsPending(false)
      toast.success('Nota adicionada com sucesso!')
      closeDialog()
    }

    return (
      <Dialog.Content
        ref={ref}
        className={twMerge(
          'fixed inset-0 flex w-full flex-col gap-4 overflow-y-auto bg-card p-8',
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

        <form className="flex flex-1 flex-col gap-4" onSubmit={handleAddNote}>
          <Input.Root>
            <Input.Label>Título</Input.Label>
            <Input.Wrapper>
              <Input.Control
                autoFocus
                type="email"
                placeholder="Insira o título da sua nota..."
              />
            </Input.Wrapper>
          </Input.Root>

          <label htmlFor="note" className="sr-only">
            Insira seu texto
          </label>
          <textarea
            id="note"
            value={content}
            onChange={handleChangeContent}
            className={twMerge(
              'w-full flex-1 resize-y rounded-md border border-border-soft bg-card p-4 outline-none',
              'focus:border-ring focus:ring-2 focus:ring-ring-soft',
            )}
            placeholder="Inicie a gravação para transcrever sua fala ou digite seu texto..."
          />
          <div className="flex justify-end gap-4">
            <Dialog.Close asChild>
              <Button type="button" variant="muted">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button
              type="submit"
              disabled={isRecording || isPending || content.length <= 0}
            >
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
