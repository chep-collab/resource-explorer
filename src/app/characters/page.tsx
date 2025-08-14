// src/app/characters/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import CharacterCard from '@/components/CharacterCard';

export default function CharactersPage() {
  const searchParams = useSearchParams() ?? new URLSearchParams();

  const query = searchParams.toString();
  const sort = searchParams.get('sort');
  const showFavoritesOnly = searchParams.get('favorites') === 'true';

  // Example character data — replace with real data or fetch logic
  const characters = [
    { id: 1, name: 'Aang', image: '/images/aang.png', isFavorite: true },
    { id: 2, name: 'Katara', image: '/images/katara.png', isFavorite: false },
    { id: 3, name: 'Zuko', image: '/images/zuko.png', isFavorite: true },
  ];

  // Apply filtering based on searchParams
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
            name={char.name}
            image={char.image}
            isFavorite={char.isFavorite}
          />
        ))}
      </div>
    </main>
  );
}
