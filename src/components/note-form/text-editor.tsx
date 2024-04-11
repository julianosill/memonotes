import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { cn } from '@/utils/class-name-merge'

interface TextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function TextEditor({ content, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:float-left before:text-muted-foreground before:h-0 before:pointer-events-none',
        placeholder: 'Digite seu texto ou transcreva sua fala...',
      }),
    ],
    content: content.length > 0 ? content : null,
    editorProps: {
      attributes: {
        class: 'outline-none h-full px-6 py-5',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  return (
    <>
      <EditorContent
        editor={editor}
        className={cn(
          'prose h-full w-full',
          'prose-headings:mb-4 prose-headings:mt-10 prose-headings:font-semibold',
          'prose-p:mb-3 prose-p:mt-0 prose-p:leading-relaxed',
          'prose-strong:font-semibold',
        )}
      />
    </>
  )
}
