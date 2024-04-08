import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { cn } from '@/utils/class-name-merge'

export function Title({
  className,
  ...props
}: AlertDialog.AlertDialogTitleProps) {
  return (
    <AlertDialog.Title
      className={cn('text-lg font-medium text-strong', className)}
      {...props}
    />
  )
}
