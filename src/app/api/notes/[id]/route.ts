import { doc, getDoc } from 'firebase/firestore'
import { z } from 'zod'

import { db } from '@/libs/firebase'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = z.string().parse(params.id)

  const docRef = doc(db, 'test', id)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data()

  if (!data)
    return Response.json({ message: 'Note not found' }, { status: 404 })

  const note = {
    id: docSnap.id,
    title: data.title,
    content: data.content,
    tags: data.tags,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
  }

  return Response.json(note)
}
