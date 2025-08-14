// src/components/CharacterCard.tsx

import Image from 'next/image'
import React from 'react'

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface CharacterCardProps {
  character: Character
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:scale-[1.02]">
      <div className="relative w-full h-[300px]">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{character.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Species: {character.species}</p>
        <p className={`text-sm font-medium ${
          character.status === 'Alive' ? 'text-green-600' :
          character.status === 'Dead' ? 'text-red-600' :
          'text-gray-600'
        }`}>
          Status: {character.status}
        </p>
      </div>
    </div>
  )
}

export default CharacterCard