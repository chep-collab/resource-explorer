'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useFavorites } from '../../../hooks/useFavorites'
import { useState } from 'react'

export default function CharacterDetailPage() {
  const { id } = useParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [note, setNote] = useState('')
  const [submittedNote, setSubmittedNote] = useState<string | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: async () => {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      return res.data
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (note.trim().length < 3) return
    setSubmittedNote(note.trim())
    setNote('')
  }

  if (isLoading) return <p className="p-6 text-center">Loading character...</p>
  if (isError) return <p className="p-6 text-center text-red-500">Error loading character.</p>

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <img src={data.image} alt={data.name} className="w-48 h-48 rounded-full mb-4" />
        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        <p className="text-gray-600 mb-2">{data.species} — {data.status}</p>
        <button
          onClick={() => toggleFavorite(data.id)}
          className={`px-4 py-2 rounded ${
            isFavorite(data.id) ? 'bg-yellow-400' : 'bg-gray-300'
          }`}
        >
          {isFavorite(data.id) ? '★ Favorited' : '☆ Add to Favorites'}
        </button>
      </div>

      {/* Note Form */}
      <form onSubmit={handleSubmit} className="mt-6 w-full">
        <label htmlFor="note" className="block mb-2 font-medium">Add a note:</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-3 border rounded"
          placeholder="Write something about this character..."
        />
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Note
        </button>
      </form>

      {submittedNote && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Your Note:</h2>
          <p>{submittedNote}</p>
        </div>
      )}
    </main>
  )
}