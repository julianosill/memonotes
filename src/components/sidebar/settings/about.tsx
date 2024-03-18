import { Info } from 'lucide-react'

import { Dialog } from '@/components/dialog'
import { ExternalLink } from '@/components/external-link'
import { LogoMemonotes } from '@/components/logo/memonotes'

import { SettingsItem } from './settings-item'

export function About() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <SettingsItem onSelect={(e) => e.preventDefault()}>
          <Info className="size-4" /> Sobre
        </SettingsItem>
      </Dialog.Trigger>
      <Dialog.Content
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="text-center md:max-w-[420px]"
      >
        <Dialog.Title className="text-lg font-medium">Sobre</Dialog.Title>

        <LogoMemonotes className="mx-auto mb-8 mt-12 h-fit w-full max-w-[220px] fill-primary" />

        <Dialog.Description>
          Esta é uma aplicação desenvolvida para fins de estudos e exercícios
          práticos utilizando tecnologias como{' '}
          <span className="text-strong">Next.js</span>,{' '}
          <span className="text-strong">TailwindCSS</span>,{' '}
          <span className="text-strong">Zustand</span> e{' '}
          <span className="text-strong">Radix-UI</span>.
        </Dialog.Description>

        <p className="mt-8 text-sm">
          Confira o repositório do projeto{' '}
          <ExternalLink href="https://github.com/julianosill/memonotes">
            aqui
          </ExternalLink>
          .
        </p>

        <p className="mt-2 text-sm">
          Desenvolvido por{' '}
          <ExternalLink href="https://github.com/julianosill">
            Juliano Sill
          </ExternalLink>
          .
        </p>
      </Dialog.Content>
    </Dialog.Root>
  )
}
