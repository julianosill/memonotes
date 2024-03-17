import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

import { INote, useStore } from '@/app/store'

interface UseNoteFormProps {
  note?: INote
}

export function useNoteForm({ note }: UseNoteFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagsInString, setTagsInString] = useState('')
  const [isSpeechRecognitionAPIAvailable, setIsSpeechRecognitionAPIAvailable] =
    useState(false)
  const router = useRouter()
  const { isPending, addNote, updateNote, fetchNotes } = useStore((store) => {
    return {
      isPending: store.isPending,
      addNote: store.addNote,
      updateNote: store.updateNote,
      fetchNotes: store.fetchNotes,
    }
  })

  const isSubmitDisabled = !title.trim() || !content.trim()

  function addTranscriptionToNote(transcription: string) {
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

    if (tagsInString.length > 0) {
      tags = Array.from(new Set(tagsInString.split(/\s+/)))
      const shortTag = tags.find((tag) => tag.length < 3)

      if (shortTag) {
        return toast.warning('Cada Tag deve conter 3 ou mais letras.')
      }
    }

    note
      ? await updateNote({
          id: note.id,
          title: title.trim(),
          content: content.trim(),
          tags,
        })
          .then(() => {
            toast.success('Nota atualizada com sucesso!')
            router.back()
            fetchNotes()
          })
          .catch(() => {
            toast.error('Ops, algo deu errado!')
          })
      : await addNote({ title: title.trim(), content: content.trim(), tags })
          .then(() => {
            toast.success('Nota adicionada com sucesso!')
            setTitle('')
            setContent('')
            setTagsInString('')
            router.push('/')
            fetchNotes()
          })
          .catch(() => {
            toast.error('Ops, algo deu errado!')
          })
  }

  function handleCancel() {
    setTitle('')
    setContent('')
    setTagsInString('')
    router.back()
  }

  return {
    title,
    setTitle,
    content,
    setContent,
    tagsInString,
    setTagsInString,
    isSpeechRecognitionAPIAvailable,
    setIsSpeechRecognitionAPIAvailable,
    addTranscriptionToNote,
    isSubmitDisabled,
    handleSubmit,
    isPending,
    handleCancel,
  }
}
