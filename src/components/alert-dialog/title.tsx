import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { twMerge } from 'tailwind-merge'

export function Title({
  className,
  ...props
}: AlertDialog.AlertDialogTitleProps) {
  return (
    <AlertDialog.Title
      className={twMerge('text-lg font-medium text-strong', className)}
      {...props}
    />
  )
}
