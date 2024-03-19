import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { ThemeColorProvider } from '@/providers/theme-color-provider'

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
  metadataBase: new URL('https://memonotes-js.vercel.app'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} scrollbar-thin scrollbar-track-transparent scrollbar-thumb-memonotes-500`}
      suppressHydrationWarning
    >
      <body className="antialiased transition-colors ">
        <ThemeColorProvider>
          <Toaster richColors position="top-right" closeButton />
          {children}
        </ThemeColorProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
