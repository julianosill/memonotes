'use server'

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { db } from '@/libs/firebase'
import { getUserServer } from '@/libs/next-auth'

interface UpdateNoteProps {
  id: string
  title: string
  content: string
  tags: string[]
}

export async function updateNote({
  id,
  title,
  content,
  tags,
}: UpdateNoteProps) {
  const { id: userId } = await getUserServer()

  const docRef = doc(db, env.COLLECTION_NAME, id)
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
