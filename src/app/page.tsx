'use client'

import { useSearchParams } from 'next/navigation'
import { useCharacters } from '../hooks/useCharacters'
import { useFavorites } from '../hooks/useFavorites'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import SortDropdown from '../components/SortDropdown'
import CharacterCard from '../components/CharacterCard'

interface Character {
  id: number
  name: string
  image: string
  [key: string]: any
}

export default function HomePage() {
  const searchParams = useSearchParams()
  const query = searchParams.toString()
  const currentPage = Number(searchParams.get('page') || 1)
  const sort = searchParams.get('sort')
  const showFavoritesOnly = searchParams.get('favorites') === 'true'

  const { data, isLoading, isError } = useCharacters(query)
  const { favorites } = useFavorites()

  const getFilteredSortedCharacters = (): Character[] => {
    if (!data?.results) return []

    let characters = data.results as Character[]

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

  const buildPageLink = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `/?${params.toString()}`
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Rick & Morty Characters</h1>

      <SearchBar />
      <Filters />
      <SortDropdown />

      {isLoading && <p className="text-center">Loading characters...</p>}
      {isError && <p className="text-center text-red-500">Error loading characters. Try again.</p>}

      {!isLoading && !isError && (
        <>
          {/* Character Grid */}
          {(() => {
            const characters = getFilteredSortedCharacters()

            return characters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {characters.map((char) => (
                  <CharacterCard key={char.id} character={char} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">No characters found.</p>
            )
          })()}

          {/* Pagination */}
          {!showFavoritesOnly && data?.info && (
            <div className="mt-8 flex justify-center gap-4">
              {data.info.prev && (
                <a
                  href={buildPageLink(currentPage - 1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Previous
                </a>
              )}
              {data.info.next && (
                <a
                  href={buildPageLink(currentPage + 1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Next
                </a>
              )}
            </div>
          )}
        </>
      )}
    </main>
  )
}