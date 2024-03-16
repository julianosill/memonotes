'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from './ui/button'

type BackButtonProps = ComponentProps<'button'>

export function BackButton({ className, ...props }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button
      onClick={router.back}
      variant="ghost"
      size="sm"
      className={twMerge(
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
