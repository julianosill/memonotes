import { ComponentProps } from 'react'

import { cn } from '@/utils/class-name-merge'

export function Error({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn('absolute -bottom-6 text-sm text-red-500', className)}
      {...props}
    />
  )
}
