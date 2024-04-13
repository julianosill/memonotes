import { BubbleMenu, EditorContent, EditorContentProps } from '@tiptap/react'

import { cn } from '@/utils/class-name-merge'

import { ToolbarMenu } from './toolbar-menu'

export function ContentEditor({ editor }: EditorContentProps) {
  return (
    <section className="flex h-full w-full flex-col gap-4 p-5">
      <ToolbarMenu editor={editor} />

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, maxWidth: 'fit' }}
          className="rounded-md bg-card shadow-md"
        >
          <ToolbarMenu editor={editor} />
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        className={cn(
          'prose h-full max-w-full',
          'prose-headings:mb-4 prose-headings:mt-10 prose-headings:font-semibold',
          'prose-p:mb-3 prose-p:mt-0 prose-p:leading-relaxed',
          'prose-strong:font-semibold',
        )}
      />
    </section>
  )
}
