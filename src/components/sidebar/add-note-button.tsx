'use client'

import { CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

interface AddNoteButtonProps {
  to: string
}

export function AddNoteButton({ to }: AddNoteButtonProps) {
  const router = useRouter()

  function handleNavigation() {
    router.push(to)
  }

  return (
    <Button
      onClick={handleNavigation}
      className="group whitespace-nowrap bg-memonotes-500 text-sm dark:bg-memonotes-800 dark:hover:bg-memonotes-700 dark:hover:text-white"
    >
      <CirclePlus className="size-4 text-memonotes-300 transition-colors group-hover:text-primary dark:group-hover:text-white" />
      Adicionar nota
    </Button>
  )
}
