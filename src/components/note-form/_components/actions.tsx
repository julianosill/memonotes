import { CircleCheck, LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface FormActionsProps {
  isSubmitting?: boolean
  onCancel: () => void
}

export function FormActions({ isSubmitting, onCancel }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-4">
      <Button type="button" onClick={onCancel} variant="muted">
        Cancelar
      </Button>
      <Button type="submit">
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <CircleCheck className="size-5" />
            Salvar
          </>
        )}
      </Button>
    </div>
  )
}
