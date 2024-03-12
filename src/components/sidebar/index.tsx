import { CirclePlus, NotebookText, Tag } from 'lucide-react'

import { ThemeSwitcher } from '../theme-switcher'
import { Button } from '../ui/button'
import { PageButton } from './page-button'
import { Tags } from './tags'

export function Sidebar() {
  return (
    <aside className="bg-memonotes-600 dark:bg-memonotes-900 relative flex flex-col gap-20 rounded-2xl p-10 ">
      <h1 className="text-2xl font-bold text-primary-foreground">memonotes</h1>

      <nav className="space-y-10">
        <Button className="bg-memonotes-500 dark:bg-memonotes-800 dark:hover:bg-memonotes-700 group text-sm dark:hover:text-white">
          <CirclePlus className="text-memonotes-300 size-4 transition-colors group-hover:text-primary dark:group-hover:text-white" />
          Adicionar nota
        </Button>

        <section className="border-memonotes-500 dark:border-memonotes-800 flex flex-col gap-2 border-y py-8">
          <PageButton active className="group">
            <NotebookText className="text-memonotes-400 dark:text-memonotes-600 size-5 group-hover:text-white" />
            Notas
          </PageButton>
          <PageButton className="group">
            <Tag className="text-memonotes-400 dark:text-memonotes-600 size-5 group-hover:text-white" />
            Tags
          </PageButton>
        </section>

        <Tags />
      </nav>

      <div className="mt-auto">
        <ThemeSwitcher />
      </div>
    </aside>
  )
}
