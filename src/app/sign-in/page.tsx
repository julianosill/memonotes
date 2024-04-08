import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import bgImage from '@/assets/login-bg.jpg'
import { LogoMemonotes } from '@/components/logo/memonotes'
import { TextLink } from '@/components/ui/text-link'
import { nextAuthConfig } from '@/libs/next-auth'
import { cn } from '@/utils/class-name-merge'

import { AboutProject } from './_components/about-project'
import { GoogleButton } from './_components/google-button'

export const metadata: Metadata = {
  title: 'Acessar conta',
}

export default async function SignInPage() {
  const session = await getServerSession(nextAuthConfig)
  if (session) return redirect('/')

  return (
    <div className="mx-auto flex min-h-screen max-w-[1920px] items-center p-8 md:h-screen lg:p-12">
      <div className="z-10 md:w-[280px] lg:w-[360px]">
        <main
          className={cn(
            'rounded-2xl border border-transparent bg-card shadow-lg dark:border-border-soft',
            'flex flex-col justify-center gap-16 px-8 py-12',
            'md:w-[360px] md:translate-x-16',
            'lg:w-[420px] lg:translate-x-24 lg:gap-20 lg:px-12 lg:pb-12 lg:pt-20',
          )}
        >
          <header className="flex flex-col gap-8">
            <LogoMemonotes className="h-fit w-full max-w-52 self-center fill-primary" />
            <p className="text-center text-sm">
              Liberte sua criatividade e organize seus pensamentos. Transforme
              suas ideias em notas escritas, de forma simples e intuitiva.
            </p>
          </header>
          <GoogleButton />

          <footer className="flex flex-col items-center gap-8 text-center">
            <AboutProject />

            <p className="text-xs text-muted-foreground">
              Desenvolvido por{' '}
              <TextLink
                href="https://julianosill.vercel.app/"
                className="text-muted-foreground"
              >
                Juliano Sill
              </TextLink>
            </p>
          </footer>
        </main>
      </div>
      <div className="relative h-full flex-1 max-md:fixed max-md:inset-0">
        <Image
          src={bgImage}
          className="h-full w-full object-cover max-md:opacity-20 md:rounded-3xl"
          alt="Mulher sentada, em uma mesa ao lado de fora de uma cafeteria, com um laptop em sua frente"
          priority
          width={1464}
          height={984}
        />
        <p className="absolute bottom-2 right-4 text-center text-[0.65rem] text-muted-foreground max-md:left-4 md:-bottom-5">
          Photo by Andrea Piacquadio from Pexels
        </p>
      </div>
    </div>
  )
}
