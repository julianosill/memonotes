import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import { useStore } from '@/app/store'

import { Tooltip } from './tooltip'
import { Button } from './ui/button'

interface DeleteNoteProps {
  id: string
  title: string
  size?: 'sm' | 'base'
}

export function DeleteNote({ id, title, size = 'base' }: DeleteNoteProps) {
  const { isPending, deleteNote } = useStore((store) => {
    return { isPending: store.isPending, deleteNote: store.deleteNote }
  })
  const router = useRouter()

  async function handleDeleteNote() {
    await deleteNote(id)
      .then(() => {
        toast.success('Nota deletada com sucesso!')
        router.push('/')
      })
      .catch((error) => {
        console.error(error)
        toast.error('Não foi possível excluir a nota, tente novamente.')
      })
  }

  return (
    <AlertDialog.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <AlertDialog.Trigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-fit p-2 text-muted-foreground"
            >
              <Trash2 className={size === 'base' ? 'size-5' : 'size-4'} />
              <span className="sr-only">Excluir nota</span>
            </Button>
          </AlertDialog.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content>Excluir nota</Tooltip.Content>
      </Tooltip.Root>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-memonotes-950/90 backdrop-blur-sm dark:bg-zinc-950/90" />
        <AlertDialog.Content
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={twMerge(
            'fixed flex w-full flex-col gap-4 overflow-y-auto bg-card p-8',
            'left-1/2 top-1/2 max-h-[90vh] max-w-[480px] -translate-x-1/2 -translate-y-1/2',
            'md:rounded-xl md:border md:border-border-soft md:shadow-md',
          )}
        >
          <AlertDialog.Title className="text-lg font-medium text-strong">
            Excluir nota
          </AlertDialog.Title>
          <AlertDialog.Description className="flex flex-col gap-2">
            Tem certeza que deseja excluir esta nota?
            <span className="rounded border border-border-soft bg-muted px-2 py-1.5 font-mono text-xs">
              {title}
            </span>
          </AlertDialog.Description>
          <section className="flex justify-end gap-4 pt-4">
            <AlertDialog.Cancel asChild>
              <Button variant="muted">Cancelar</Button>
            </AlertDialog.Cancel>
            <Button
              onClick={handleDeleteNote}
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Excluindo nota...
                </>
              ) : (
                <>
                  <Trash2 className="size-5" />
                  Excluir
                </>
              )}
            </Button>
          </section>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
