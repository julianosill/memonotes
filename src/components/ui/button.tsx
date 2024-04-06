import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentProps, forwardRef } from 'react'

import { cn } from '@/utils/class-name-merge'

const buttonVariants = cva(
  'flex items-center justify-center rounded-md font-medium leading-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-offset-2',
        secondary:
          'bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground',
        outline:
          'bg-transparent text-primary border border-border hover:bg-accent hover:text-accent-foreground',
        muted:
          'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        ghost:
          'bg-transparent text-foreground hover:bg-muted hover:text-strong',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive',
      },
      size: {
        default: 'px-4 py-2.5 gap-2',
        sm: 'px-3 py-1.5 gap-1.5 text-sm',
        xs: 'px-2 py-1 gap-1 text-xs rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
