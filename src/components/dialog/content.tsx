import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { ForwardedRef, forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/class-name-merge'

import { useDialog } from './root'

export const Content = forwardRef(
  (
    { children, className, ...props }: Dialog.DialogContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const isOpen = useDialog()

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
          <Dialog.Portal forceMount>
            <Dialog.Overlay
              className="fixed inset-0 z-20 bg-memonotes-950/90 backdrop-blur-sm dark:bg-zinc-950/90"
              asChild
            >
              <motion.div
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
              />
            </Dialog.Overlay>
            <Dialog.Content
              forceMount
              ref={forwardedRef}
              className={cn(
                'fixed inset-0 z-20 m-auto flex h-screen w-full max-w-[768px] flex-col overflow-y-auto bg-card px-8 py-12 sm:p-12 md:justify-center',
                'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground',
                'md:max-h-[80vh] md:w-10/12',
                'md:rounded-xl md:border md:border-border-soft md:shadow-md',
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
                <Dialog.Close asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-6 top-6 size-8 p-0 text-muted-foreground md:right-4 md:top-4"
                  >
                    <X className="size-6 sm:size-5" />
                    <span className="sr-only">Fechar</span>
                  </Button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    )
  },
)

Content.displayName = 'Content'
