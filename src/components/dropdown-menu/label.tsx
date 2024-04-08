import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/class-name-merge'

export function Label({
  className,
  ...props
}: DropdownMenu.DropdownMenuLabelProps) {
  return (
    <DropdownMenu.Label
      className={cn('pb-1 text-sm font-semibold', className)}
      {...props}
    />
  )
}
