'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, ReactElement, ReactNode } from 'react'

import { cn } from '@/utils/class-name-merge'

import { useSidebar } from './_sidebar'

export interface NavItemProps extends ComponentProps<typeof Link> {
  icon?: ReactElement
  children: ReactNode
}

export function NavItem({ icon: Icon, children, ...props }: NavItemProps) {
  const { onNavigation } = useSidebar()
  const pathname = usePathname()
  const isActive = pathname === props.href

  return (
    <Link
      onClick={onNavigation}
      className={cn(
        'group flex items-center gap-3 py-2 text-lg font-medium md:text-base',
        'text-zinc-200 hover:text-white',
        'dark:text-zinc-300 dark:hover:text-white',
      )}
      {...props}
    >
      {Icon && (
        <Icon.type
          {...Icon.props}
          className={cn(
            'size-6 group-hover:text-white md:size-5',
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
