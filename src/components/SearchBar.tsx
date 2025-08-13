'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('name') || '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (search) {
        params.set('name', search)
      } else {
        params.delete('name')
      }
      router.push(`/?${params.toString()}`)
    }, 400)

    return () => clearTimeout(timeout)
  }, [search, router, searchParams])

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search characters..."
      className="border px-2 py-1 rounded w-full"
    />
  )
}