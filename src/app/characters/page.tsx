'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard';
import { useFavorites } from '@/hooks/useFavorites';

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin?: { name: string };
  location?: { name: string };
};

async function fetchCharacters(signal: AbortSignal): Promise<Character[]> {
  try {
    const res = await axios.get('https://rickandmortyapi.com/api/character', { signal });
    return res.data.results as Character[];
  } catch (error) {
    throw new Error(`Failed to fetch characters: ${(error as Error).message}`);
  }
}

export default function CharactersPage() {
  const searchParams = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const query = searchParams?.toString() ?? '';
  const sort = searchParams?.get('sort') ?? '';
  const showFavoritesOnly = searchParams?.get('favorites') === 'true';

  const { data: characters = [], isLoading, isError, error } = useQuery({
    queryKey: ['characters'],
    queryFn: ({ signal }) => fetchCharacters(signal),
    staleTime: 60_000,
    retry: 2,
  });

  const filteredCharacters = characters
    .map((char) => ({ ...char, isFavorite: isFavorite(char.id) }))
    .filter((char) => {
      if (showFavoritesOnly && !char.isFavorite) return false;
      if (query && !char.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-600">Error: {error?.message || 'Failed to load characters'}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              isFavorite={char.isFavorite}
              onToggleFavorite={() => toggleFavorite(char.id)}
            />
          ))
        ) : (
          <p>No characters found.</p>
        )}
      </div>
    </main>
  );
}