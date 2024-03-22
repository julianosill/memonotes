import * as Tooltip from '@radix-ui/react-tooltip'

export function Root({ children }: Tooltip.TooltipProps) {
  return (
    <Tooltip.Provider delayDuration={400}>
      <Tooltip.Root>{children}</Tooltip.Root>
    </Tooltip.Provider>
  )
}
