'use server'

import { addDoc, collection } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { db } from '@/libs/firebase'
import { getUserServer } from '@/libs/next-auth'

interface CreateNoteProps {
  title: string
  content: string
  tags: string[]
}

export async function createNote({ title, content, tags }: CreateNoteProps) {
  const { id: userId } = await getUserServer()

  await addDoc(collection(db, env.COLLECTION_NAME), {
    userId,
    title,
    content,
    tags,
    createdAt: new Date(),
  })

  revalidateTag('notes')
}
