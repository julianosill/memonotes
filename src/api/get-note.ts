'use server'

import { doc, getDoc } from 'firebase/firestore'

import { env } from '@/env'
import { getUserServer } from '@/libs/auth'
import { db } from '@/libs/firebase'

export async function getNote(id: string) {
  const session = await getUserServer()
  if (!session) throw new Error('Unauthorized')
  const userId = session?.user.id

  const docRef = doc(db, env.COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data()

  if (!data) {
    throw new Error('Note not found')
  }

  if (data.userId !== userId) {
    throw new Error('Unauthorized')
  }

  const note = {
    id: docSnap.id,
    title: data.title,
    content: data.content,
    tags: data.tags,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
  }

  return note
}
