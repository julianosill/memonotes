'use client'

import { CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'
import { useSidebar } from './_sidebar'

export function AddNoteButton() {
  const { onNavigation } = useSidebar()
  const router = useRouter()

  function handleNavigation() {
    onNavigation()
    router.push('/add')
  }

  return (
    <Button
      onClick={handleNavigation}
      className="group w-full justify-start whitespace-nowrap bg-memonotes-500 dark:bg-memonotes-800 dark:hover:bg-memonotes-700 dark:hover:text-white max-md:py-3 md:text-sm"
    >
      <CirclePlus className="size-5 text-memonotes-300 transition-colors group-hover:text-primary dark:group-hover:text-white md:size-4" />
      Nova nota
    </Button>
  )
}
