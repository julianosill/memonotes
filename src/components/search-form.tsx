'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ComponentProps, FormEvent, useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/utils/class-name-merge'

type SearchFormProps = ComponentProps<'form'>

export function SearchForm({ className, ...props }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q')

  const [query, setQuery] = useState(queryParam ?? '')
  const debouncedSearch = useDebounce(query)

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!query) return null
    router.push(`/search?q=${query}`)
  }

  useEffect(() => {
    router.push(`/search?q=${debouncedSearch}`)
  }, [debouncedSearch, router])

  useEffect(() => {
    !queryParam && setQuery('')
  }, [queryParam])

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        'group relative flex w-64 items-center gap-4 border-b-2 py-2 max-md:w-full',
        'border-transparent text-muted-foreground',
        'transition-colors focus-within:border-border focus-within:text-foreground',
        className,
      )}
      {...props}
    >
      <label htmlFor="search">
        <span className="sr-only">Pesquisar</span>
        <Search className="size-5" />
      </label>

      <input
        name="q"
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Procure em suas notas..."
        className={cn(
          'w-full bg-transparent outline-none placeholder:text-muted-foreground',
        )}
        required
      />
    </form>
  )
}
