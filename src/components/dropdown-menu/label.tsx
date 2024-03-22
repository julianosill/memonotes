import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { twMerge } from 'tailwind-merge'

export function Label({
  className,
  ...props
}: DropdownMenu.DropdownMenuLabelProps) {
  return (
    <DropdownMenu.Label
      className={twMerge('pb-1 text-sm font-semibold', className)}
      {...props}
    />
  )
}
