/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

import { useStore } from '../store'

export function FetchNotes() {
  const { notes, fetchNotes } = useStore((store) => {
    return { notes: store.notes, fetchNotes: store.fetchNotes }
  })

  useEffect(() => {
    fetchNotes()
  }, [notes])

  return <span className="hidden">Fetch notes</span>
}
