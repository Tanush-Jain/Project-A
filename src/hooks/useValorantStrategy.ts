import { useMutation } from '@tanstack/react-query'
import type { StrategyOutput } from '@/types/valorant'
import { useAppStore } from '@/store/useAppStore'

export function useValorantStrategy() {
  const { currentStrategy, setCurrentStrategy } = useAppStore()

  const generateMutation = useMutation({
    mutationFn: async (input: {
      map: string
      yourTeam: string
      opponentTeam: string
    }) => {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, game: 'valorant' }),
      })
      if (!response.ok) throw new Error('Failed to generate strategy')
      return response.json() as Promise<StrategyOutput>
    },
    onSuccess: (data) => {
      setCurrentStrategy(data)
    },
  })

  return {
    currentStrategy: currentStrategy as StrategyOutput | null,
    setCurrentStrategy,
    generateStrategy: generateMutation.mutate,
    isLoading: generateMutation.isPending,
    error: generateMutation.error,
  }
}
