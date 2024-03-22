'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { createContext, useContext, useState } from 'react'

const DialogContext = createContext(false)

export function Root({
  open,
  onOpenChange,
  children,
  ...props
}: Dialog.DialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DialogContext.Provider value={open ?? isOpen}>
      <Dialog.Root onOpenChange={onOpenChange ?? setIsOpen} {...props}>
        {children}
      </Dialog.Root>
    </DialogContext.Provider>
  )
}

export const useDialog = () => useContext(DialogContext)
