import { Metadata } from 'next'
import Image from 'next/image'

import notFoundImage from '@/assets/404-not-found.png'
import { TextLink } from '@/components/text-link'

export const metadata: Metadata = {
  title: 'Erro 404',
}

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center p-8 text-center">
      <h2 className="pb-8 text-2xl font-medium text-strong">
        Onde está essa página? O gato comeu.
      </h2>

      <p className="pb-2">
        A página que você está tentando acessar não foi encontrada ou foi
        digerida pelo elemento abaixo.
      </p>
      <TextLink href="/">Acessar a página inicial</TextLink>

      <Image
        src={notFoundImage}
        width={480}
        height={440}
        quality={90}
        priority
        className="mt-12 w-10/12 max-w-[480px]"
        alt="Gato com um cabo de energia arrebentado na boca atrás de um notebook exibindo um ícone de vazio (círculo riscado) em sua tela"
      />
    </main>
  )
}
