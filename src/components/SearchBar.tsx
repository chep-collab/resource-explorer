'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('name') || ''
  const [searchTerm, setSearchTerm] = useState(initialQuery)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchTerm) {
        params.set('name', searchTerm)
        params.set('page', '1') // Reset to first page on new search
      } else {
        params.delete('name')
      }
      router.push(`?${params.toString()}`)
    }, 400) // debounce delay

    return () => clearTimeout(timeout)
  }, [searchTerm])

  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search characters by name..."
        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  )
}