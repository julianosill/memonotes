'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    const query = data.q

    if (!query) return null

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className={twMerge(
        'group relative flex w-full max-w-64 items-center gap-4 border-b-2 py-2',
        'border-transparent text-muted-foreground',
        'transition-colors focus-within:border-border focus-within:text-foreground',
      )}
    >
      <label htmlFor="search" className="sr-only">
        Pesquisar
      </label>

      <Search />

      <input
        name="q"
        id="search"
        type="text"
        defaultValue={query ?? ''}
        placeholder="Procure em suas notas..."
        className={twMerge(
          'w-full bg-transparent outline-none placeholder:text-muted-foreground',
        )}
        required
      />
    </form>
  )
}
