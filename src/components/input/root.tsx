import { ComponentProps, createContext, useContext, useId } from 'react'

type RootProps = ComponentProps<'div'>

interface InputContextType {
  id: string
}

const InputContext = createContext({} as InputContextType)

export function Root(props: RootProps) {
  const id = useId()

  return (
    <InputContext.Provider value={{ id }}>
      <div {...props} />
    </InputContext.Provider>
  )
}

export const useInput = () => useContext(InputContext)
