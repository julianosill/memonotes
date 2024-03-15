import * as RadixTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TriggerProps {
  children: ReactNode
  asChild?: boolean
}

export function Trigger({ asChild, children }: TriggerProps) {
  return (
    <RadixTooltip.Trigger asChild={asChild}>{children}</RadixTooltip.Trigger>
  )
}
