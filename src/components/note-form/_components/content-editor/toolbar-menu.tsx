import * as Toolbar from '@radix-ui/react-toolbar'
import { EditorContentProps } from '@tiptap/react'
import {
  Bold,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  SeparatorHorizontal,
} from 'lucide-react'

import { ToolbarButton } from './toolbar-button'
import { ToolbarGroup } from './toolbar-group'

export function ToolbarMenu({ editor }: EditorContentProps) {
  return (
    <Toolbar.Root
      aria-label="Opções de formatação"
      className="flex w-fit flex-wrap justify-center gap-x-6 gap-y-3 rounded-md border border-border-soft px-3 py-2 text-muted-foreground"
    >
      <ToolbarGroup type="multiple" aria-label="Formatação de texto">
        <ToolbarButton
          aria-label="Negrito"
          title="Negrito"
          data-state={editor?.isActive('bold') ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Itálico"
          title="Itálico"
          data-state={editor?.isActive('italic') ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-3.5" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarGroup type="multiple" aria-label="Estrutura de texto">
        <ToolbarButton
          aria-label="Lista não-ordenada"
          title="Lista não-ordenada"
          data-state={editor?.isActive('bulletList') ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Lista ordenada"
          title="Lista ordenada"
          data-state={editor?.isActive('orderedList') ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Citação"
          title="Citação"
          data-state={editor?.isActive('blockquote') ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="size-3.5" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarGroup type="multiple" aria-label="Composição de texto">
        <ToolbarButton
          aria-label="Cabeçalho 2"
          title="Cabeçalho 2"
          data-state={editor?.isActive('heading', { level: 2 }) ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()}
        >
          <Heading2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Cabeçalho 3"
          title="Cabeçalho 3"
          data-state={editor?.isActive('heading', { level: 3 }) ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().setHeading({ level: 3 }).run()}
        >
          <Heading3 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Cabeçalho 4"
          title="Cabeçalho 4"
          data-state={editor?.isActive('heading', { level: 4 }) ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().setHeading({ level: 4 }).run()}
        >
          <Heading4 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Parágrafo"
          title="Parágrafo"
          data-state={editor?.isActive('paragraph') ? 'on' : 'off'}
          onClick={() => editor?.chain().focus().setParagraph().run()}
        >
          <Pilcrow className="size-3.5" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarButton
        aria-label="Separador"
        title="Separador"
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      >
        <SeparatorHorizontal className="size-3.5" />
      </ToolbarButton>
    </Toolbar.Root>
  )
}
