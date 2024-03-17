import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentProps, forwardRef } from 'react'

import { cn } from '@/utils/class-name-merge'

const buttonVariants = cva(
  'flex items-center justify-center rounded-md font-medium leading-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
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
        default: 'h-10 px-4 gap-2',
        sm: 'h-8 px-3 gap-1.5 text-sm',
        xs: 'h-6 px-2 gap-1 text-xs rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
