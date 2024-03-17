import * as RadixPopover from '@radix-ui/react-popover'
import { X } from 'lucide-react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../ui/button'

interface ContentProps extends RadixPopover.PopoverContentProps {
  children: ReactNode
}

export function Content({ children, className, ...props }: ContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={4}
        side="top"
        className={twMerge(
          'rounded-md bg-background p-4 text-sm shadow-lg ring-1 ring-border-soft',
          className,
        )}
        {...props}
      >
        <RadixPopover.Close asChild>
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-1 top-1 size-6 p-0 text-muted-foreground"
          >
            <X className="size-5 sm:size-4" />
          </Button>
        </RadixPopover.Close>
        {children}
        <RadixPopover.Arrow width={12} height={6} className="fill-background" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
}
