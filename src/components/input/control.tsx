import { ComponentProps } from 'react'

import { cn } from '@/utils/class-name-merge'

import { useInput } from './root'

type ControlProps = ComponentProps<'input'>

export function Control(props: ControlProps) {
  const { id } = useInput()

  if (!id) throw new Error('Input.Control must be used inside of Input.Root')

  return (
    <input
      id={id}
      type={props.type ? props.type : 'text'}
      {...props}
      className={cn(
        'w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground',
        props.className,
      )}
    />
  )
}
