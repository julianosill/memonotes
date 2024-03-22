import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { ForwardedRef, forwardRef } from 'react'

export const Trigger = forwardRef(
  (
    props: AlertDialog.AlertDialogTriggerProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    return <AlertDialog.Trigger ref={forwardedRef} {...props} />
  },
)

Trigger.displayName = 'Trigger'
