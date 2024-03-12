import { NotebookText, Tag } from 'lucide-react'

import { AddNoteButton } from '../new-note/add-note-button'
import { ThemeSwitcher } from '../theme-switcher'
import { PageButton } from './page-button'
import { Tags } from './tags'

export function Sidebar() {
  return (
    <aside className="bg-memonotes-600 dark:bg-memonotes-900 relative flex flex-col gap-20 rounded-2xl p-10 ">
      <h1 className="text-2xl font-bold text-primary-foreground">memonotes</h1>

      <section className="space-y-10">
        <AddNoteButton />
        <nav className="border-memonotes-500 dark:border-memonotes-800 flex flex-col gap-2 border-y py-8">
          <PageButton active className="group">
            <NotebookText className="text-memonotes-400 dark:text-memonotes-600 size-5 group-hover:text-white" />
            Notas
          </PageButton>
          <PageButton className="group">
            <Tag className="text-memonotes-400 dark:text-memonotes-600 size-5 group-hover:text-white" />
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
