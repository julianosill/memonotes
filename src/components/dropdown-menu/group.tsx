import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { twMerge } from 'tailwind-merge'

export function Group({
  className,
  ...props
}: DropdownMenu.DropdownMenuGroupProps) {
  return (
    <DropdownMenu.Group
      className={twMerge('space-y-1', className)}
      {...props}
    />
  )
}
