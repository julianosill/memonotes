import * as RadixTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ContentProps extends RadixTooltip.TooltipContentProps {
  children: ReactNode
}

export function Content({ children, className, ...props }: ContentProps) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        sideOffset={4}
        className={twMerge(
          'rounded-md bg-background px-3 py-2 text-sm shadow-lg ring-1 ring-border-soft',
          className,
        )}
        {...props}
      >
        {children}
        <RadixTooltip.Arrow width={12} height={6} className="fill-background" />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  )
}
