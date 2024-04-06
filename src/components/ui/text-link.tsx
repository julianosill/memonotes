import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TextLinkProps = ComponentProps<'a'>

export function TextLink({ href, className, ...props }: TextLinkProps) {
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
