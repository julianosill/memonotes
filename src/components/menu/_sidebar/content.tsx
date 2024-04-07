import * as Collapsible from '@radix-ui/react-collapsible'

import { cn } from '@/utils/class-name-merge'

export function SidebarContent({
  children,
}: Collapsible.CollapsibleContentProps) {
  return (
    <Collapsible.Content
      forceMount
      className={cn(
        'flex flex-1 flex-col py-6',
        'data-[state=closed]:hidden',
        'md:pb-0 md:pt-8 md:data-[state=closed]:flex',
      )}
    >
      {children}
    </Collapsible.Content>
  )
}
