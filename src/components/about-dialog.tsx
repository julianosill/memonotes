import { Dialog } from '@/components/dialog'
import { LogoMemonotes } from '@/components/logo/memonotes'
import { TextLink } from '@/components/ui/text-link'

interface AboutDialogProps {
  trigger?: React.RefObject<HTMLButtonElement>
}

export function AboutDialog({ trigger }: AboutDialogProps) {
  function handleFocusOnTrigger(e: Event) {
    e.preventDefault()
    trigger?.current?.focus()
  }

  return (
    <Dialog.Content
      onCloseAutoFocus={trigger && handleFocusOnTrigger}
      className="text-center md:h-fit md:max-w-lg"
    >
      <Dialog.Title>Sobre</Dialog.Title>

      <LogoMemonotes className="mx-auto mb-8 mt-12 h-fit w-full max-w-[220px] fill-primary" />

      <Dialog.Description>
        Memonotes é uma aplicação desenvolvida para fins de estudos e exercícios
        práticos utilizando tecnologias como{' '}
        <span className="text-strong">Next.js</span>,{' '}
        <span className="text-strong">Firebase</span>,{' '}
        <span className="text-strong">Next Auth</span>,{' '}
        <span className="text-strong">Tailwind CSS</span>,{' '}
        <span className="text-strong">Radix-UI</span> e{' '}
        <span className="text-strong">Framer Motion</span>.
      </Dialog.Description>

      <p className="mt-8 text-sm">
        Confira o{' '}
        <TextLink href="https://github.com/julianosill/memonotes">
          repositório do projeto
        </TextLink>
      </p>

      <p className="mt-2 text-sm">
        Desenvolvido por{' '}
        <TextLink href="https://julianosill.com.br">Juliano Sill</TextLink>
      </p>
    </Dialog.Content>
  )
}
