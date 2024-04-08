import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/class-name-merge'

export function Group({
  className,
  ...props
}: DropdownMenu.DropdownMenuGroupProps) {
  return (
    <DropdownMenu.Group className={cn('space-y-1', className)} {...props} />
  )
}
