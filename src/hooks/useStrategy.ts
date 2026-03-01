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
    onSuccess: (data) => {
      setCurrentStrategy(data as any)
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

// ============================================================================
// Valorant-specific hooks
// ============================================================================

export function useValorantPlayer(gameName: string, tagLine: string) {
  return useQuery({
    queryKey: ['valorant-player', gameName, tagLine],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/valorant/player?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`
      )
      if (!response.ok) throw new Error('Failed to fetch player')
      return response.json()
    },
    enabled: !!gameName && !!tagLine,
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function useValorantMatchHistory(puuid: string, count = 20) {
  return useQuery({
    queryKey: ['valorant-matches', puuid, count],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/valorant/matches?puuid=${puuid}&count=${count}`
      )
      if (!response.ok) throw new Error('Failed to fetch match history')
      return response.json()
    },
    enabled: !!puuid,
    staleTime: 2 * 60 * 1000, // 2 min
  })
}

export function useValorantMatchDetails(matchId: string) {
  return useQuery({
    queryKey: ['valorant-match', matchId],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/valorant/match/${matchId}`
      )
      if (!response.ok) throw new Error('Failed to fetch match details')
      return response.json()
    },
    enabled: !!matchId,
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function useValorantLeaderboard(actId: string, size = 50) {
  return useQuery({
    queryKey: ['valorant-leaderboard', actId, size],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/valorant/leaderboard?actId=${actId}&size=${size}`
      )
      if (!response.ok) throw new Error('Failed to fetch leaderboard')
      return response.json()
    },
    enabled: !!actId,
    staleTime: 10 * 60 * 1000, // 10 min
  })
}

export function useValorantPlayerStats(puuid: string, matchCount = 10) {
  return useQuery({
    queryKey: ['valorant-player-stats', puuid, matchCount],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/valorant/stats?puuid=${puuid}&matchCount=${matchCount}`
      )
      if (!response.ok) throw new Error('Failed to fetch player stats')
      return response.json()
    },
    enabled: !!puuid,
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

// ============================================================================
// League of Legends-specific hooks
// ============================================================================

export function useLeagueSummoner(summonerName: string) {
  return useQuery({
    queryKey: ['league-summoner', summonerName],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/league/summoner?name=${encodeURIComponent(summonerName)}`
      )
      if (!response.ok) throw new Error('Failed to fetch summoner')
      return response.json()
    },
    enabled: !!summonerName,
    staleTime: 10 * 60 * 1000, // 10 min
  })
}

export function useLeagueRankedStats(summonerId: string) {
  return useQuery({
    queryKey: ['league-ranked', summonerId],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/league/ranked/${summonerId}`
      )
      if (!response.ok) throw new Error('Failed to fetch ranked stats')
      return response.json()
    },
    enabled: !!summonerId,
    staleTime: 10 * 60 * 1000, // 10 min
  })
}

export function useLeagueMatchHistory(puuid: string, count = 20) {
  return useQuery({
    queryKey: ['league-matches', puuid, count],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/league/matches?puuid=${puuid}&count=${count}`
      )
      if (!response.ok) throw new Error('Failed to fetch match history')
      return response.json()
    },
    enabled: !!puuid,
    staleTime: 2 * 60 * 1000, // 2 min
  })
}

export function useLeagueMatchDetails(matchId: string) {
  return useQuery({
    queryKey: ['league-match', matchId],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/league/match/${matchId}`
      )
      if (!response.ok) throw new Error('Failed to fetch match details')
      return response.json()
    },
    enabled: !!matchId,
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function useChampionMastery(summonerId: string) {
  return useQuery({
    queryKey: ['champion-mastery', summonerId],
    queryFn: async () => {
      const response = await fetch(
        `/api/riot/league/mastery/${summonerId}`
      )
      if (!response.ok) throw new Error('Failed to fetch champion mastery')
      return response.json()
    },
    enabled: !!summonerId,
    staleTime: 30 * 60 * 1000, // 30 min
  })
}

