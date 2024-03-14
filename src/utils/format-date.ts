interface FormatDateProps {
  date: Date
  withTime?: boolean
}

export function formatDate({ date, withTime }: FormatDateProps) {
  if (withTime) {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
