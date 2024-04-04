'use server'

import { doc, getDoc } from 'firebase/firestore'

import { env } from '@/env'
import { db } from '@/libs/firebase'

interface GetNoteProps {
  userId: string
  noteId: string
}

export async function getNote({ userId, noteId }: GetNoteProps) {
  const docRef = doc(db, env.COLLECTION_NAME, noteId)
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
