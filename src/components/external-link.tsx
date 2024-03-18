import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type ExternalLinkProps = ComponentProps<'a'>

export function ExternalLink({ href, className, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={twMerge(
        'font-medium text-strong underline underline-offset-2 hover:text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}
