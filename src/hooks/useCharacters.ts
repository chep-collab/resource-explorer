import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

export const useCharacters = (queryParams: string) => {
  const cleanParams = queryParams.startsWith('?')
    ? queryParams.slice(1)
    : queryParams

  return useQuery({
    queryKey: ['characters', cleanParams],
    queryFn: async () => {
      const controller = new AbortController()
      const response = await axios.get(`${BASE_URL}?${cleanParams}`, {
        signal: controller.signal,
      })
      return response.data
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  })
}