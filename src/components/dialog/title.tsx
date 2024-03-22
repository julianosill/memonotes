import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

export function Title({ className, ...props }: Dialog.DialogTitleProps) {
  return (
    <Dialog.Title
      className={twMerge(
        'text-lg font-medium leading-snug text-strong',
        className,
      )}
      {...props}
    />
  )
}
