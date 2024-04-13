import * as Toolbar from '@radix-ui/react-toolbar'

import { cn } from '@/utils/class-name-merge'

export function ToolbarButton({
  className,
  ...props
}: Toolbar.ToolbarButtonProps) {
  return (
    <Toolbar.Button
      className={cn(
        'flex size-6 items-center justify-center rounded data-[state=on]:bg-muted hover:bg-muted',
        className,
      )}
      {...props}
    />
  )
}
