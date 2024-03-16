import { NotebookText } from 'lucide-react'

import { ThemeSwitcher } from '../theme-switcher'
import { AddNoteButton } from './add-note-button'
import { NavItem } from './nav-item'
import { Tags } from './tags'

export function Sidebar() {
  return (
    <aside className="relative flex flex-col gap-20 rounded-2xl bg-memonotes-600 p-10 dark:bg-memonotes-900 ">
      <h1 className="text-2xl font-bold text-primary-foreground">memonotes</h1>

      <div className="space-y-10">
        <nav>
          <NavItem href="/" icon={<NotebookText />}>
            Notas
          </NavItem>
        </nav>
        <section className="flex flex-col gap-2 border-y border-memonotes-500 py-10 dark:border-memonotes-800">
          <AddNoteButton to="/add" />
        </section>
        <Tags />
      </div>

      <div className="mt-auto">
        <ThemeSwitcher />
      </div>
    </aside>
  )
}
