import { useMutation, useQuery } from '@tanstack/react-query'
import { useAppStore } from '@/store/useAppStore'

export function useStrategy() {
  const { currentStrategy, setCurrentStrategy } = useAppStore()

  const generateMutation = useMutation({
    mutationFn: async (input: {
      map: string
      yourTeam: string
      opponentTeam: string
      game: 'valorant' | 'lol'
    }) => {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (!response.ok) throw new Error('Failed to generate strategy')
      return response.json()
    },
    onSuccess: (data: any) => {
      setCurrentStrategy(data)
    },
  })

  return {
    currentStrategy,
    setCurrentStrategy,
    generateStrategy: generateMutation.mutate,
    isLoading: generateMutation.isPending,
    error: generateMutation.error,
  }
}

export function useLiveAnalysis() {
  const { addNotification } = useAppStore()

  const analyzeMutation = useMutation({
    mutationFn: async (input: {
      game: string
      matchId: string
      eventLog: string[]
    }) => {
      const response = await fetch('/api/live-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (!response.ok) throw new Error('Failed to analyze match')
      return response.json()
    },
    onError: () => {
      addNotification({
        message: 'Failed to analyze live match',
        type: 'error',
      })
    },
  })

  return {
    analyze: analyzeMutation.mutate,
    isLoading: analyzeMutation.isPending,
    data: analyzeMutation.data,
    error: analyzeMutation.error,
  }
}

export function useRiotStats(gameName: string, tagLine: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['riot-stats', gameName, tagLine],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot?gameName=${gameName}&tagLine=${tagLine}`
      )
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json()
    },
    enabled: !!gameName && !!tagLine,
  })

  return { data, isLoading, error }
}

export function useStrategies(game: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['strategies', game],
    queryFn: async () => {
      const response = await fetch(`/api/strategies?game=${game}`)
      if (!response.ok) throw new Error('Failed to fetch strategies')
      return response.json()
    },
  })

  return { strategies: data, isLoading, error, refetch }
}
