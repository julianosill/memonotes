import * as Dialog from '@radix-ui/react-dialog'

import { cn } from '@/utils/class-name-merge'

export function Title({ className, ...props }: Dialog.DialogTitleProps) {
  return (
    <Dialog.Title
      className={cn('text-lg font-medium leading-snug text-strong', className)}
      {...props}
    />
  )
}
