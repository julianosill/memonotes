import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/button'

interface ContentProps extends Dialog.DialogContentProps {
  children: ReactNode
}

export function Content({ children, className, ...props }: ContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-memonotes-950/90 backdrop-blur-sm dark:bg-zinc-950/90" />
      <Dialog.Content
        className={twMerge(
          'fixed inset-0 w-full max-w-[720px] overflow-y-auto bg-card p-8 sm:p-12',
          'md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[80vh] md:-translate-x-1/2 md:-translate-y-1/2',
          'md:rounded-xl md:border md:border-border-soft md:shadow-md',
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close asChild>
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-8 top-8 size-8 p-0 text-muted-foreground sm:right-4 sm:top-4"
          >
            <X className="size-6 sm:size-5" />
            <span className="sr-only">Fechar</span>
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
