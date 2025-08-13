'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const statuses = ['alive', 'dead', 'unknown']
const speciesList = ['human', 'alien', 'robot', 'animal']

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()

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

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      {/* Status Filter */}
      <select
        defaultValue={searchParams.get('status') || ''}
        onChange={(e) => updateParam('status', e.target.value)}
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
        defaultValue={searchParams.get('species') || ''}
        onChange={(e) => updateParam('species', e.target.value)}
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
          checked={searchParams.get('favorites') === 'true'}
          onChange={(e) => updateParam('favorites', e.target.checked ? 'true' : '')}
          className="mr-2"
          id="favorites"
        />
        <label htmlFor="favorites">Show Favorites Only</label>
      </div>
    </div>
  )
}
