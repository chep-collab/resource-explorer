'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

const statuses = ['alive', 'dead', 'unknown']
const speciesList = ['human', 'alien', 'robot', 'animal']

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (!searchParams) return null // safeguard for SSR

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
      params.set('page', '1') // Reset pagination
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const currentStatus = searchParams.get('status') || ''
  const currentSpecies = searchParams.get('species') || ''
  const showFavorites = searchParams.get('favorites') === 'true'

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      {/* Status Filter */}
      <select
        value={currentStatus}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateParam('status', e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      {/* Species Filter */}
      <select
        value={currentSpecies}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateParam('species', e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="">All Species</option>
        {speciesList.map((species) => (
          <option key={species} value={species}>
            {species.charAt(0).toUpperCase() + species.slice(1)}
          </option>
        ))}
      </select>

      {/* Favorites Filter */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={showFavorites}
          onChange={(e) => updateParam('favorites', e.target.checked ? 'true' : '')}
          className="mr-2"
          id="favorites"
        />
        <label htmlFor="favorites">Show Favorites Only</label>
      </div>
    </div>
  )
}
