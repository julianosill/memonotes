import * as Tooltip from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { ForwardedRef, forwardRef } from 'react'

import { cn } from '@/utils/class-name-merge'

import { useTooltip } from './root'

export const Content = forwardRef(
  (
    { children, className, ...props }: Tooltip.TooltipContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const isOpen = useTooltip()

    const contentVariants = {
      closed: { opacity: 0, y: 6 },
      open: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          bounce: 0.5,
          duration: 0.3,
        },
      },
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <Tooltip.Portal forceMount>
            <Tooltip.Content
              asChild
              ref={forwardedRef}
              sideOffset={4}
              className={cn(
                'z-30 rounded-md bg-background px-3 py-2 text-sm shadow-lg ring-1 ring-border-soft',
                className,
              )}
              {...props}
            >
              <motion.div
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {children}
                <Tooltip.Arrow
                  width={12}
                  height={6}
                  className="fill-background"
                />
              </motion.div>
            </Tooltip.Content>
          </Tooltip.Portal>
        )}
      </AnimatePresence>
    )
  },
)

Content.displayName = 'Content'
