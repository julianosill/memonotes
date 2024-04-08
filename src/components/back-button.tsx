'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

import { cn } from '@/utils/class-name-merge'

import { Button } from './ui/button'

type BackButtonProps = ComponentProps<'button'>

export function BackButton({ className, ...props }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button
      onClick={router.back}
      variant="ghost"
      size="sm"
      className={cn(
        'px-0 text-muted-foreground transition-all hover:px-3',
        className,
      )}
      {...props}
    >
      <ArrowLeft className="size-4" />
      Voltar
    </Button>
  )
}
