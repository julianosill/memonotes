import { redirect } from 'next/navigation'
import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'

export const nextAuthConfig: NextAuthOptions = {
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
  const session = await getServerSession(nextAuthConfig)
  if (!session) return redirect('/sign-in')
}

export async function getUserServer() {
  const session = await getServerSession(nextAuthConfig)
  const user = session?.user

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}
