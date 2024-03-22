import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import { ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { DropdownMenu } from '@/components/dropdown-menu'

export const SettingsItem = forwardRef(
  (
    { className, ...props }: DropdownMenuItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <DropdownMenu.Item
        ref={forwardedRef}
        className={twMerge(
          '-mx-2 flex cursor-pointer items-center gap-1.5 rounded p-2 py-1.5 text-sm font-medium text-foreground outline-none transition-colors',
          'hover:bg-accent hover:text-strong',
          'focus-visible:bg-accent',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)

SettingsItem.displayName = 'SettingsItem'
