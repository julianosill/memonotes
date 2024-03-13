import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type WrapperProps = ComponentProps<'div'>

export function Wrapper(props: WrapperProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'flex items-center gap-2 rounded-md border border-border-soft px-3 py-2',
        'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring-soft',
        props.className,
      )}
    />
  )
}
