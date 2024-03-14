'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface NavItemProps extends ComponentProps<typeof Link> {
  icon?: ReactElement
  children: ReactNode
}

export function NavItem({ icon: Icon, children, ...props }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  return (
    <Link
      className={twMerge(
        'group flex items-center gap-3 py-2 font-medium',
        'text-zinc-200 hover:text-white',
        'dark:text-zinc-300 dark:hover:text-white',
        props.className,
      )}
      {...props}
    >
      {Icon && (
        <Icon.type
          {...Icon.props}
          className={twMerge(
            'size-5 group-hover:text-white',
            isActive
              ? 'text-memonotes-200 dark:text-memonotes-300'
              : 'text-memonotes-400 dark:text-memonotes-600',
          )}
        />
      )}

      {children}

      {isActive && (
        <div className="absolute left-0 h-10 w-1.5 rounded-r bg-memonotes-200 dark:bg-memonotes-300" />
      )}
    </Link>
  )
}
