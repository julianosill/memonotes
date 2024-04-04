'use server'

import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { env } from '@/env'
import { db } from '@/libs/firebase'

interface DeleteNoteProps {
  userId: string
  noteId: string
}

export async function deleteNote({ userId, noteId }: DeleteNoteProps) {
  const docRef = doc(db, env.COLLECTION_NAME, noteId)
  const docSnap = await getDoc(docRef)
  const note = docSnap.data()

  if (!note) {
    throw new Error('Note not found')
  }

  if (note.userId !== userId) {
    throw new Error('Unauthorized')
  }

  await deleteDoc(doc(db, env.COLLECTION_NAME, noteId))

  revalidateTag('notes')
  redirect('/')
}
