'use server'

import { addDoc, collection } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { db } from '@/libs/firebase'

interface CreateNoteProps {
  userId: string
  title: string
  content: string
  tags: string[]
}

export async function createNote({
  userId,
  title,
  content,
  tags,
}: CreateNoteProps) {
  await addDoc(collection(db, env.COLLECTION_NAME), {
    userId,
    title,
    content,
    tags,
    createdAt: new Date(),
  })

  revalidateTag('notes')
}
