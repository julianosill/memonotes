import { ComponentProps, ForwardedRef, forwardRef } from 'react'

import { cn } from '@/utils/class-name-merge'

import { useInput } from './root'

export const Control = forwardRef(
  (
    { type, className, ...props }: ComponentProps<'input'>,
    forwardedRef: ForwardedRef<HTMLInputElement>,
  ) => {
    const { id } = useInput()

    if (!id) throw new Error('Input.Control must be used inside of Input.Root')

    return (
      <input
        id={id}
        ref={forwardedRef}
        type={type || 'text'}
        className={cn(
          'w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground',
          className,
        )}
        {...props}
      />
    )
  },
)

Control.displayName = 'Control'
