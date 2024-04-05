'use server'

import { addDoc, collection } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { getUserServer } from '@/libs/auth'
import { db } from '@/libs/firebase'

interface CreateNoteProps {
  title: string
  content: string
  tags: string[]
}

export async function createNote({ title, content, tags }: CreateNoteProps) {
  const session = await getUserServer()
  if (!session) throw new Error('Unauthorized')
  const userId = session?.user.id

  await addDoc(collection(db, env.COLLECTION_NAME), {
    userId,
    title,
    content,
    tags,
    createdAt: new Date(),
  })

  revalidateTag('notes')
}
