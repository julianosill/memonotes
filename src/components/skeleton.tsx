import { ComponentProps } from 'react'

import { cn } from '@/utils/class-name-merge'

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl border border-transparent bg-card opacity-50 shadow dark:border-border-soft',
        className,
      )}
      {...props}
    />
  )
}
