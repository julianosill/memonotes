import { ArrowLeftCircle, Info, SunMoon } from 'lucide-react'
import Image from 'next/image'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Dialog } from '@/components/dialog'
import { DropdownMenu } from '@/components/dropdown-menu'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'

import { AccountButton } from './account-button'

interface AccountContentProps {
  user: Session['user']
}

export function AccountContent({ user }: AccountContentProps) {
  const image = user.image

  async function handleSignOut() {
    await signOut()
  }

  return (
    <DropdownMenu.Content sideOffset={8} className="gap-3 rounded-lg pb-5">
      <header className="flex flex-wrap items-center gap-3 pb-4">
        {image && (
          <Image
            src={image}
            width={48}
            height={48}
            alt="Foto de Juliano Sill"
            className="size-12 rounded-full"
          />
        )}
        <div className="flex flex-col">
          <span className="font-medium">{user.name}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </header>

      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-sm font-medium">
          <SunMoon className="size-4 min-w-4" />
          Alterar tema
        </span>
        <DropdownMenu.Item asChild>
          <ThemeSwitcher />
        </DropdownMenu.Item>
      </div>

      <Dialog.Trigger asChild>
        <AccountButton>
          <Info className="size-4 min-w-4" /> Sobre o projeto
        </AccountButton>
      </Dialog.Trigger>

      <DropdownMenu.Separator className="h-px bg-border-soft" />

      <AccountButton onClick={handleSignOut}>
        <ArrowLeftCircle className="size-4 min-w-4 text-red-500" />
        Sair da conta
      </AccountButton>
    </DropdownMenu.Content>
  )
}
