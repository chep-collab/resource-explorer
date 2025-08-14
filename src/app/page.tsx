'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCharacters } from '../hooks/useCharacters'
import { useFavorites } from '../hooks/useFavorites'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import SortDropdown from '../components/SortDropdown'
import CharacterCard from '../components/CharacterCard'

export default function HomePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams?.toString() || ''
  const currentPage = Number(searchParams?.get('page') || 1)
  const sort = searchParams?.get('sort')
  const showFavoritesOnly = searchParams?.get('favorites') === 'true'

  const { data, isLoading, isError } = useCharacters(query) as any
  const { favorites } = useFavorites()

  const getFilteredSortedCharacters = () => {
    if (!data?.results) return []

    let characters = data.results

    if (showFavoritesOnly) {
      characters = characters.filter((char: any) => favorites.includes(char.id))
    }

    if (sort === 'name-asc') {
      characters = [...characters].sort((a: any, b: any) => a.name.localeCompare(b.name))
    } else if (sort === 'name-desc') {
      characters = [...characters].sort((a: any, b: any) => b.name.localeCompare(a.name))
    }

    return characters
  }

  const buildPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString())
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {getFilteredSortedCharacters().map((char: any) => (
              <CharacterCard
                key={char.id}
                character={char}
                isFavorite={favorites.includes(char.id)}
                onToggleFavorite={() => {}}
              />
            ))}
          </div>

          {!showFavoritesOnly && data?.info && (
            <div className="mt-8 flex justify-center gap-4">
              {data.info.prev && (
                <a href={buildPageLink(currentPage - 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
                  Previous
                </a>
              )}
              {data.info.next && (
                <a href={buildPageLink(currentPage + 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
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
