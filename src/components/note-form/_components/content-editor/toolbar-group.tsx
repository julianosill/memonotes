import * as Toolbar from '@radix-ui/react-toolbar'

import { cn } from '@/utils/class-name-merge'

export function ToolbarGroup({
  className,
  ...props
}: Toolbar.ToggleGroupProps) {
  return (
    <Toolbar.ToggleGroup className={cn('flex gap-2', className)} {...props} />
  )
}
