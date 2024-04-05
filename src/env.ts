import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    API_KEY: z.string(),
    AUTH_DOMAIN: z.string(),
    PROJECT_ID: z.string(),
    STORAGE_BUCKET: z.string(),
    MESSAGING_SENDER_ID: z.string(),
    APP_ID: z.string(),
    MEASUREMENT_ID: z.string(),
    COLLECTION_NAME: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    COLLECTION_NAME: process.env.COLLECTION_NAME,
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  },
})
