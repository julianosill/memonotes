import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface SettingsItemProps extends DropdownMenu.DropdownMenuItemProps {}

export const SettingsItem = forwardRef<HTMLDivElement, SettingsItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <DropdownMenu.Item
        ref={ref}
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
