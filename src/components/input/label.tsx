import { ComponentProps } from 'react'

import { cn } from '@/utils/class-name-merge'

import { useInput } from './root'

type LabelProps = ComponentProps<'label'>

export function Label(props: LabelProps) {
  const { id } = useInput()

  if (!id) throw new Error('Input.Label must be used inside of Input.Root')

  return (
    <label
      htmlFor={id}
      {...props}
      className={cn(
        'text-sm font-medium text-muted-foreground lg:text-base',
        props.className,
      )}
    />
  )
}
