'use client'

import { NotebookPen } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Tooltip } from './tooltip'
import { Button } from './ui/button'

interface EditNoteButtonProps {
  id: string
}

export function EditNoteButton({ id }: EditNoteButtonProps) {
  const router = useRouter()

  function handleNavigation() {
    router.push(`/edit/${id}`)
  }
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          onClick={handleNavigation}
          variant="ghost"
          size="sm"
          className="h-fit p-2 text-muted-foreground"
        >
          <NotebookPen className="size-5" />
          <span className="sr-only">Editar nota</span>
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Editar nota</Tooltip.Content>
    </Tooltip.Root>
  )
}
