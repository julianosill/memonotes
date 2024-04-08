import { NotebookText } from 'lucide-react'

import { fetchTags } from '@/api/fetch-tags'
import { getUserServer } from '@/libs/next-auth'

import { Account } from './_account/account'
import { Sidebar } from './_sidebar'
import { AddNoteButton } from './add-note-button'
import { NavItem } from './nav-item'
import { Tags } from './tags'

export async function Menu() {
  const user = await getUserServer()
  const tags = await fetchTags()

  return (
    <Sidebar>
      <nav>
        <NavItem href="/" icon={<NotebookText />}>
          Notas
        </NavItem>
      </nav>

      <section className="mt-6 border-y border-memonotes-500 py-6 dark:border-memonotes-800">
        <AddNoteButton />
      </section>

      {tags.length > 0 && <Tags tags={tags} />}

      <Account user={user} />
    </Sidebar>
  )
}
