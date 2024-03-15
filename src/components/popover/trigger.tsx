import * as RadixPopover from '@radix-ui/react-popover'
import { ReactNode } from 'react'

interface TriggerProps extends RadixPopover.PopoverTriggerProps {
  children: ReactNode
}

export function Trigger({ children, ...props }: TriggerProps) {
  return <RadixPopover.Trigger {...props}>{children}</RadixPopover.Trigger>
}
