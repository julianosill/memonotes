import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'
import { ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useDropdownMenu } from './root'

export const Content = forwardRef(
  (
    { children, className, ...props }: DropdownMenu.DropdownMenuContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const isOpen = useDropdownMenu()

    const contentVariants = {
      closed: { opacity: 0, y: 4 },
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
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              ref={forwardedRef}
              asChild
              side="top"
              align="start"
              sideOffset={4}
              className={twMerge(
                'z-20 flex max-w-fit flex-col gap-4 rounded-md bg-card p-6 shadow-lg ring-1 ring-border-soft max-md:w-[calc(100vw-3rem)]',
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
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    )
  },
)

Content.displayName = 'Content'
