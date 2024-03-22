import * as Tooltip from '@radix-ui/react-tooltip'
import { createContext, useContext, useState } from 'react'

const TooltipContext = createContext(false)

export function Root({ children, ...props }: Tooltip.TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TooltipContext.Provider value={isOpen}>
      <Tooltip.Provider delayDuration={400}>
        <Tooltip.Root onOpenChange={setIsOpen} {...props}>
          {children}
        </Tooltip.Root>
      </Tooltip.Provider>
    </TooltipContext.Provider>
  )
}

export const useTooltip = () => useContext(TooltipContext)
