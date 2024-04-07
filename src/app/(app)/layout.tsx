import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Menu } from '@/components/menu'
import { loginRequiredServer } from '@/libs/next-auth'

export default async function AppLayout({ children }: { children: ReactNode }) {
  await loginRequiredServer()

  return (
    <div
      className={twMerge(
        'flex min-h-screen flex-1 overflow-hidden p-6',
        'md:grid md:grid-cols-app md:gap-8 md:p-12',
        'lg:gap-12',
      )}
    >
      <Menu />
      <div className="flex w-full flex-col pt-14 md:col-start-2 md:pt-0">
        {children}
      </div>
    </div>
  )
}
