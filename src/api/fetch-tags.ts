'use server'

import { collection, getDocs, query, where } from 'firebase/firestore'

import { env } from '@/env'
import { db } from '@/libs/firebase'
import { getUserServer } from '@/libs/next-auth'

export async function fetchTags() {
  const session = await getUserServer()
  if (!session) throw new Error('Unauthorized')
  const userId = session?.user.id

  const noteTags: string[] = []
  const docsRef = collection(db, env.COLLECTION_NAME)
  const q = query(docsRef, where('userId', '==', userId))

  await getDocs(q).then((snapshot) =>
    snapshot.forEach((doc) => noteTags.push(doc.data().tags)),
  )

  const tags = Array.from(new Set(noteTags.flat())).sort()

  return tags
}
