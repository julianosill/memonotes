import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { env } from '@/env'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | memonotes',
    default: 'memonotes',
  },
  description:
    'Aplicação web para gerenciamento de notas e transcrição de áudio em tempo real.',
  metadataBase: new URL(env.NEXT_PUBLIC_APP_BASE_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-500/50`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>
          <Toaster richColors position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
