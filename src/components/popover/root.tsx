import * as RadixPopover from '@radix-ui/react-popover'
import { ReactNode } from 'react'

interface RootProps extends RadixPopover.PopoverProps {
  children: ReactNode
}
export function Root({ children, ...props }: RootProps) {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>
}
