import NextAuth from 'next-auth'

import { nextAuthConfig } from '@/libs/next-auth'

const handler = NextAuth(nextAuthConfig)

export { handler as GET, handler as POST }
