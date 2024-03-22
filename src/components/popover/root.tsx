import * as Popover from '@radix-ui/react-popover'
import { createContext, useContext, useState } from 'react'

const PopoverContext = createContext(false)

export function Root({
  open,
  onOpenChange,
  children,
  ...props
}: Popover.PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PopoverContext.Provider value={open ?? isOpen}>
      <Popover.Root onOpenChange={onOpenChange ?? setIsOpen} {...props}>
        {children}
      </Popover.Root>
    </PopoverContext.Provider>
  )
}

export const usePopover = () => useContext(PopoverContext)
