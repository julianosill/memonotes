import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { INote } from '@/@types/note'
import { createNote } from '@/api/create-note'
import { updateNote } from '@/api/update-note'
import { parseTags } from '@/utils/parse-tags'

interface UseNoteFormProps {
  note?: INote
}

export function useNoteForm({ note }: UseNoteFormProps) {
  const [title, setTitle] = useState(note?.title ?? '')
  const [content, setContent] = useState(note?.content ?? '')
  const [tagString, setTagString] = useState(
    note?.tags ? note.tags.join(', ') : '',
  )
  const [isPending, setIsPending] = useState(false)
  const [isSpeechAPIAvailable, setIsSpeechAPIAvailable] = useState(false)

  const router = useRouter()
  const isSubmitDisabled = !title.trim() || !content.trim()

  function addTranscription(transcription: string) {
    const previousContent = content.trim()
    previousContent
      ? setContent(`${content}\n\n${transcription}`)
      : setContent(transcription)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitDisabled) {
      return toast.warning('Não é possível adicionar uma nota vazia!')
    }

    let tags: string[] = []

    if (tagString.length > 0) {
      tags = parseTags(tagString)
      const shortTag = tags.find((tag) => tag.length < 3)

      if (shortTag) {
        return toast.warning('Cada Tag deve conter 3 ou mais letras.')
      }
    }

    try {
      setIsPending(true)

      note
        ? await updateNote({
            userId: 'userTest',
            noteId: note.id,
            title,
            content,
            tags,
          })
        : await createNote({
            userId: 'userTest',
            title,
            content,
            tags,
          })

      toast.success('Nota salva com sucesso!')
      clearFormAndGoBack()
    } catch (error) {
      console.error(error)
      toast.error('Ops, algo deu errado! Não foi possível salvar a nota.')
    } finally {
      setIsPending(false)
    }
  }

  function clearFormAndGoBack() {
    setTitle('')
    setContent('')
    setTagString('')
    router.back()
  }

  useEffect(() => {
    setIsSpeechAPIAvailable(
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
    )
  }, [setIsSpeechAPIAvailable])

  return {
    title,
    setTitle,
    content,
    setContent,
    tagString,
    setTagString,
    addTranscription,
    isSubmitDisabled,
    isPending,
    handleSubmit,
    clearFormAndGoBack,
    isSpeechAPIAvailable,
  }
}
