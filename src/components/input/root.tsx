import { ComponentProps, createContext, useContext, useId } from 'react'

import { cn } from '@/utils/class-name-merge'

type RootProps = ComponentProps<'div'>

interface InputContextType {
  id: string
}

const InputContext = createContext({} as InputContextType)

export function Root({ className, ...props }: RootProps) {
  const id = useId()

  return (
    <InputContext.Provider value={{ id }}>
      <div className={cn('relative', className)} {...props} />
    </InputContext.Provider>
  )
}

export const useInput = () => useContext(InputContext)
