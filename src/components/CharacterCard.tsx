'use client'

import Link from 'next/link'
import { useFavorites } from '../hooks/useFavorites'

type Character = {
  id: number
  name: string
  image: string
  species: string
  status: string
}

export default function CharacterCard({ character }: { character: Character }) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <div className="relative border rounded p-4 shadow hover:shadow-lg transition">
      <Link href={`/characters/${character.id}`}>
        <div className="cursor-pointer">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{character.name}</h2>
          <p className="text-sm text-gray-600">
            {character.species} — {character.status}
          </p>
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(character.id)}
        className={`absolute top-2 right-2 px-2 py-1 text-sm rounded ${
          isFavorite(character.id) ? 'bg-yellow-400' : 'bg-gray-300'
        }`}
        aria-label="Toggle Favorite"
      >
        {isFavorite(character.id) ? '★' : '☆'}
      </button>
    </div>
  )
}