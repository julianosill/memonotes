'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { INote } from '@/@types/note'
import { createNote } from '@/api/create-note'
import { updateNote } from '@/api/update-note'
import { parseTags } from '@/utils/parse-tags'

import { Input } from '../input'
import { FormActions } from './_components/actions'
import { ContentEditor } from './_components/content-editor'
import { TagsInstructions } from './_components/tags-instructions'
import { TranscribeDialog } from './_components/transcribe'

const noteSchema = z.object({
  title: z.string().min(3, 'O título deve conter pelo menos 3 letras'),
  content: z.string().min(3, 'O conteúdo deve conter pelo menos 3 letras'),
  tags: z.string().optional(),
})

type NoteSchema = z.infer<typeof noteSchema>

export function NoteForm({ note }: { note?: INote }) {
  const [isSpeechAPIAvailable, setIsSpeechAPIAvailable] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    values: {
      title: note?.title ?? '',
      content: note?.content ?? '',
      tags: note?.tags ? note.tags.join(', ') : '',
    },
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:float-left before:text-muted-foreground before:h-0 before:pointer-events-none',
        placeholder: 'Digite seu texto ou transcreva sua fala...',
      }),
    ],
    content: note?.content ?? '',
    editorProps: {
      attributes: {
        class: 'outline-none h-full',
      },
    },
    onUpdate({ editor }) {
      setValue('content', editor.getHTML())
    },
  })

  function addTranscriptionToNote(transcription: string) {
    const previousContent = getValues('content')

    if (previousContent) {
      const updatedContent = `${previousContent}<p>${transcription}</p>`
      editor?.commands.setContent(updatedContent)
      setValue('content', updatedContent)
      return
    }

    editor?.commands.setContent(transcription)
    setValue('content', `<p>${transcription}</p>`)
  }

  async function saveNote({ title, content, tags }: NoteSchema) {
    if (editor?.isEmpty) {
      editor.commands.focus()
      return setError('content', {
        type: 'custom',
        message: 'O conteúdo não pode estar vazio',
      })
    }

    let currentTags: string[] = []

    if (tags && tags.length > 0) {
      currentTags = parseTags(tags)
      const shortTag = currentTags.find((tag) => tag.length < 3)

      if (shortTag) {
        return setError('tags', {
          type: 'too_small',
          message: 'A tag deve conter 3 ou mais letras',
        })
      }
    }

    try {
      note
        ? await updateNote({
            id: note.id,
            title,
            content,
            tags: currentTags,
          })
        : await createNote({
            title,
            content,
            tags: currentTags,
          })

      toast.success('Nota salva com sucesso!')
      clearFormAndGoBack()
    } catch (error) {
      console.error(error)
      toast.error('Ops, algo deu errado! Não foi possível salvar a nota.')
    }
  }

  function clearFormAndGoBack() {
    editor?.commands.clearContent()
    reset()
    router.back()
  }

  function focusOnEditor() {
    editor?.commands.focus()
  }

  useEffect(() => {
    if (errors.content) {
      focusOnEditor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.content])

  useEffect(() => {
    setIsSpeechAPIAvailable(
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
    )
  }, [setIsSpeechAPIAvailable])

  return (
    <form
      onSubmit={handleSubmit(saveNote)}
      className="flex flex-1 flex-col gap-4 lg:gap-8"
    >
      <Input.Root className="flex flex-col gap-2">
        <Input.Label>Título</Input.Label>
        <Input.Wrapper>
          <Input.Control
            autoFocus
            placeholder="Insira o título da sua nota"
            {...register('title')}
          />
        </Input.Wrapper>
        {errors.title && <Input.Error>{errors.title.message}</Input.Error>}
      </Input.Root>

      <Input.Root className="flex flex-1 flex-col gap-2">
        <div className="flex items-end justify-between">
          <Input.Label htmlFor="editor" onClick={focusOnEditor}>
            Conteúdo
          </Input.Label>
          {isSpeechAPIAvailable && (
            <TranscribeDialog
              onAddTranscriptionToNote={addTranscriptionToNote}
            />
          )}
        </div>
        <Input.Wrapper className="min-h-[160px] flex-1 p-0">
          <ContentEditor editor={editor} />
        </Input.Wrapper>
        {errors.content && <Input.Error>{errors.content.message}</Input.Error>}
      </Input.Root>

      <Input.Root className="flex flex-col gap-2">
        <Input.Label className="flex items-center gap-2">
          Tags
          <TagsInstructions />
        </Input.Label>

        <Input.Wrapper>
          <Input.Control
            placeholder="Separe as tags por vírgula, exemplo: estudos, trabalho, viagem"
            {...register('tags')}
          />
        </Input.Wrapper>

        {errors.tags && <Input.Error>{errors.tags.message}</Input.Error>}
      </Input.Root>

      <FormActions isSubmitting={isSubmitting} onCancel={clearFormAndGoBack} />
    </form>
  )
}
