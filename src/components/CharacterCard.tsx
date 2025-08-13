'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Character {
  id: number
  name: string
  image: string
}

interface Props {
  character: Character
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function CharacterCard({ character, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="border rounded p-2 shadow-sm space-y-2">
      <Link href={`/characters/${character.id}`}>
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="rounded"
        />
        <h2 className="text-lg font-semibold">{character.name}</h2>
      </Link>
      <button
        onClick={onToggleFavorite}
        className={`px-2 py-1 rounded text-sm ${
          isFavorite ? 'bg-yellow-400' : 'bg-gray-200'
        }`}
      >
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  )
}