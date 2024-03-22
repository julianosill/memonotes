'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { createContext, useContext, useState } from 'react'

const DialogContext = createContext(false)

export function Root({ children, ...props }: AlertDialog.AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DialogContext.Provider value={isOpen}>
      <AlertDialog.Root onOpenChange={setIsOpen} {...props}>
        {children}
      </AlertDialog.Root>
    </DialogContext.Provider>
  )
}

export const useAlertDialog = () => useContext(DialogContext)
