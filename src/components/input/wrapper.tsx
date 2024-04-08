import { ComponentProps } from 'react'

import { cn } from '@/utils/class-name-merge'

type WrapperProps = ComponentProps<'div'>

export function Wrapper(props: WrapperProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center gap-2 rounded-md border border-border-soft px-3 py-2',
        'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring-soft',
        props.className,
      )}
    />
  )
}
