/**
 * VALORANT AI Coach - Esports Data Types
 * Comprehensive TypeScript interfaces for team, player, and map data
 */

// PLAYER TYPES
export type Role = 'IGL' | 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel'
export type Region = 'Americas' | 'APAC' | 'EMEA'
export type Playstyle = 'Aggressive' | 'Balanced' | 'Defensive' | 'Strategic' | 'Chaotic'

export interface PlayerStats {
  acs: number // Average Combat Score (150-300)
  kdRatio: number // Kill/Death Ratio (0.8-1.5)
  firstBloodPct: number // First Blood percentage (5-25%)
  clutchPct: number // Clutch round win percentage (10-40%)
  headshotPct: number // Headshot percentage (15-40%)
  utilityEfficiency: number // Utility usage efficiency (0-100)
}

export interface Player {
  ign: string
  realName: string
  role: Role
  primaryAgents: string[]
  stats: PlayerStats
  strengths: string[]
  weaknesses: string[]
  playstyle: string // One sentence description
}

// TEAM TYPES
export interface TeamStats {
  aggression: number // 0-100
  adaptability: number // 0-100
  utilityEfficiency: number // 0-100
  clutchFactor: number // 0-100
}

export interface SitePreference {
  site: 'A' | 'B' | 'C'
  frequency: number // percentage
}

export interface MapStats {
  map: string
  attackWinRate: number
  defenseWinRate: number
  preferredSites: SitePreference[]
  avgRoundDuration: number // seconds
  pistolAttackWinRate: number
  pistolDefenseWinRate: number
  defaultStrategy: string
  weakness: string
}

export interface PistolRoundStrategy {
  buyStrategy: string
  defaultPositioning: Record<Role, string>
  firstMoveSequence: string
  preferredPlantSite: string
  winCondition: string
}

export interface DefensePistolStrategy {
  stackTendency: {
    site: 'A' | 'B' | 'C'
    percentage: number
  }
  rotationTrigger: string
  retakeStrategy: string
  commonPositions: string[]
}

export interface PistolTendencies {
  attack: PistolRoundStrategy
  defense: DefensePistolStrategy
}

export interface MidRoundTendencies {
  fakeFrequency: number // percentage
  lurkTendency: number // percentage
  rotateSpeed: 'Fast' | 'Medium' | 'Slow'
  economyStyle: 'Force-heavy' | 'Eco-disciplined' | 'Adaptive'
  timeoutUsagePattern: string
}

export interface Team {
  name: string
  region: Region
  playstyle: Playstyle
  stats: TeamStats
  players: Player[]
  mapStats: Record<string, MapStats>
  pistolTendencies: PistolTendencies
  midRoundTendencies: MidRoundTendencies
}

// SPLIT MAP SPECIFIC TYPES
export interface SplitSiteExecute {
  name: string
  smokes: string
  flashes: string
  entrySequence: string
  postPlantPositions: string[]
}

export interface SplitAttackStrategy {
  round1to3Defaults: string
  aExecute: SplitSiteExecute
  bExecute: SplitSiteExecute
  midControlStrategy: string
  postPlantDefault: string
}

export interface SplitDefenseStrategy {
  defaultSetup: string
  rotationTriggers: string[]
  retakeDefault: string
  antiEcoPositioning: string
  commonAnchorPositions: string[]
}

export interface TeamSplitData {
  team: string
  attack: SplitAttackStrategy
  defense: SplitDefenseStrategy
}

// AGENT POOL TYPES
export const AGENTS = {
  DUELIST: ['Jett', 'Raze', 'Reyna', 'Phoenix', 'Neon'],
  CONTROLLER: ['Omen', 'Brimstone', 'Viper', 'Astra', 'Harbor'],
  INITIATOR: ['Sova', 'Breach', 'Skye', 'KAY/O', 'Fade', 'Gekko'],
  SENTINEL: ['Killjoy', 'Cypher', 'Chamber', 'Sage'],
} as const

export const MAPS = ['Split', 'Haven', 'Bind', 'Ascent', 'Icebox', 'Breeze', 'Fracture', 'Pearl'] as const
