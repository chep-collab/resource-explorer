import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

export const useCharacters = (queryParams: string) => {
  const cleanParams = queryParams.startsWith('?') ? queryParams.slice(1) : queryParams

  return useQuery({
    queryKey: ['characters', cleanParams],
    queryFn: async ({ signal }: { signal?: AbortSignal }) => {
      const response = await axios.get(`${BASE_URL}?${cleanParams}`, { signal })
      return response.data
    },
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: false,
  })
}
