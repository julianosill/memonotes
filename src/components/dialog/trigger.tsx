import * as Dialog from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

type TriggerProps = Dialog.DialogTriggerProps

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    return <Dialog.Trigger ref={ref} {...props} />
  },
)

Trigger.displayName = 'Trigger'
