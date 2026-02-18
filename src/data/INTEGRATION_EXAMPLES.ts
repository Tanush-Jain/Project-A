/**
 * EXAMPLE: How to integrate esports data into the VALORANT AI Coach app
 * 
 * This file demonstrates how to use the esports data system
 * throughout the application components and pages.
 */

// ============================================================================
// EXAMPLE 1: Using data in the Dashboard
// ============================================================================

import dataUtils from '@/data/utils'

export function DashboardExample() {
  const allTeams = dataUtils.getAllTeamNames()
  
  const dashboardData = allTeams.map(teamName => ({
    name: teamName,
    team: dataUtils.searchTeamByName(teamName),
    players: dataUtils.getTeamPlayers(teamName),
    strengths: dataUtils.getTeamStrengths(teamName),
  }))

  return dashboardData
}

// ============================================================================
// EXAMPLE 2: Strategy page team selection
// ============================================================================

export function StrategyPageExample() {
  const teams = dataUtils.getAllTeamNames()
  const maps = dataUtils.getAllMaps()

  function onGenerateStrategy(yourTeam: string, opponent: string, map: string) {
    const yourTeamStats = dataUtils.searchTeamByName(yourTeam)
    const opponentStats = dataUtils.searchTeamByName(opponent)
    
    const comparison = dataUtils.compareTeams(yourTeam, opponent)
    const mapComparison = dataUtils.compareMapPerformance(yourTeam, opponent, map)
    const strategy = dataUtils.getStrategyByTeamAndMap(yourTeam, map)

    return {
      yourTeam: yourTeamStats,
      opponent: opponentStats,
      comparison,
      mapComparison,
      strategy,
    }
  }

  return { teams, maps, onGenerateStrategy }
}

// ============================================================================
// EXAMPLE 3: Player comparison view
// ============================================================================

export function PlayerComparisonExample() {
  function comparePlayersByRole(team1: string, team2: string, role: 'Duelist' | 'IGL' | 'Initiator' | 'Controller' | 'Sentinel') {
    const team1Players = dataUtils.getPlayersByRole(team1, role)
    const team2Players = dataUtils.getPlayersByRole(team2, role)

    return {
      role,
      team1: {
        teamName: team1,
        players: team1Players,
        avgACS: team1Players.reduce((sum, p) => sum + p.stats.acs, 0) / team1Players.length,
        avgKD: team1Players.reduce((sum, p) => sum + p.stats.kdRatio, 0) / team1Players.length,
      },
      team2: {
        teamName: team2,
        players: team2Players,
        avgACS: team2Players.reduce((sum, p) => sum + p.stats.acs, 0) / team2Players.length,
        avgKD: team2Players.reduce((sum, p) => sum + p.stats.kdRatio, 0) / team2Players.length,
      },
    }
  }

  return { comparePlayersByRole }
}

// ============================================================================
// EXAMPLE 4: Map statistics display
// ============================================================================

export function MapStatsExample() {
  function getMapPerformanceTable(mapName: string) {
    const summary = dataUtils.getMapStatsSummary(mapName)
    
    // Sort teams by attack win rate
    const sorted = summary.teamStats.sort((a, b) => 
      (b.attackWinRate || 0) - (a.attackWinRate || 0)
    )

    return {
      map: mapName,
      rankings: sorted.map((stat, index) => ({
        rank: index + 1,
        ...stat,
      })),
    }
  }

  return { getMapPerformanceTable }
}

// ============================================================================
// EXAMPLE 5: Split map detailed strategy display
// ============================================================================

export function SplitMapStrategyExample() {
  function displayTeamSplitStrategy(teamName: string) {
    const strategy = dataUtils.getStrategyByTeamAndMap(teamName, 'Split')
    
    if (!strategy) return null

    return {
      team: strategy.team,
      attack: {
        rounds1to3: strategy.attack.round1to3Defaults,
        aSiteExecute: {
          name: strategy.attack.aExecute.name,
          smokes: strategy.attack.aExecute.smokes,
          flashes: strategy.attack.aExecute.flashes,
          entry: strategy.attack.aExecute.entrySequence,
          postPlant: strategy.attack.aExecute.postPlantPositions,
        },
        bSiteExecute: {
          name: strategy.attack.bExecute.name,
          smokes: strategy.attack.bExecute.smokes,
          flashes: strategy.attack.bExecute.flashes,
          entry: strategy.attack.bExecute.entrySequence,
          postPlant: strategy.attack.bExecute.postPlantPositions,
        },
        midControl: strategy.attack.midControlStrategy,
      },
      defense: {
        setup: strategy.defense.defaultSetup,
        rotations: strategy.defense.rotationTriggers,
        retake: strategy.defense.retakeDefault,
        antiEco: strategy.defense.antiEcoPositioning,
        anchors: strategy.defense.commonAnchorPositions,
      },
    }
  }

  return { displayTeamSplitStrategy }
}

// ============================================================================
// EXAMPLE 6: Team analysis for coaching recommendations
// ============================================================================

export function CoachingAnalysisExample() {
  function generateCoachingRecommendations(teamName: string, targetMap: string) {
    const team = dataUtils.searchTeamByName(teamName)
    if (!team) return null

    const mapAnalysis = dataUtils.analyzeTeamAgainstMap(teamName, targetMap)
    const strengths = dataUtils.getTeamStrengths(teamName)
    const weaknesses = dataUtils.getTeamWeaknesses(teamName)
    const pistolTendencies = dataUtils.getTeamPistolTendencies(teamName)
    const midRoundTendencies = dataUtils.getTeamMidRoundTendencies(teamName)

    return {
      team: team.name,
      map: targetMap,
      overallAnalysis: mapAnalysis,
      strengths: strengths.slice(0, 5),
      weaknesses: weaknesses.slice(0, 5),
      playstyle: team.playstyle,
      stats: team.stats,
      pistolStrategy: pistolTendencies,
      midRoundPatterns: midRoundTendencies,
      recommendations: [
        mapAnalysis?.recommendation,
        team.stats.adaptability > 85 ? 'Team shows strong adaptability - prepare flexible counter-strategies' : null,
        team.stats.utilityEfficiency > 90 ? 'Focus on utility-heavy setups and anti-util positioning' : null,
        team.stats.clutchFactor > 85 ? 'Be prepared for late-round comebacks and momentum shifts' : null,
      ].filter(Boolean),
    }
  }

  return { generateCoachingRecommendations }
}

// ============================================================================
// EXAMPLE 7: Agent pool analysis
// ============================================================================

export function AgentPoolExample() {
  function analyzeTeamAgentPool(teamName: string) {
    const agents = dataUtils.getTeamAgentPool(teamName)
    const players = dataUtils.getTeamPlayers(teamName)

    const agentFrequency: Record<string, number> = {}
    players.forEach(player => {
      player.primaryAgents.forEach(agent => {
        agentFrequency[agent] = (agentFrequency[agent] || 0) + 1
      })
    })

    return {
      team: teamName,
      totalAgents: agents.size,
      agents: Array.from(agents).sort(),
      frequency: Object.entries(agentFrequency)
        .sort(([, a], [, b]) => b - a)
        .map(([agent, count]) => ({ agent, count })),
    }
  }

  return { analyzeTeamAgentPool }
}

// ============================================================================
// EXAMPLE 8: Searching across all teams by criteria
// ============================================================================

export function CrossTeamSearchExample() {
  function findAllPlayersWithHighACS(minACS: number = 250) {
    const playersWithHighACS = dataUtils.searchPlayerByRole('Duelist')
      .filter(({ player }) => player.stats.acs >= minACS)
      .sort((a, b) => b.player.stats.acs - a.player.stats.acs)

    return playersWithHighACS
  }

  function findTeamsSpecializingInMap(mapName: string, minWinRate: number = 52) {
    const teams = dataUtils.getAllTeamNames()
    const specialists = teams
      .map(teamName => ({
        team: teamName,
        analysis: dataUtils.analyzeTeamAgainstMap(teamName, mapName),
      }))
      .filter(({ analysis }) => 
        analysis && (analysis.overallPerformance > minWinRate)
      )
      .sort((a, b) => 
        (b.analysis?.overallPerformance || 0) - (a.analysis?.overallPerformance || 0)
      )

    return specialists
  }

  return { findAllPlayersWithHighACS, findTeamsSpecializingInMap }
}

// ============================================================================
// USAGE IN REACT COMPONENTS
// ============================================================================

/*
// In a React component:

import { useEffect, useState } from 'react'
import dataUtils from '@/data/utils'

export function TeamSelector() {
  const [selectedTeam, setSelectedTeam] = useState('')
  const [teamData, setTeamData] = useState(null)

  useEffect(() => {
    if (selectedTeam) {
      const team = dataUtils.searchTeamByName(selectedTeam)
      const players = dataUtils.getTeamPlayers(selectedTeam)
      const strengths = dataUtils.getTeamStrengths(selectedTeam)
      
      setTeamData({
        team,
        players,
        strengths,
      })
    }
  }, [selectedTeam])

  return (
    <div>
      <select 
        value={selectedTeam} 
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">Select a team...</option>
        {dataUtils.getAllTeamNames().map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      {teamData && (
        <div>
          <h2>{teamData.team.name}</h2>
          <p>Region: {teamData.team.region}</p>
          <p>Playstyle: {teamData.team.playstyle}</p>
          
          <h3>Players:</h3>
          <ul>
            {teamData.players.map(player => (
              <li key={player.ign}>
                {player.ign} ({player.role}) - ACS: {player.stats.acs}
              </li>
            ))}
          </ul>

          <h3>Strengths:</h3>
          <ul>
            {teamData.strengths.slice(0, 5).map((strength, i) => (
              <li key={i}>{strength}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
*/
