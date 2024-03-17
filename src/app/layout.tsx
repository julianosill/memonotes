import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { ThemeColorProvider } from '@/providers/theme-color-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    template: '%s | memonotes',
    default: 'memonotes',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased transition-colors">
        <ThemeColorProvider>
          <Toaster richColors position="top-right" closeButton />
          {children}
        </ThemeColorProvider>
      </body>
    </html>
  )
}
