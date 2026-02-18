/**
 * PROFESSIONAL VALORANT COACHING ENGINE
 * Elite-Level Strategy Generation for Competitive Matches
 * 
 * This module generates $10,000/hour coaching-level strategies with:
 * - Specific map callouts and positioning
 * - Second-by-second timing windows
 * - Professional decision trees
 * - Weakness exploitation frameworks
 * - Strength amplification tactics
 */

// MAP-SPECIFIC POSITIONING FRAMEWORKS
const MAP_CALLOUTS = {
  split: {
    attack: {
      default: 'A Main entrance, B Rafters entry point, Mid Vent control',
      siteA: 'A Screens, A Heaven, A Rafters, A Main, A Lobby',
      siteB: 'B Main, B Elbow, B Vents, B Rafters, B Hall',
      midAccess: 'Mid Vent, Vent Window, Mid Kitchen',
      rotateTimings: {
        aToB: '10-12 seconds via main rotate',
        bToA: '8-10 seconds via heaven rotate',
      },
    },
    defense: {
      setup3A2B: '3A setup anchors A Heaven and A Screens, fast rotates via A Main',
      setup2A3B: '2A setup abandons site for fast B stack rotation',
      midControl: 'One player mid vent watching both sites',
      rotatePositions: 'A Lobby wall rotate, B Hall rotate through main',
    },
  },
  haven: {
    attack: {
      default: 'C Site default, dual site takes to force split defense',
      siteA: 'A Lobby, A Garden, A Rafters, A Heaven',
      siteB: 'B Lobby, B Main, B Rafters, B Vents',
      siteC: 'C Lobby, C Rafters, C Long, C Street',
      multiSiteFlexibility: '3-site map enables flexible executes',
      rotateTimings: {
        aToC: '12-15 seconds',
        cToB: '10-12 seconds',
        bToA: '14-16 seconds',
      },
    },
    defense: {
      triSiteSetup:
        'Standard 1-1-3 split with mid player deciding late rotates based on info',
      earlyCamControl: 'Mid Garden cam crucial for B rotation determination',
      postPlantRotates: 'C retakes from B require 2-person minimum',
    },
  },
  bind: {
    attack: {
      teleportUsage: 'U-shaped map enables teleport surprises for second exec',
      siteA: 'A Lobby, A Garden, A Heaven, A Vents',
      siteB: 'B Lobby, B Main, B Heaven, B Rafters',
      infusingTacticsAKey: '60% attack split A → B fake rotate sequences',
    },
    defense: {
      heavenControl: 'Heaven control prevents both site executes',
      earlyTelepushes: 'Predict teleport uses at 0:20 and 0:40',
    },
  },
}

// ELITE PLAYER TENDENCIES & COUNTER SETUPS
export const PLAYER_ARCHETYPE_COUNTERS = {
  aggressiveDuelist: {
    weakness: 'Over-peeks in predictable spots',
    counters: [
      'Set crossfire trap at expected entry',
      'Use sentinel trips to restrict peek angles',
      'Play off-angle where they expect direct fight',
      'Pre-aim common aggressive positions',
    ],
    timingToExploit: '0:15-0:25 opening engagement window',
  },
  passiveSentinel: {
    weakness: 'Predictable anchor positions and rotates',
    counters: [
      'Quick-peek to gather intel early',
      'Attack anchor position immediately on site',
      'Force early rotation with utility pressure',
      'Counter-lurk their common rotate path',
    ],
    timingToExploit: 'First 20 seconds of round',
  },
  utilityControllerDependency: {
    weakness: 'Ineffective without perfect utility setup timing',
    counters: [
      'Push through smokes aggressively at 0:30',
      'Dump utility to bait out their smokes early',
      'Use duelists to create 1v1 duels outside smoke',
      'Coordinate multi-directional attacks breaking smoke setups',
    ],
    timingToExploit: '0:25-0:35 before setup completion',
  },
  initiatorDependentExec: {
    weakness: 'No information = confused execution',
    counters: [
      'Play off-default positions hiding from early info',
      'Set counter-initiator positions to deny information',
      'Punish info gathering with aggressive peeks',
      'Default until 0:40, then commit to opposite site',
    ],
    timingToExploit: 'First 30 seconds of round',
  },
}

// FORCE BUY vs ECO DECISION MATRIX
export const ECONOMY_MATRIX = {
  alwaysForceBuy: ['After 2 straight losses with 1400+ credits per player'],
  smartForceBuy: [
    'Win pistol, lose full buy: Force buy next → 4th round is eco/half-buy',
    'Lose pistol: Full eco round 2 → Stack 3500 credits for round 3 buy',
    'Win multiple rounds: Never force unless guaranteed winning scenario',
  ],
  fullEco: ['Below 900 credits per player', 'After successful full buy win'],
}

// SECOND-BY-SECOND TIMING TEMPLATES
export const ATTACK_TIMING_TEMPLATE = {
  pistolRound: {
    '0:00-0:10': 'Spawn → move to default positions, gather minimal utility',
    '0:10-0:25': 'Light pressure on multiple sites, establish mid control',
    '0:25-0:40': 'Read defense response, prepare execute commitment',
    '0:40-0:55': 'Full execute with coordinated utility dump',
    '0:55-1:05': 'Spike plant with post-plant setup',
    '1:05+': 'Hold positions, win post-plant 5v5 or pick advantage',
  },
  fullBuyRound: {
    '0:00-0:10': 'Default stack positioning (4 attackers, 1 lurk)',
    '0:10-0:20': 'Lurker info + mid control probe',
    '0:20-0:35': 'Utility fake on secondary site or mid pressure',
    '0:35-0:50': 'Primary site execute call based on information',
    '0:50-1:00': 'Coordinated multi-directional utility dump',
    '1:00-1:15': 'Spike plant + post-plant positions locked',
    '1:15+': 'Win condition = post-plant advantage or trade sequence',
  },
  ecoRound: {
    '0:00-0:15': 'Spread out for picks, use range advantage of weapons',
    '0:15-0:35': 'Hold defensive positions preventing site entry',
    '0:35-0:50': 'If successful picks, transition to light attacks',
    '0:50-1:10': 'If losing, save lives for next round buy',
    '1:10+': 'Accept loss, reset for economy round',
  },
}

export const DEFENSE_TIMING_TEMPLATE = {
  pistolRound: {
    '0:00-0:15': 'Setup default (3/2 or 2/3 split) with early utility',
    '0:15-0:30': 'Passive info gathering with cams/darts/trips',
    '0:30-0:45': 'Identify execute direction, call rotation',
    '0:45-1:00': 'Hold site or rotate team for retake setup',
    '1:00-1:20': 'Prevent spike plant or retake post-plant',
    '1:20+': 'Win condition = spike defuse or defender wipe',
  },
  fullDefenseRound: {
    '0:00-0:20': 'Setup default based on threat assessment',
    '0:20-0:40': 'Aggressive info gathering (early peek, cam advantage)',
    '0:40-0:55': 'Identify execute site, call rotation',
    '0:55-1:10': 'Execute rotation or hold with trade setup',
    '1:10-1:25': 'Plant denial or retake execution',
    '1:25+': 'Post-plant hold or defuse race',
  },
}

// TACTICAL DECISION TREE GENERATOR
export function generateDecisionTree(
  _mapName: string,
  yourStrength: string,
  opponentWeakness: string
): string[] {
  const decisions: string[] = []

  // Core decision framework
  decisions.push(`PRIMARY: Exploit ${opponentWeakness} by ${getExploitTactic(opponentWeakness)}`)
  decisions.push(`SECONDARY: Build around ${yourStrength} with ${getAmplificationTactic(yourStrength)}`)
  decisions.push(`ANTI-ADAPTATION: If opponent adjusts, pivot to ${getAdaptionPlan(opponentWeakness)}`)

  // Tactical checkpoints
  decisions.push('CHECKPOINT 0:20 - If losing early duels, shift to utility-based teamfight')
  decisions.push('CHECKPOINT 0:40 - If no execute opening visible, fake opposite site')
  decisions.push('CHECKPOINT 1:00 - Plant spike or commit full retake attempt')
  decisions.push('CHECKPOINT 1:15 - Post-plant: lock positions, deny defuse or trade kills')

  return decisions
}

function getExploitTactic(weakness: string): string {
  const exploits: Record<string, string> = {
    'predictable rotates': 'stack 4 on fake site, rotate burst attack to real site',
    'weak pistol defense': 'aggressive entries with 5-man rush',
    'high force-buy rate': 'anti-force positions with light armor/utility setup',
    'lurker predictability': 'counter-lurk with info-gathering initiator',
    'util-dependent executes': 'push through smokes before utility complete',
    'over-aggressive defaults': 'set crossfire trap at their expected entry',
  }
  return exploits[weakness.toLowerCase()] || 'targeted pressure on weakness'
}

function getAmplificationTactic(strength: string): string {
  const amplifications: Record<string, string> = {
    'high duelist frag rate': 'early duel setup, 2v5 post-plant advantage',
    'strong utility efficiency': 'rely on utility timings for site control',
    'excellent clutch rate': 'save IGL for retakes, let them close rounds',
    'superior aim': 'open duel focus, minimize utility dependency',
    'fast rotations': 'play aggressive defaults allowing fast rotation',
    'sentinel anchor mastery': 'leave anchor in retakes, build around defensive anchors',
  }
  return amplifications[strength.toLowerCase()] || 'coordinated team play'
}

function getAdaptionPlan(weakness: string): string {
  const adaptations: Record<string, string> = {
    'predictable rotates': 'show 3 site, rotate faster than expected',
    'weak pistol defense': 'switch to conservative 3-2 split on defense',
    'high force-buy rate': 'if they adjust, play normal buy rounds against their new strategy',
    'lurker predictability': 'run counter-lurker into their lurk path',
    'util-dependent executes': 'if they start throwing utility first, wait then execute',
    'over-aggressive defaults': 'abandon peeks, play passive holding',
  }
  return adaptations[weakness.toLowerCase()] || 'reassess and adjust'
}

// PISTOL ROUND SPECIALIST
export function generateElitePistolRound(
  map: string,
  isAttack: boolean,
  _yourTeamStyle: string,
  _opponentStyle: string
): {
  setup: string
  positioning: Record<string, string>
  utilitySequence: string[]
  winStrategy: string
} {
  return {
    setup: isAttack
      ? 'Light armor + Classic stacking 4 on primary site, 1 lurk mid'
      : 'Light armor + Classic spread default 3/2 or 2/3',

    positioning: isAttack
      ? {
          duelist: `Entry via ${MAP_CALLOUTS[map as keyof typeof MAP_CALLOUTS]?.attack.siteA || 'main'}`,
          initiator: 'Follow duelist, provide utility support',
          controller: 'Smoke primary site entry',
          sentinel: 'Wall secondary site or rotate blocking',
          lurker: 'Opposite site entry for information',
        }
      : {
          anchor: `Anchor ${(MAP_CALLOUTS[map as keyof typeof MAP_CALLOUTS]?.defense as any)?.setup3A2B || 'site'} with trip/camera`,
          support: 'Rotate-ready position',
          information: 'Mid control for intel gathering',
          flex1: 'Secondary anchor position',
          flex2: 'Rotate-ready flex position',
        },

    utilitySequence: isAttack
      ? [
          '0:05 - Initiator gathers info with dart/drone',
          '0:10 - Controller smokes primary entry',
          '0:15 - Duelist entry with sentinel backup',
          '0:20 - Plant spike with cover utility',
          '0:25 - Post-plant setup around spike',
        ]
      : [
          '0:05 - Information gathering (cams/darts/trips)',
          '0:15 - Call rotation based on attack pressure',
          '0:20 - Rotate team if necessary',
          '0:25 - Prevent plant or prepare retake',
          '0:30 - Defuse or eliminate attackers',
        ],

    winStrategy: isAttack
      ? 'Win first duel for economic advantage, plant spike, win 5v5 post-plant'
      : 'Trade kills early, deny spike plant, reset economy for stronger buy',
  }
}

// ANTI-ECO ECONOMY FRAMEWORK
export function generateAntiEcoStrategy(
  yourEconomyState: 'buy' | 'half-buy' | 'eco',
  opponentEconomyState: 'buy' | 'half-buy' | 'eco'
): {
  positioning: string
  utility: string
  objective: string
  fallback: string
} {
  if (yourEconomyState === 'buy' && opponentEconomyState === 'eco') {
    return {
      positioning:
        'Aggressive default with 4-man stack on expected site, force entry immediately',
      utility:
        'Full utility dump early to overwhelm light armor opponents',
      objective:
        'Win site quickly 5v5, snowball economy advantage into next round',
      fallback:
        'If losing initial fights, slow down and play utility-focused teamfight',
    }
  }

  if (yourEconomyState === 'eco' && opponentEconomyState === 'buy') {
    return {
      positioning:
        'Spread defensive setup, play off-angles where enemy cant see you simultaneously',
      utility:
        'Save utility for post-plant denial or targeted defensive positions',
      objective:
        'Get picks from unexpected angles, try to even numbers for 3v5 scenarios',
      fallback:
        'Save as many lives as possible, accept loss, reset for next buy',
    }
  }

  // Default framework
  return {
    positioning: 'Standard setup based on map default',
    utility: 'Coordinated utility timing',
    objective: 'Win round based on skill matchup',
    fallback: 'Trade kills and reset',
  }
}

// ADVANCED ADAPTATION FRAMEWORK
export const ADAPTATION_TRIGGERS = {
  downBy3: [
    'Switch to aggressive early-game timings',
    'Take unconventional defaults to catch opponent off-guard',
    'Play anti-eco rounds differently with pick-based focus',
    'Timeout to regroup and refresh strategy mid-half',
  ],
  upBy5: [
    'Tighten discipline on economy',
    'Play predictable anti-eco to avoid upsets',
    'Increase information gathering to maintain control',
    'Use superior economy to play default until late rounds',
  ],
  lostPistolRound: [
    'Eco round 2: Stack 3500+ credits',
    'Round 3: Full buy if team has 1400+ each',
    'Alternative: Half-buy round 3 if expecting half-buy from opponent',
  ],
  wonPistolRound: [
    'Round 2: Gun round with all utility + light armor',
    'If lose round 2: Full eco or smart half-buy',
    'If win round 2: Extend economy lead with continued buys',
  ],
}

export default {
  MAP_CALLOUTS,
  PLAYER_ARCHETYPE_COUNTERS,
  ECONOMY_MATRIX,
  ATTACK_TIMING_TEMPLATE,
  DEFENSE_TIMING_TEMPLATE,
  generateDecisionTree,
  generateElitePistolRound,
  generateAntiEcoStrategy,
  ADAPTATION_TRIGGERS,
}
