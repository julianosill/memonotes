import { create } from 'zustand'

export interface INote {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt?: Date | null
}

interface IAddNote {
  title: string
  content: string
  tags: string[]
}

export interface INotesStore {
  notes: INote[] | null
  isLoading: boolean
  isPending: boolean
  fetchNotes: () => Promise<void>
  getNote: (id: string) => INote | null
  addNote: (note: IAddNote) => Promise<void>
  deleteNote: (noteId: string) => Promise<void>
}

export const useStore = create<INotesStore>((set, get) => {
  return {
    notes: null,
    isLoading: false,
    isPending: false,

    fetchNotes: async () => {
      set({ isLoading: true })
      const storage = localStorage.getItem('@memonotes:notes')
      const notes = storage ? JSON.parse(storage) : []

      if (notes.length > 0) {
        notes.sort(
          (a: INote, b: INote) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      set({ notes, isLoading: false })
    },

    getNote: (id) => {
      const storage = localStorage.getItem('@memonotes:notes')
      const notes = storage ? JSON.parse(storage) : []
      const note = notes?.filter((note: INote) => note.id === id)

      if (!note) return null

      return note[0]
    },

    addNote: async ({ title, content, tags }) => {
      set({ isPending: true })

      const { notes } = get()
      const currentNotes = notes ?? []
      currentNotes.push({
        id: Date.now().toString(),
        title,
        content,
        tags,
        createdAt: new Date(),
      })

      await new Promise((resolve) => setTimeout(resolve, 500))

      localStorage.setItem('@memonotes:notes', JSON.stringify(currentNotes))
      set({ notes: currentNotes, isPending: false })
    },

    deleteNote: async (noteId) => {
      set({ isLoading: true })
      const { notes } = get()
      const notesWithoutDeleted = notes?.filter((note) => note.id !== noteId)

      await new Promise((resolve) => setTimeout(resolve, 500))

      localStorage.setItem(
        '@memonotes:notes',
        JSON.stringify(notesWithoutDeleted),
      )
      set({ notes: notesWithoutDeleted, isLoading: false })
    },
  }
})
