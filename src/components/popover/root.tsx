import * as RadixPopover from '@radix-ui/react-popover'
import { ReactNode } from 'react'

interface RootProps {
  children: ReactNode
}
export function Root({ children }: RootProps) {
  return <RadixPopover.Root>{children}</RadixPopover.Root>
}
