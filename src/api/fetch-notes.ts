'use server'

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

import { INote } from '@/@types/note'
import { env } from '@/env'
import { db } from '@/libs/firebase'
import { getUserServer } from '@/libs/next-auth'

interface FetchNotesProps {
  tag?: string
}

export async function fetchNotes({ tag }: FetchNotesProps = {}) {
  const session = await getUserServer()
  if (!session) throw new Error('Unauthorized')
  const userId = session?.user.id

  const notes: INote[] = []
  const docsRef = collection(db, env.COLLECTION_NAME)
  let q = query(
    docsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  )

  if (tag) {
    q = query(
      docsRef,
      where('userId', '==', userId),
      where('tags', 'array-contains', tag),
    )
  }

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

  return notes
}
