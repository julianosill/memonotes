import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

type TitleProps = Dialog.DialogTitleProps

export function Title({ className, ...props }: TitleProps) {
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
