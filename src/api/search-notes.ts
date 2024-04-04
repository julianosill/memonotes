'use server'

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

import { INote } from '@/@types/note'
import { env } from '@/env'
import { db } from '@/libs/firebase'

interface FetchNotesProps {
  userId: string
  search: string
}

export async function searchNotes({ userId, search }: FetchNotesProps) {
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
