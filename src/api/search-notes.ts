'use server'

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

import { INote } from '@/@types/note'
import { env } from '@/env'
import { db } from '@/libs/firebase'
import { getUserServer } from '@/libs/next-auth'

export async function searchNotes(search: string) {
  const { id: userId } = await getUserServer()

  const notes: INote[] = []
  const docsRef = collection(db, env.COLLECTION_NAME)
  const q = query(
    docsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  )

  await getDocs(q).then((snapshot) =>
    snapshot.forEach((doc) =>
      notes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        tags: doc.data().tags,
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt ? doc.data().updatedAt.toDate() : null,
      }),
    ),
  )

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  })

  return filteredNotes
}
