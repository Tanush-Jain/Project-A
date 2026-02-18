/**
 * VALORANT AI Coach - Data Access Utilities
 * Helper functions to retrieve and filter teams, players, and map data
 */

import { TEAM_LIST, getTeamByExactName } from './teams'
import { MAPS } from './types'
import { getSplitStrategy } from './maps/split'
import type { Team, Player, MapStats } from './types'

// TEAM QUERIES
export function searchTeamByName(query: string): Team | undefined {
  return getTeamByExactName(query)
}

export function getTeamPlayers(teamName: string): Player[] {
  const team = searchTeamByName(teamName)
  return team?.players || []
}

export function getPlayersByRole(teamName: string, role: string): Player[] {
  const players = getTeamPlayers(teamName)
  return players.filter((p) => p.role === role)
}

export function getTeamMapStats(teamName: string, mapName: string): MapStats | undefined {
  const team = searchTeamByName(teamName)
  if (!team) return undefined
  return team.mapStats[mapName.toLowerCase()]
}

export function getTeamAgentPool(teamName: string): Set<string> {
  const players = getTeamPlayers(teamName)
  const agents = new Set<string>()
  players.forEach((p) => {
    p.primaryAgents.forEach((agent) => agents.add(agent))
  })
  return agents
}

// PLAYER QUERIES
export function getPlayer(teamName: string, playerIGN: string): Player | undefined {
  const players = getTeamPlayers(teamName)
  return players.find((p) => p.ign.toLowerCase() === playerIGN.toLowerCase())
}

export function getPlayerStats(teamName: string, playerIGN: string) {
  const player = getPlayer(teamName, playerIGN)
  return player?.stats
}

export function searchPlayerByRole(role: string): Array<{ team: string; player: Player }> {
  const results: Array<{ team: string; player: Player }> = []
  TEAM_LIST.forEach((team) => {
    team.players.forEach((player) => {
      if (player.role === role) {
        results.push({ team: team.name, player })
      }
    })
  })
  return results
}

// COMPARISON QUERIES
export function compareTeams(team1Name: string, team2Name: string) {
  const team1 = searchTeamByName(team1Name)
  const team2 = searchTeamByName(team2Name)

  if (!team1 || !team2) return null

  return {
    team1: {
      name: team1.name,
      stats: team1.stats,
      playstyle: team1.playstyle,
      region: team1.region,
    },
    team2: {
      name: team2.name,
      stats: team2.stats,
      playstyle: team2.playstyle,
      region: team2.region,
    },
    comparison: {
      aggressionDiff: team1.stats.aggression - team2.stats.aggression,
      adaptabilityDiff: team1.stats.adaptability - team2.stats.adaptability,
      utilityEfficiencyDiff:
        team1.stats.utilityEfficiency - team2.stats.utilityEfficiency,
      clutchFactorDiff: team1.stats.clutchFactor - team2.stats.clutchFactor,
    },
  }
}

export function compareMapPerformance(
  team1Name: string,
  team2Name: string,
  mapName: string,
) {
  const map1Stats = getTeamMapStats(team1Name, mapName)
  const map2Stats = getTeamMapStats(team2Name, mapName)

  if (!map1Stats || !map2Stats) return null

  return {
    map: mapName,
    team1: {
      name: team1Name,
      attackWinRate: map1Stats.attackWinRate,
      defenseWinRate: map1Stats.defenseWinRate,
      pistolWinRate: (map1Stats.pistolAttackWinRate + map1Stats.pistolDefenseWinRate) / 2,
    },
    team2: {
      name: team2Name,
      attackWinRate: map2Stats.attackWinRate,
      defenseWinRate: map2Stats.defenseWinRate,
      pistolWinRate: (map2Stats.pistolAttackWinRate + map2Stats.pistolDefenseWinRate) / 2,
    },
  }
}

// MAP STRATEGY QUERIES
export function getStrategyByTeamAndMap(teamName: string, mapName: string) {
  if (mapName.toLowerCase() === 'split') {
    return getSplitStrategy(teamName)
  }
  // Future: Add other map strategies
  return null
}

export function getTeamStrengths(teamName: string): string[] {
  const players = getTeamPlayers(teamName)
  const strengths = new Set<string>()
  players.forEach((p) => {
    p.strengths.forEach((s) => strengths.add(s))
  })
  return Array.from(strengths)
}

export function getTeamWeaknesses(teamName: string): string[] {
  const players = getTeamPlayers(teamName)
  const weaknesses = new Set<string>()
  players.forEach((p) => {
    p.weaknesses.forEach((w) => weaknesses.add(w))
  })
  return Array.from(weaknesses)
}

export function getTeamPistolTendencies(teamName: string) {
  const team = searchTeamByName(teamName)
  return team?.pistolTendencies
}

export function getTeamMidRoundTendencies(teamName: string) {
  const team = searchTeamByName(teamName)
  return team?.midRoundTendencies
}

// BULK QUERIES
export function getAllMaps(): string[] {
  return MAPS as unknown as string[]
}

export function getAllTeamNames(): string[] {
  return TEAM_LIST.map((t) => t.name)
}

export function getMapStatsSummary(mapName: string) {
  const teams = TEAM_LIST
  const stats = teams.map((team) => ({
    teamName: team.name,
    attackWinRate: team.mapStats[mapName]?.attackWinRate,
    defenseWinRate: team.mapStats[mapName]?.defenseWinRate,
    pistolWinRate: (
      (team.mapStats[mapName]?.pistolAttackWinRate || 0) +
      (team.mapStats[mapName]?.pistolDefenseWinRate || 0)
    ) / 2,
  }))

  return {
    map: mapName,
    teamStats: stats.sort((a, b) => (b.attackWinRate || 0) - (a.attackWinRate || 0)),
  }
}

// STRATEGIC ANALYSIS
export function analyzeTeamAgainstMap(teamName: string, mapName: string) {
  const team = searchTeamByName(teamName)
  const mapStats = team?.mapStats[mapName.toLowerCase()]

  if (!team || !mapStats) return null

  const strength = {
    attackWinRate: mapStats.attackWinRate > 52,
    defenseWinRate: mapStats.defenseWinRate > 52,
  }

  return {
    team: team.name,
    map: mapName,
    overallPerformance: (mapStats.attackWinRate + mapStats.defenseWinRate) / 2,
    strength,
    playstyle: team.playstyle,
    recommendation:
      mapStats.attackWinRate > 52 && mapStats.defenseWinRate < 48
        ? 'Strong attack side team'
        : mapStats.defenseWinRate > 52 && mapStats.attackWinRate < 48
          ? 'Strong defense side team'
          : 'Balanced team',
  }
}

export function findTeamWeaknessMapByRegion(region: string) {
  const regionTeams = TEAM_LIST.filter((t) => t.region === region)
  const mapWeaknesses: Record<string, number> = {}

  regionTeams.forEach((team) => {
    MAPS.forEach((map) => {
      const mapStats = team.mapStats[map]
      if (mapStats) {
        if (!mapWeaknesses[map]) {
          mapWeaknesses[map] = 0
        }
        const winRate = (mapStats.attackWinRate + mapStats.defenseWinRate) / 2
        if (winRate < 48) {
          mapWeaknesses[map]++
        }
      }
    })
  })

  return mapWeaknesses
}

export default {
  searchTeamByName,
  getTeamPlayers,
  getPlayersByRole,
  getTeamMapStats,
  getTeamAgentPool,
  getPlayer,
  getPlayerStats,
  searchPlayerByRole,
  compareTeams,
  compareMapPerformance,
  getStrategyByTeamAndMap,
  getTeamStrengths,
  getTeamWeaknesses,
  getTeamPistolTendencies,
  getTeamMidRoundTendencies,
  getAllMaps,
  getAllTeamNames,
  getMapStatsSummary,
  analyzeTeamAgainstMap,
  findTeamWeaknessMapByRegion,
}
