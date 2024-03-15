import * as RadixTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
}

export function Root({ children }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={400}>
      <RadixTooltip.Root>{children}</RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
