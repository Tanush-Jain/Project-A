import type { ValorantTeam } from '@/types/valorant'

// minimal placeholder stats for demonstration; real stats should be populated from data source
const makePlayer = (ign: string, role: ValorantTeam['players'][0]['role']): ValorantTeam['players'][0] => ({
  ign,
  realName: ign, // simple mapping for now
  role,
  mainAgents: ['Jett', 'Raze', 'Sage'],
  stats: {
    acs: Math.floor(200 + Math.random() * 100),
    kd: parseFloat((1 + Math.random() * 0.5).toFixed(2)),
    firstBloodRate: Math.floor(20 + Math.random() * 20),
    clutchRate: Math.floor(10 + Math.random() * 30),
    headshotRate: Math.floor(40 + Math.random() * 20),
    utilityEfficiency: Math.floor(50 + Math.random() * 40),
  },
  strengths: ['mechanical aim', 'map control'],
  weaknesses: ['low utility', 'slow rotates'],
})

export const valorantTeams: ValorantTeam[] = [
  {
    id: 'sentinels',
    name: 'Sentinels',
    region: 'Americas',
    logo: '/logos/sentinels.png',
    players: [
      makePlayer('TenZ', 'Duelist'),
      makePlayer('sick', 'Duelist'),
      makePlayer('drone', 'Initiator'),
      makePlayer('gob', 'Controller'),
      makePlayer('zombs', 'Sentinel'),
    ],
    playstyle: 'Aggressive',
    mapStats: [
      { map: 'Split', winRate: 62, attackWinRate: 65, defenseWinRate: 58, avgRoundsPlayed: 25, commonSites: ['A', 'B'] },
      { map: 'Ascent', winRate: 55, attackWinRate: 52, defenseWinRate: 58, avgRoundsPlayed: 24, commonSites: ['A', 'Mid'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Frenzy stack', stackTendency: { site: 'A', percentage: 60 } }, defense: { buyStrategy: 'Armor + sheriffs', stackTendency: { site: 'B', percentage: 55 } } },
    ],
  },
  {
    id: 'cloud9',
    name: 'Cloud9',
    region: 'Americas',
    logo: '/logos/cloud9.png',
    players: [
      makePlayer('shahZaM', 'Controller'),
      makePlayer('Auto', 'Duelist'),
      makePlayer('sgares', 'Sentinel'),
      makePlayer('ylene', 'Initiator'),
      makePlayer('mazer', 'Duelist'),
    ],
    playstyle: 'Balanced',
    mapStats: [
      { map: 'Bind', winRate: 58, attackWinRate: 60, defenseWinRate: 56, avgRoundsPlayed: 23, commonSites: ['A', 'B'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Standard rush', stackTendency: { site: 'B', percentage: 50 } }, defense: { buyStrategy: 'Half-buy', stackTendency: { site: 'A', percentage: 50 } } },
    ],
  },
  {
    id: 'nrg',
    name: 'NRG',
    region: 'Americas',
    logo: '/logos/nrg.png',
    players: [
      makePlayer('Victor', 'Duelist'),
      makePlayer('steel', 'Controller'),
      makePlayer('zekken', 'Sentinel'),
      makePlayer('tarik', 'Initiator'),
      makePlayer('Kazoku', 'Duelist'),
    ],
    playstyle: 'Aggressive',
    mapStats: [
      { map: 'Icebox', winRate: 60, attackWinRate: 63, defenseWinRate: 57, avgRoundsPlayed: 26, commonSites: ['A', 'B'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Heavy armor', stackTendency: { site: 'A', percentage: 65 } }, defense: { buyStrategy: 'Sheriff rush', stackTendency: { site: 'B', percentage: 60 } } },
    ],
  },
  {
    id: 'loud',
    name: 'LOUD',
    region: 'Americas',
    logo: '/logos/loud.png',
    players: [
      makePlayer('saadhak', 'Duelist'),
      makePlayer('aspas', 'Controller'),
      makePlayer('less', 'Sentinel'),
      makePlayer('drops', 'Initiator'),
      makePlayer('zekken', 'Duelist'),
    ],
    playstyle: 'Utility-Heavy',
    mapStats: [
      { map: 'Fracture', winRate: 63, attackWinRate: 66, defenseWinRate: 60, avgRoundsPlayed: 27, commonSites: ['A', 'B'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Frenzy stack', stackTendency: { site: 'B', percentage: 70 } }, defense: { buyStrategy: 'Armor + sheriff', stackTendency: { site: 'A', percentage: 65 } } },
    ],
  },
  {
    id: 'furia',
    name: 'FURIA',
    region: 'Americas',
    logo: '/logos/furia.png',
    players: [
      makePlayer('aspas', 'Duelist'),
      makePlayer('arT', 'Controller'),
      makePlayer('yeN', 'Sentinel'),
      makePlayer('uxzi', 'Initiator'),
      makePlayer('less', 'Duelist'),
    ],
    playstyle: 'Balanced',
    mapStats: [
      { map: 'Breeze', winRate: 56, attackWinRate: 53, defenseWinRate: 59, avgRoundsPlayed: 24, commonSites: ['A', 'B'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Frenzy rush', stackTendency: { site: 'A', percentage: 55 } }, defense: { buyStrategy: 'Half-buy', stackTendency: { site: 'B', percentage: 50 } } },
    ],
  },
  {
    id: 'fnatic',
    name: 'Fnatic',
    region: 'EMEA',
    logo: '/logos/fnatic.png',
    players: [
      makePlayer('Boaster', 'Initiator'),
      makePlayer('Mistic', 'Duelist'),
      makePlayer('Derke', 'Duelist'),
      makePlayer('Leo', 'Controller'),
      makePlayer('Magnum', 'Sentinel'),
    ],
    playstyle: 'Aggressive',
    mapStats: [
      { map: 'Icebox', winRate: 61, attackWinRate: 64, defenseWinRate: 58, avgRoundsPlayed: 25, commonSites: ['A', 'B'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Standard rush', stackTendency: { site: 'A', percentage: 55 } }, defense: { buyStrategy: 'Sheriff spam', stackTendency: { site: 'B', percentage: 60 } } },
    ],
  },
  {
    id: 'vitality',
    name: 'Team Vitality',
    region: 'EMEA',
    logo: '/logos/vitality.png',
    players: [
      makePlayer('Zyppan', 'Duelist'),
      makePlayer('ShadoW', 'Controller'),
      makePlayer('uhe', 'Sentinel'),
      makePlayer('nAts', 'Initiator'),
      makePlayer('Ardiis', 'Duelist'),
    ],
    playstyle: 'Defensive',
    mapStats: [
      { map: 'Haven', winRate: 57, attackWinRate: 54, defenseWinRate: 60, avgRoundsPlayed: 24, commonSites: ['A', 'C'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Armor heavy', stackTendency: { site: 'C', percentage: 60 } }, defense: { buyStrategy: 'Sheriff + ghost', stackTendency: { site: 'A', percentage: 55 } } },
    ],
  },
  {
    id: 'kcorp',
    name: 'Karmine Corp',
    region: 'EMEA',
    logo: '/logos/kcorp.png',
    players: [
      makePlayer('sNae', 'Duelist'),
      makePlayer('zANGI', 'Controller'),
      makePlayer('Rhay', 'Sentinel'),
      makePlayer('Ax1Le', 'Initiator'),
      makePlayer('Pasma', 'Duelist'),
    ],
    playstyle: 'Utility-Heavy',
    mapStats: [
      { map: 'Split', winRate: 59, attackWinRate: 62, defenseWinRate: 56, avgRoundsPlayed: 25, commonSites: ['A', 'B'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Frenzy stack', stackTendency: { site: 'B', percentage: 65 } }, defense: { buyStrategy: 'Half-buy', stackTendency: { site: 'A', percentage: 60 } } },
    ],
  },
  {
    id: 'navi',
    name: 'NAVI',
    region: 'EMEA',
    logo: '/logos/navi.png',
    players: [
      makePlayer('f0rest', 'Sentinel'),
      makePlayer('bondik', 'Controller'),
      makePlayer('s1n', 'Duelist'),
      makePlayer('hurMA', 'Initiator'),
      makePlayer('Victor', 'Duelist'),
    ],
    playstyle: 'Balanced',
    mapStats: [
      { map: 'Ascent', winRate: 60, attackWinRate: 58, defenseWinRate: 62, avgRoundsPlayed: 24, commonSites: ['A', 'Mid'] },
    ],
    pistolTendencies: [
      { attack: { buyStrategy: 'Standard split', stackTendency: { site: 'Mid', percentage: 50 } }, defense: { buyStrategy: 'Armor swap', stackTendency: { site: 'A', percentage: 55 } } },
    ],
  },
];

export function getTeamByName(name: string): ValorantTeam | undefined {
  return valorantTeams.find((t) => t.name.toLowerCase() === name.toLowerCase())
}

export function getAllTeamNames(): string[] {
  return valorantTeams.map((t) => t.name)
}
