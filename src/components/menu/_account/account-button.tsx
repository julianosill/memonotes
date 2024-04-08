import { ForwardedRef, forwardRef } from 'react'

import { DropdownMenu } from '@/components/dropdown-menu'
import { Button, ButtonProps } from '@/components/ui/button'

type AccountButtonProps = ButtonProps

export const AccountButton = forwardRef(
  (
    { children, ...props }: AccountButtonProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <DropdownMenu.Item
        asChild
        ref={forwardedRef}
        className="focus-visible:bg-muted focus-visible:ring-1 focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-700"
      >
        <Button
          variant="ghost"
          size="sm"
          className="-mx-3 justify-start gap-2 whitespace-nowrap"
          {...props}
        >
          {children}
        </Button>
      </DropdownMenu.Item>
    )
  },
)

AccountButton.displayName = 'AccountButton'
