import * as Popover from '@radix-ui/react-popover'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { ForwardedRef, forwardRef } from 'react'

import { cn } from '@/utils/class-name-merge'

import { Button } from '../ui/button'
import { usePopover } from './root'

export const Content = forwardRef(
  (
    { children, className, ...props }: Popover.PopoverContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const isOpen = usePopover()

    const contentVariants = {
      closed: { opacity: 0, scale: 0.975, y: 12 },
      open: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: 'spring',
          bounce: 0.5,
          duration: 0.5,
        },
      },
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <Popover.Portal>
            <Popover.Content
              ref={forwardedRef}
              side="top"
              collisionPadding={16}
              sideOffset={4}
              className={cn(
                'z-30 w-[calc(100vw-36px)] rounded-md bg-background p-4 text-sm shadow-lg ring-1 ring-border-soft',
                className,
              )}
              asChild
              {...props}
            >
              <motion.div
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <Popover.Close asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1 size-6 p-0 text-muted-foreground"
                  >
                    <X className="size-5 sm:size-4" />
                  </Button>
                </Popover.Close>
                {children}
                <Popover.Arrow
                  width={12}
                  height={6}
                  className="fill-background"
                />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    )
  },
)

Content.displayName = 'Content'
