'use client'

import { CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

interface AddNoteButtonProps {
  onNavigation: () => void
  to: string
}

export function AddNoteButton({ to, onNavigation }: AddNoteButtonProps) {
  const router = useRouter()

  function handleNavigation() {
    onNavigation()
    router.push(to)
  }

  return (
    <Button
      onClick={handleNavigation}
      className="group h-12 w-full whitespace-nowrap bg-memonotes-500 text-base dark:bg-memonotes-800 dark:hover:bg-memonotes-700 dark:hover:text-white md:h-10 md:text-sm"
    >
      <CirclePlus className="size-5 text-memonotes-300 transition-colors group-hover:text-primary dark:group-hover:text-white md:size-4" />
      Adicionar nota
    </Button>
  )
}
