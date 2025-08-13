'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCharacters } from '../../hooks/useCharacters'
import { useFavorites } from '../../hooks/useFavorites'
import Filters from '../../components/Filters'
import SortDropdown from '../../components/SortDropdown'

interface Character {
  id: number
  name: string
  image: string
  status?: string
  species?: string
  type?: string
  gender?: string
  origin?: { name: string; url: string }
  location?: { name: string; url: string }
  episode?: string[]
  url?: string
  created?: string
}

interface CharactersResponse {
  info?: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results?: Character[]
}

export default function CharactersPage() {
  const searchParams = useSearchParams()
  const query = searchParams.toString()
  const sort = searchParams.get('sort')
  const showFavoritesOnly = searchParams.get('favorites') === 'true'

  const { data, isLoading, isError } = useCharacters(query) as {
    data: CharactersResponse | undefined
    isLoading: boolean
    isError: boolean
  }
  const { favorites } = useFavorites()

  const getFilteredSortedCharacters = (): Character[] => {
    if (!data?.results) return []

    let characters = data.results

    if (showFavoritesOnly) {
      characters = characters.filter((char) => favorites.includes(char.id))
    }

    if (sort === 'name-asc') {
      characters = [...characters].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'name-desc') {
      characters = [...characters].sort((a, b) => b.name.localeCompare(a.name))
    }

    return characters
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Characters</h1>

      <Filters />
      <SortDropdown />

      {isLoading && <p className="text-center">Loading characters...</p>}
      {isError && <p className="text-center text-red-500">Error loading characters.</p>}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {getFilteredSortedCharacters().map((char) => (
            <div key={char.id} className="border rounded p-2 shadow-sm space-y-2">
              <Link href={`/characters/${char.id}`}>
                <Image
                  src={char.image}
                  alt={char.name}
                  width={300}
                  height={300}
                  className="rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{char.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
