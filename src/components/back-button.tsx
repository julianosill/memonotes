import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from './ui/button'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      onClick={router.back}
      variant="ghost"
      size="sm"
      className="px-0 text-muted-foreground transition-all hover:px-3"
    >
      <ArrowLeft className="size-4" />
      Voltar
    </Button>
  )
}
