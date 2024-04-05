'use server'

import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { env } from '@/env'
import { getUserServer } from '@/libs/auth'
import { db } from '@/libs/firebase'

export async function deleteNote(id: string) {
  const session = await getUserServer()
  if (!session) throw new Error('Unauthorized')
  const userId = session?.user.id

  const docRef = doc(db, env.COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)
  const note = docSnap.data()

  if (!note) {
    throw new Error('Note not found')
  }

  if (note.userId !== userId) {
    throw new Error('Unauthorized')
  }

  await deleteDoc(doc(db, env.COLLECTION_NAME, id))

  revalidateTag('notes')
  redirect('/')
}
