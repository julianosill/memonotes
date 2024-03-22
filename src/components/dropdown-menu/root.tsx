import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { createContext, useContext, useState } from 'react'

const DropdownMenuContext = createContext(false)

export function Root({ children, ...props }: DropdownMenu.DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={isOpen}>
      <DropdownMenu.Root onOpenChange={setIsOpen} {...props}>
        {children}
      </DropdownMenu.Root>
    </DropdownMenuContext.Provider>
  )
}

export const useDropdownMenu = () => useContext(DropdownMenuContext)
