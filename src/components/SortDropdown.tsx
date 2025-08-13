'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="mb-6">
      <select
        defaultValue={searchParams.get('sort') || ''}
        onChange={(e) => updateSort(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="">Sort by</option>
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
      </select>
    </div>
  )
}