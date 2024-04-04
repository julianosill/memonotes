'use server'

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { db } from '@/libs/firebase'

interface UpdateNoteProps {
  userId: string
  noteId: string
  title: string
  content: string
  tags: string[]
}

export async function updateNote({
  userId,
  noteId,
  title,
  content,
  tags,
}: UpdateNoteProps) {
  const docRef = doc(db, env.COLLECTION_NAME, noteId)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data()

  if (!data) {
    throw new Error('Note not found')
  }

  if (data.userId !== userId) {
    throw new Error('Unauthorized')
  }

  await updateDoc(docRef, {
    title,
    content,
    tags,
    updatedAt: new Date(),
  })

  revalidateTag('notes')
}
