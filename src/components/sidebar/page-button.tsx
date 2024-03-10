import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface PageButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  className?: string
  active?: boolean
}

export function PageButton({
  children,
  className,
  active,
  ...props
}: PageButtonProps) {
  return (
    <button
      className={twMerge(
        'flex items-center gap-3 py-2 font-medium text-accent transition-colors',
        'hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
      {active && (
        <div className="absolute left-0 h-10 w-1.5 rounded-r bg-secondary" />
      )}
    </button>
  )
}
