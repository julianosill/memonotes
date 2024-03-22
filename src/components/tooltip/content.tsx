import * as Tooltip from '@radix-ui/react-tooltip'
import { ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Content = forwardRef(
  (
    { children, className, ...props }: Tooltip.TooltipContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Tooltip.Portal>
        <Tooltip.Content
          ref={forwardedRef}
          sideOffset={4}
          className={twMerge(
            'z-20 rounded-md bg-background px-3 py-2 text-sm shadow-lg ring-1 ring-border-soft',
            className,
          )}
          {...props}
        >
          {children}
          <Tooltip.Arrow width={12} height={6} className="fill-background" />
        </Tooltip.Content>
      </Tooltip.Portal>
    )
  },
)

Content.displayName = 'Content'
