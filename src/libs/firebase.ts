import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { env } from '@/env'

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
