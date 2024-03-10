import { CirclePlus, NotebookText, Tag } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { ThemeSwitcher } from '../theme-switcher'
import { PageButton } from './page-button'
import { Tags } from './tags'

export function Sidebar() {
  return (
    <aside className="relative flex min-w-64 flex-col gap-20 rounded-2xl bg-primary p-10">
      <h1 className="text-2xl font-bold text-primary-foreground">memonotes</h1>

      <nav className="space-y-10">
        <button
          className={twMerge(
            'group flex w-full items-center gap-3 rounded-md px-4 py-3',
            'bg-border text-sm font-medium text-primary-foreground transition-colors',
            'hover:bg-secondary hover:text-primary',
          )}
        >
          <CirclePlus className="size-4 text-secondary transition-colors group-hover:text-primary" />
          Adicionar nota
        </button>

        <div className="flex flex-col gap-2 border-y border-border py-8">
          <PageButton active className="group">
            <NotebookText className="size-5 text-secondary transition-colors group-hover:text-white" />
            Notas
          </PageButton>
          <PageButton className="group">
            <Tag className="size-5 text-secondary transition-colors group-hover:text-white" />
            Tags
          </PageButton>
        </div>

        <Tags />
      </nav>

      <div className="mt-auto">
        <ThemeSwitcher />
      </div>
    </aside>
  )
}
