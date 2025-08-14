'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'name-asc', label: 'Name Ascending' },
  { value: 'name-desc', label: 'Name Descending' },
]

export default function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams?.get('sort') || ''

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    const value = e.target.value
    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }
    // Reset page to 1 when sorting changes
    params.set('page', '1')
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="mb-4 flex justify-center">
      <select
        value={currentSort}
        onChange={handleChange}
        className="border px-3 py-2 rounded shadow hover:border-gray-400 focus:outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
