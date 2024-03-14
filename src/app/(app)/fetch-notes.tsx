/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

import { useStore } from '../store'

export function FetchNotes() {
  const { fetchNotes } = useStore((store) => {
    return { fetchNotes: store.fetchNotes }
  })

  useEffect(() => {
    fetchNotes()
  }, [])

  return <span className="hidden">Fetch notes</span>
}
