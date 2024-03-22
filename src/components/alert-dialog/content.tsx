import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAlertDialog } from './root'

export const Content = forwardRef(
  (
    { children, className, ...props }: AlertDialog.AlertDialogContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const isOpen = useAlertDialog()

    const overlayVariants = {
      closed: { opacity: 0 },
      open: { opacity: 1 },
    }

    const contentVariants = {
      closed: { opacity: 0, scale: 0.975, y: 20 },
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
          <AlertDialog.Portal forceMount>
            <AlertDialog.Overlay
              className="fixed inset-0 z-30 bg-memonotes-950/90 backdrop-blur-sm dark:bg-zinc-950/90"
              asChild
            >
              <motion.div
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
              />
            </AlertDialog.Overlay>

            <AlertDialog.Content
              forceMount
              ref={forwardedRef}
              className={twMerge(
                'fixed inset-0 z-30 m-auto h-fit max-h-[80vh] w-fit overflow-y-auto p-8',
                'rounded-xl border border-border-soft bg-card shadow-md',
                '',
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
                {children}
              </motion.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    )
  },
)

Content.displayName = 'Content'
