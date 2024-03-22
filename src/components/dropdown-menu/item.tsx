import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ForwardedRef, forwardRef } from 'react'

export const Item = forwardRef(
  (
    props: DropdownMenu.DropdownMenuItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return <DropdownMenu.Item ref={forwardedRef} {...props} />
  },
)

Item.displayName = 'Item'
