import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ForwardedRef, forwardRef } from 'react'

export const Trigger = forwardRef(
  (
    props: DropdownMenu.DropdownMenuTriggerProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    return <DropdownMenu.Trigger ref={forwardedRef} {...props} />
  },
)

Trigger.displayName = 'Trigger'
