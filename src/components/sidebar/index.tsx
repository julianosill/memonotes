import { NotebookText, Tag } from 'lucide-react'

import { AddNoteButton } from '../add-note/add-note-button'
import { ThemeSwitcher } from '../theme-switcher'
import { PageButton } from './page-button'
import { Tags } from './tags'

export function Sidebar() {
  return (
    <aside className="relative flex flex-col gap-20 rounded-2xl bg-memonotes-600 p-10 dark:bg-memonotes-900 ">
      <h1 className="text-2xl font-bold text-primary-foreground">memonotes</h1>

      <section className="space-y-10">
        <AddNoteButton />
        <nav className="flex flex-col gap-2 border-y border-memonotes-500 py-8 dark:border-memonotes-800">
          <PageButton active className="group">
            <NotebookText className="size-5 text-memonotes-400 group-hover:text-white dark:text-memonotes-600" />
            Notas
          </PageButton>
          <PageButton className="group">
            <Tag className="size-5 text-memonotes-400 group-hover:text-white dark:text-memonotes-600" />
            Tags
          </PageButton>
        </nav>
        <Tags />
      </section>

      <div className="mt-auto">
        <ThemeSwitcher />
      </div>
    </aside>
  )
}
