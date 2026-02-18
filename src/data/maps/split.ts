import type { TeamSplitData } from '../types'

/**
 * DETAILED SPLIT MAP STRATEGIES FOR ALL TEAMS
 * Split is a two-site map with mid control as a crucial element
 */

export const SPLIT_STRATEGIES: Record<string, TeamSplitData> = {
  sentinels: {
    team: 'Sentinels',
    attack: {
      round1to3Defaults:
        'TenZ mid aggression with support from dapr. Primary stack B-site with Cypher info. Slow mid pressure into site selection based on early reads.',
      aExecute: {
        name: 'A-Site Omen Smoke Take',
        smokes:
          'Main smoke blocking heaven, secondary covering stairs, link smoke for safety',
        flashes: 'Breach flash from TenZ into site, backup Phoenix flash if needed',
        entrySequence:
          'TenZ entry with Cypher trip support, dapr breach clear, SicK info gathering pre-entry',
        postPlantPositions: [
          'Heaven anchor',
          'Rafters hold with info advantage',
          'Yard safety with utility cover',
        ],
      },
      bExecute: {
        name: 'B-Site Viper Wall Execution',
        smokes: 'Main viper wall site control, omen secondary backup, brimstone support',
        flashes: 'Breach secondary angle clear flashes',
        entrySequence:
          'Controlled util enabled take with TenZ aggressive entry, Viper wall protection',
        postPlantPositions: [
          'Lobby anchor position',
          'Viper wall covering plant',
          'Ramp safety angle',
        ],
      },
      midControlStrategy:
        'Dapr leads mid pressure, reads rotations through Breach util. Falls back on info or commits with team.',
      postPlantDefault: 'Split post-plant with heaven control and stairwell safety',
    },
    defense: {
      defaultSetup: '2 A-site (heaven + stairs with Cypher), 2 B-site, 1 mid (dapr rotating)',
      rotationTriggers: [
        'Heavy utility dump from TenZ indicates B-site take',
        'Early mid pressure from dapr triggers quick rotation',
      ],
      retakeDefault:
        'Full utility enabled retake with Cypher trip info, Breach clear and Omen setup',
      antiEcoPositioning: 'Aggressive anti-eco with Cypher info coverage',
      commonAnchorPositions: [
        'Heaven anchor holding through util',
        'Stairs anchor with trip support',
      ],
    },
  },

  'global-esports': {
    team: 'Global Esports',
    attack: {
      round1to3Defaults:
        'Aggressive mid pressure from Buzz and Meteor early. Dual stack positioning on likely site. Fast utility dump and commit to winning duels.',
      aExecute: {
        name: 'A-Site Aggressive Breach Entry',
        smokes: 'Aggressive smoke for main and heaven quick take, minimal info setup',
        flashes: 'Multiple aggressive flashes from Buzz and KAY/O for duel advantage',
        entrySequence:
          'zyppan direct aggressive entry with utility support, Meteor aggressive peeking',
        postPlantPositions: [
          'Aggressive heaven hold',
          'Rafters aggressive angle',
          'Yard aggressive peek angle',
        ],
      },
      bExecute: {
        name: 'B-Site Frenzy Stack Rush',
        smokes: 'Quick aggressive smokes with utility spam pressure',
        flashes: 'Constant aggressive flashing',
        entrySequence:
          'Direct aggressive take with Buzz aggressive entry, Lf1t util push behind',
        postPlantPositions: [
          'Aggressive ramp position',
          'Aggressive lobby hold',
          'Main aggressive peek angle',
        ],
      },
      midControlStrategy:
        'Aggressive mid domination through early pressure. Force rotations through constant util and aggression.',
      postPlantDefault: 'Wide aggressive plant with offensive post-plant holdings',
    },
    defense: {
      defaultSetup:
        '2 B anchor (aggressive ramp hold), 2 A aggressive positioning, 1 mid aggressive pressure',
      rotationTriggers: [
        'Any mid loss triggers aggressive counter-rotation',
        'Util dump triggers holding through anti-util',
      ],
      retakeDefault: 'Aggressive chaotic retake with constant util usage',
      antiEcoPositioning: 'Aggressive anti-eco holdings with aggressive peeks',
      commonAnchorPositions: [
        'Aggressive ramp anchor',
        'Main aggressive anchor',
      ],
    },
  },

  'paper-rex': {
    team: 'Paper Rex',
    attack: {
      round1to3Defaults:
        'Unpredictable mid movement with f0rsakeN aggression. Chaotic positioning with adaptive takes based on reads.',
      aExecute: {
        name: 'A-Site Chaotic Breach Stack',
        smokes: 'Creative smoke placements from various angles',
        flashes: 'Unpredictable flash patterns from cryo',
        entrySequence:
          'f0rsakeN chaotic aggressive entry with unpredictable support, mindfreak opportunistic angle',
        postPlantPositions: [
          'Rafters aggressive chaos',
          'Heaven unpredictable angle',
          'Yard wide aggressive hold',
        ],
      },
      bExecute: {
        name: 'B-Site Adaptive Quick Take',
        smokes: 'Adaptive smoke based on defense read',
        flashes: 'Quick aggressive flashes',
        entrySequence:
          'Quick aggressive site take with f0rsakeN direct entry and support',
        postPlantPositions: [
          'Ramp aggressive hold',
          'Lobby aggressive spread',
          'Main unpredictable angle',
        ],
      },
      midControlStrategy:
        'Chaotic multi-directional mid pressure. Constantly switches positions to confuse defenders.',
      postPlantDefault: 'Chaotic spread post-plant with unpredictable holds',
    },
    defense: {
      defaultSetup:
        '2 B chaos positioning, 2 A unpredictable, 1 mid rotating aggressively',
      rotationTriggers: [
        'Chaotic defensive rotations based on first kills',
        'Aggressive counter-rotations on util dump',
      ],
      retakeDefault:
        'Chaotic aggressive retake with unexpected angle plays',
      antiEcoPositioning:
        'Aggressive anti-eco with unpredictable positioning',
      commonAnchorPositions: [
        'Unpredictable ramp hold',
        'Chaotic main anchor',
      ],
    },
  },

  loud: {
    team: 'LOUD',
    attack: {
      round1to3Defaults:
        'Controlled mid setup with saadhak IGL coordination. Disciplined util sequencing into methodical site take.',
      aExecute: {
        name: 'A-Site Disciplined Breach Clear',
        smokes: 'Perfectly timed Astra smokes for heaven and main',
        flashes: 'Coordinated breach flashes with saadhak timing',
        entrySequence:
          'tuyz disciplined entry supported by pancada breach setup and Aspas util',
        postPlantPositions: [
          'Heaven disciplined anchor',
          'Rafters controlled hold',
          'Yard util covered position',
        ],
      },
      bExecute: {
        name: 'B-Site Viper Wall Controlled Execution',
        smokes:
          'Perfectly placed Viper wall, Omen secondary backup with astra sequencing',
        flashes: 'Timed breach flashes for clear progression',
        entrySequence:
          'Controlled methodical take with tuyz entry and full util setup',
        postPlantPositions: [
          'Viper wall covering plant',
          'Ramp controlled angle',
          'Lobby safety position',
        ],
      },
      midControlStrategy:
        'Controlled mid setup through saadhak IGL calls. Methodical positioning with info gathering first.',
      postPlantDefault:
        'Disciplined post-plant with full util coverage for retake readiness',
    },
    defense: {
      defaultSetup:
        '2 B stacked with setup (Killjoy util), 2 A anchored, 1 mid info gathering',
      rotationTriggers: [
        'Sova recon confirms site choice',
        'Util dump rotation triggers calculated response',
      ],
      retakeDefault:
        'Full utility enabled organized retake with perfect sequencing',
      antiEcoPositioning:
        'Disciplined anti-eco with util denial positioning',
      commonAnchorPositions: [
        'Killjoy B-ramp controlled anchor',
        'A-heaven disciplined anchor',
      ],
    },
  },

  fnatic: {
    team: 'Fnatic',
    attack: {
      round1to3Defaults:
        'Adaptable mid approach with balanced util. Flexible positioning that adapts to defender reads.',
      aExecute: {
        name: 'A-Site Adaptive Viper Entry',
        smokes: 'Adaptable smoke angles from Jamppi based on opponent',
        flashes: 'Coordinated flashes from Mistic with adaptive timing',
        entrySequence:
          'derke adaptive entry with position adjustment based on utility reads',
        postPlantPositions: [
          'Adaptable heaven hold',
          'Flexible rafters position',
          'Yard utility adjusted position',
        ],
      },
      bExecute: {
        name: 'B-Site Adaptable Quick Execute',
        smokes: 'Flexible smoke setup from Jamppi',
        flashes: 'Adaptive flash patterns from Mistic',
        entrySequence:
          'Coordinated adaptive entry with derke aggressive positioning',
        postPlantPositions: [
          'Adaptive ramp position',
          'Flexible lobby hold',
          'Main adaptable angle',
        ],
      },
      midControlStrategy:
        'Adaptive mid control reading opponent tendencies. Flexible commitment based on opponent patterns.',
      postPlantDefault:
        'Balanced post-plant with adaptive holds based on player strengths',
    },
    defense: {
      defaultSetup:
        '2 B balanced stack (Cypher info), 2 A balanced hold, 1 mid rotating based on reads',
      rotationTriggers: [
        'Early opponent util triggers read-based adaptation',
        'Balanced information sharing enables flexible rotations',
      ],
      retakeDefault:
        'Coordinated balanced retake with adaptive utility usage',
      antiEcoPositioning:
        'Balanced anti-eco with adaptive angle selection',
      commonAnchorPositions: [
        'Cypher B-ramp info anchor',
        'Chamber A-heaven balanced anchor',
      ],
    },
  },
}

export function getSplitStrategy(teamName: string): TeamSplitData | undefined {
  const normalized = teamName.toLowerCase().replace(/\s+/g, '-')
  return SPLIT_STRATEGIES[normalized]
}

export function getAllSplitStrategies(): TeamSplitData[] {
  return Object.values(SPLIT_STRATEGIES)
}
