'use client';

import { useSearchParams } from 'next/navigation';
import CharacterCard from '@/components/CharacterCard';
import type { Character } from '@/components/CharacterCard';

export default function CharactersPage() {
  const searchParams = useSearchParams();

  const query = searchParams?.toString() ?? '';
  const sort = searchParams?.get('sort') ?? '';
  const showFavoritesOnly = searchParams?.get('favorites') === 'true';

  const characters: (Character & { isFavorite: boolean })[] = [
    { id: 1, name: 'Aang', image: '/images/aang.png', status: 'Alive', species: 'Air Nomad', isFavorite: true },
    { id: 2, name: 'Katara', image: '/images/katara.png', status: 'Alive', species: 'Water Tribe', isFavorite: false },
    { id: 3, name: 'Zuko', image: '/images/zuko.png', status: 'Alive', species: 'Fire Nation', isFavorite: true },
  ];

  const filteredCharacters = characters
    .filter((char) => !showFavoritesOnly || char.isFavorite)
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCharacters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            isFavorite={char.isFavorite}
            onToggleFavorite={() => {}}
          />
        ))}
      </div>
    </main>
  );
}
