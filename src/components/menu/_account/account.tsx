'use client'

import { Ellipsis, User2 } from 'lucide-react'
import Image from 'next/image'
import { Session } from 'next-auth'
import { useRef } from 'react'

import { AboutDialog } from '@/components/about-dialog'
import { Dialog } from '@/components/dialog'
import { DropdownMenu } from '@/components/dropdown-menu'
import { cn } from '@/utils/class-name-merge'

import { AccountContent } from './account-content'

interface AccountProps {
  user: Session['user']
}

export function Account({ user }: AccountProps) {
  const accountTriggerRef = useRef(null)

  const image = user.image
  const [firstName] = user.name?.split(' ') ?? ['Visitante']

  return (
    <section className="mt-6 border-t border-memonotes-500 pt-4 dark:border-memonotes-800">
      <Dialog.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            ref={accountTriggerRef}
            className={cn(
              'group flex w-full items-center justify-start gap-3 outline-none md:gap-2',
              'text-zinc-200 dark:text-zinc-300',
              'transition-colors hover:text-white dark:hover:text-white',
              'focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
            )}
          >
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-memonotes-500 text-memonotes-300 dark:bg-memonotes-800 md:size-7">
              {image ? (
                <Image
                  src={image}
                  width={40}
                  height={40}
                  alt="Foto de Juliano Sill"
                  className="size-full rounded-full"
                />
              ) : (
                <User2 className="size-5 md:size-4" />
              )}
            </div>

            <span className="flex-1 truncate text-left text-base font-medium md:text-sm">
              {firstName}
            </span>

            <Ellipsis className="size-6 transition-opacity group-hover:opacity-100 md:size-5 md:opacity-50" />
          </DropdownMenu.Trigger>
          <AccountContent user={user} />
        </DropdownMenu.Root>

        <AboutDialog trigger={accountTriggerRef} />
      </Dialog.Root>
    </section>
  )
}
