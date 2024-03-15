import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { useInput } from './root'

type TextareaProps = ComponentProps<'textarea'>

export function Textarea(props: TextareaProps) {
  const { id } = useInput()

  if (!id) throw new Error('Input.Textarea must be used inside of Input.Root')

  return (
    <textarea
      id={id}
      {...props}
      className={twMerge(
        'h-full min-h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground',
        props.className,
      )}
    />
  )
}
