import { ComponentProps } from 'react'

import { cn } from '@/utils/class-name-merge'

type TextLinkProps = ComponentProps<'a'>

export function TextLink({ href, className, ...props }: TextLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'font-medium text-strong underline underline-offset-2 hover:text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}
