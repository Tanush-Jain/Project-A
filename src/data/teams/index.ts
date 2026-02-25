import { SENTINELS } from './sentinels'
import { GLOBAL_ESPORTS } from './global-esports'
import { PAPER_REX } from './paper-rex'
import { LOUD } from './loud'
import { FNATIC } from './fnatic'
import { NRG } from './nrg'
import { TEAM_VITALITY } from './team-vitality'
import { EDG } from './edg'
import { ZETA_DIVISION } from './zeta-division'
import { DRX } from './drx'
import { T1 } from './t1'
import type { Team } from '../types'

export const TEAMS: Record<string, Team> = {
  sentinels: SENTINELS,
  'global-esports': GLOBAL_ESPORTS,
  'paper-rex': PAPER_REX,
  loud: LOUD,
  fnatic: FNATIC,
  nrg: NRG,
  'team-vitality': TEAM_VITALITY,
  edg: EDG,
  'zeta-division': ZETA_DIVISION,
  drx: DRX,
  t1: T1,
}

export const TEAM_LIST = Object.values(TEAMS)

export function getTeam(teamName: string): Team | undefined {
  const normalized = teamName.toLowerCase().replace(/\s+/g, '-')
  return TEAMS[normalized]
}

export function getTeamByExactName(teamName: string): Team | undefined {
  return TEAM_LIST.find((team) => team.name.toLowerCase() === teamName.toLowerCase())
}

export function getAllTeams(): Team[] {
  return TEAM_LIST
}

export function getTeamsByRegion(region: string): Team[] {
  return TEAM_LIST.filter((team) => team.region === region)
}

export function getTeamsByPlaystyle(playstyle: string): Team[] {
  return TEAM_LIST.filter((team) => team.playstyle === playstyle)
}
