import { redirect } from 'next/navigation'
import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
        }
      }

      return session
    },
  },
}

export async function loginRequiredServer() {
  const session = await getServerSession(authConfig)
  if (!session) return redirect('/api/auth/signin')
}

export async function getUserServer() {
  const session = await getServerSession(authConfig)
  return session
}
