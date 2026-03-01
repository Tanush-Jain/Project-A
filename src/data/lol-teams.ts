import { ValorantTeam } from '@/types/lol'

// Valorant Pro Teams - converted from LoL per user request
// Using existing valorant-teams.ts data as foundation, adding more teams for 20 total
export const valorantProTeams: ValorantTeam[] = [
  {
    id: 'sentinels',
    name: 'Sentinels',
    region: 'Americas',
    logo: '/logos/sentinels.png',
    emoji: '🔴',
  },
  {
    id: 'cloud9',
    name: 'Cloud9',
    region: 'Americas',
    logo: '/logos/cloud9.png',
    emoji: '☁️',
  },
  {
    id: 'nrg',
    name: 'NRG',
    region: 'Americas',
    logo: '/logos/nrg.png',
    emoji: '🟢',
  },
  {
    id: 'loud',
    name: 'LOUD',
    region: 'Americas',
    logo: '/logos/loud.png',
    emoji: '🔵',
  },
  {
    id: 'furia',
    name: 'FURIA',
    region: 'Americas',
    logo: '/logos/furia.png',
    emoji: '🟠',
  },
  {
    id: 'leviat',
    name: 'Leviatán',
    region: 'Americas',
    logo: '/logos/leviat.png',
    emoji: '🦁',
  },
  {
    id: 'kru',
    name: 'KRU',
    region: 'Americas',
    logo: '/logos/kru.png',
    emoji: '🟣',
  },
  {
    id: '100t',
    name: '100 Thieves',
    region: 'Americas',
    logo: '/logos/100t.png',
    emoji: '🥷',
  },
  {
    id: 'eg',
    name: 'Evil Geniuses',
    region: 'Americas',
    logo: '/logos/eg.png',
    emoji: '💚',
  },
  {
    id: 'optic',
    name: 'OpTic',
    region: 'Americas',
    logo: '/logos/optic.png',
    emoji: '🟢',
  },
  {
    id: 'fnatic',
    name: 'Fnatic',
    region: 'EMEA',
    logo: '/logos/fnatic.png',
    emoji: '🟠',
  },
  {
    id: 'vitality',
    name: 'Team Vitality',
    region: 'EMEA',
    logo: '/logos/vitality.png',
    emoji: '🟡',
  },
  {
    id: 'kcorp',
    name: 'Karmine Corp',
    region: 'EMEA',
    logo: '/logos/kcorp.png',
    emoji: '🟣',
  },
  {
    id: 'navi',
    name: 'NAVI',
    region: 'EMEA',
    logo: '/logos/navi.png',
    emoji: '⚫',
  },
  {
    id: 'g2',
    name: 'G2 Esports',
    region: 'EMEA',
    logo: '/logos/g2.png',
    emoji: '🔴',
  },
  {
    id: 'liquid',
    name: 'Team Liquid',
    region: 'EMEA',
    logo: '/logos/liquid.png',
    emoji: '🔵',
  },
  {
    id: 'heretics',
    name: 'Heretics',
    region: 'EMEA',
    logo: '/logos/heretics.png',
    emoji: '🟠',
  },
  {
    id: 'prx',
    name: 'Paper Rex',
    region: 'Pacific',
    logo: '/logos/prx.png',
    emoji: '🦅',
  },
  {
    id: 'drx',
    name: 'DRX',
    region: 'Pacific',
    logo: '/logos/drx.png',
    emoji: '🐉',
  },
  {
    id: 't1',
    name: 'T1',
    region: 'Pacific',
    logo: '/logos/t1.png',
    emoji: '🔴',
  },
  {
    id: 'gen-g',
    name: 'Gen.G',
    region: 'Pacific',
    logo: '/logos/gen-g.png',
    emoji: '⚪',
  },
  {
    id: 'edg',
    name: 'EDward Gaming',
    region: 'Pacific',
    logo: '/logos/edg.png',
    emoji: '🟡',
  },
  {
    id: 'fut',
    name: 'FunPlus Phoenix',
    region: 'Pacific',
    logo: '/logos/fut.png',
    emoji: '🔥',
  },
  {
    id: 'global',
    name: 'Global Esports',
    region: 'Pacific',
    logo: '/logos/global.png',
    emoji: '🌍',
  },
  {
    id: 'zeta',
    name: 'ZETA DIVISION',
    region: 'Pacific',
    logo: '/logos/zeta.png',
    emoji: '⚡',
  },
]

// Keep both export names for backward compatibility
export const lolTeams = valorantProTeams

export function getLoLTeam(id: string): ValorantTeam | undefined {
  return valorantProTeams.find((t) => t.id === id || t.name.toLowerCase() === id.toLowerCase())
}

export function getValorantTeam(id: string): ValorantTeam | undefined {
  return valorantProTeams.find((t) => t.id === id || t.name.toLowerCase() === id.toLowerCase())
}

export function getAllTeamNames(): string[] {
  return valorantProTeams.map((t) => t.name)
}
