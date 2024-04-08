'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

import google from '@/assets/google.svg'
import { Button } from '@/components/ui/button'

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn() {
    setIsLoading(true)

    await signIn('google').catch((error) => {
      console.log(error)
      toast.error(
        'Não foi acessar sua conta do Google. Por favor, tente novamente.',
      )
    })
  }

  return (
    <Button variant="outline" onClick={handleSignIn} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          Autenticando sua conta
        </>
      ) : (
        <>
          <Image src={google} alt="Ícone G do Google" className="size-5" />
          Acesse com sua conta Google
        </>
      )}
    </Button>
  )
}
