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

interface IUpdateNote {
  id: string
  title: string
  content: string
  tags: string[]
}

export interface INotesStore {
  notes: INote[]
  isLoading: boolean
  isPending: boolean
  fetchNotes: () => Promise<void>
  getNote: (id: string) => INote | null
  addNote: (note: IAddNote) => Promise<void>
  updateNote: (note: IUpdateNote) => Promise<void>
  deleteNote: (noteId: string) => Promise<void>
}

export const useStore = create<INotesStore>((set, get) => {
  return {
    notes: [],
    isLoading: false,
    isPending: false,

    fetchNotes: async () => {
      set({ isLoading: true })
      const storage = localStorage.getItem('@memonotes:notes')
      const notes = storage ? JSON.parse(storage) : []

      if (notes.length > 0) {
        notes.sort((a: INote, b: INote) => {
          const currentNoteDate = new Date(
            a.updatedAt ? a.updatedAt : a.createdAt,
          ).getTime()
          const nextNoteDate = new Date(
            b.updatedAt ? b.updatedAt : b.createdAt,
          ).getTime()

          return nextNoteDate - currentNoteDate
        })
      }

      await new Promise((resolve) => setTimeout(resolve, 200))

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

      await new Promise((resolve) => setTimeout(resolve, 200))

      localStorage.setItem('@memonotes:notes', JSON.stringify(currentNotes))
      set({ notes: currentNotes, isPending: false })
    },

    updateNote: async ({ id, title, content, tags }) => {
      set({ isPending: true })
      const { notes } = get()

      const noteIndex = notes.findIndex((note) => note.id === id)

      if (noteIndex < 0) {
        set({ isPending: false })
        throw new Error('Note not found.')
      }

      notes[noteIndex] = {
        id,
        title,
        content,
        tags,
        createdAt: notes[noteIndex].createdAt,
        updatedAt: new Date(),
      }

      await new Promise((resolve) => setTimeout(resolve, 200))

      localStorage.setItem('@memonotes:notes', JSON.stringify(notes))
      set({ notes, isPending: false })
    },

    deleteNote: async (noteId) => {
      set({ isPending: true })
      const { notes } = get()

      const noteIndex = notes.findIndex((note) => note.id === noteId)

      if (noteIndex < 0) {
        set({ isPending: false })
        throw new Error('Note not found.')
      }

      await new Promise((resolve) => setTimeout(resolve, 200))

      notes.splice(noteIndex, 1)
      localStorage.setItem('@memonotes:notes', JSON.stringify(notes))
      set({ isPending: false })
    },
  }
})
