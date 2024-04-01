import { collection, getDocs, orderBy, query } from 'firebase/firestore'

import { INote } from '@/data/types/note'
import { db } from '@/libs/firebase'

export async function GET() {
  const notes: INote[] = []
  const docsRef = collection(db, 'test')
  const q = query(docsRef, orderBy('createdAt', 'desc'))
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

  return Response.json(notes)
}
