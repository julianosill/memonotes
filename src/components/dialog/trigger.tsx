import * as Dialog from '@radix-ui/react-dialog'
import { ForwardedRef, forwardRef } from 'react'

export const Trigger = forwardRef(
  (
    props: Dialog.DialogTriggerProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    return <Dialog.Trigger ref={forwardedRef} {...props} />
  },
)

Trigger.displayName = 'Trigger'
