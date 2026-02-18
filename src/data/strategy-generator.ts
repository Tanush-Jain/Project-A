import type { Team } from './types'

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * STRATEGY OUTPUT INTERFACE
 * Represents a complete tactical analysis from a professional esports coach
 */
export interface StrategyOutput {
  overview: {
    matchupAnalysis: string
    keyAdvantages: string[]
    keyThreats: string[]
    recommendedApproach: string
  }

  agentComposition: {
    agents: Array<{
      agent: string
      role: string
      player: string
      reasoning: string
      keyResponsibilities: string[]
    }>
    compositionRationale: string
    alternativeComps: Array<{
      name: string
      agents: string[]
      whenToUse: string
    }>
  }

  pistolRounds: {
    defense: {
      setup: Array<{
        player: string
        agent: string
        position: string
        responsibility: string
      }>
      strategy: string
      utilitySequence: Array<{
        time: string
        player: string
        action: string
      }>
      winCondition: string
      fallbackPlan: string
    }
    attack: {
      setup: Array<{
        player: string
        agent: string
        position: string
        responsibility: string
      }>
      strategy: string
      utilitySequence: Array<{
        time: string
        player: string
        action: string
      }>
      plantSite: string
      winCondition: string
      fallbackPlan: string
    }
  }

  roundTimeline: {
    gunRoundAttack: Array<{
      timeRange: string
      phase: string
      actions: string[]
      keyDecisions: string[]
      utilityUsage: string[]
    }>
    gunRoundDefense: Array<{
      timeRange: string
      phase: string
      actions: string[]
      keyDecisions: string[]
      rotationTriggers: string[]
    }>
  }

  counterStrategy: {
    opponentWeaknesses: Array<{
      weakness: string
      howToExploit: string
      timing: string
    }>
    opponentStrengths: Array<{
      strength: string
      howToNeutralize: string
      avoidance: string
    }>
    adaptationTriggers: Array<{
      situation: string
      adjustment: string
    }>
  }

  economyPlan: {
    forceBuyRounds: number[]
    ecoRounds: number[]
    bonusRoundStrategy: string
    ultimateEconomyTargets: string[]
  }
}

/**
 * AGENT SYNERGY SCORING SYSTEM
 * Evaluates how well agents work together
 */
// @ts-expect-error - Used for reference/future enhancements
const AGENT_SYNERGIES: Record<string, Record<string, number>> = {
  Jett: {
    Omen: 0.95, // Smoke entry
    Sova: 0.85, // Recon + dash plays
    Breach: 0.90, // Breach flash + dash entry
    Phoenix: 0.88,
    Raze: 0.75,
    Sage: 0.80,
    Cypher: 0.70,
  },
  Raze: {
    Breach: 0.92, // Double entry power
    Omen: 0.88,
    Sova: 0.85,
    Phoenix: 0.90,
    Jett: 0.75,
    Sage: 0.82,
  },
  Omen: {
    Sova: 0.90, // Smokes + recon
    Jett: 0.95,
    Phoenix: 0.85,
    Breach: 0.88,
    Viper: 0.80,
    Raze: 0.88,
  },
  Sova: {
    Omen: 0.90,
    Breach: 0.92, // Shock darts + flashes
    Cypher: 0.85,
    Jett: 0.85,
    Phoenix: 0.88,
    Raze: 0.85,
  },
  Breach: {
    Sova: 0.92,
    Raze: 0.92,
    Omen: 0.88,
    Jett: 0.90,
    Phoenix: 0.85,
  },
  Cypher: {
    Sova: 0.85,
    Omen: 0.80,
    Sage: 0.82,
    Phoenix: 0.75,
  },
  Sage: {
    Cypher: 0.82,
    Omen: 0.80,
    Viper: 0.85,
    Sova: 0.80,
  },
  Phoenix: {
    Breach: 0.85,
    Omen: 0.85,
    Sova: 0.88,
    Raze: 0.90,
    Jett: 0.88,
  },
  Viper: {
    Sage: 0.85,
    Cypher: 0.80,
    Omen: 0.80,
  },
}

/**
 * MAP-SPECIFIC AGENT REQUIREMENTS
 * Certain maps strongly favor certain agents
 */
const MAP_AGENT_PREFERENCES: Record<string, Record<string, number>> = {
  split: {
    Omen: 0.95, // Incredible one-ways on Split
    Viper: 0.85,
    Sova: 0.80,
    Cypher: 0.90,
    Breach: 0.85,
  },
  icebox: {
    Viper: 1.0, // Nearly mandatory
    Sova: 0.95, // Great for outside control
    Jett: 0.90, // Dash into elbow
    Phoenix: 0.80,
  },
  haven: {
    Sova: 0.95, // 3-site control
    Sage: 0.90, // Orb placement crucial
    Omen: 0.85,
    Cypher: 0.85,
  },
  bind: {
    Omen: 0.90,
    Sage: 0.85,
    Sova: 0.75,
    Cypher: 0.80,
  },
  lotus: {
    Sova: 0.95, // Recon for exec
    Breach: 0.90,
    Phoenix: 0.85,
    Sage: 0.80,
  },
  pearl: {
    Sova: 0.90,
    Jett: 0.85,
    Phoenix: 0.85,
    Omen: 0.80,
  },
  sunset: {
    Sova: 0.85,
    Omen: 0.85,
    Sage: 0.80,
    Breach: 0.85,
  },
  ascent: {
    Jett: 0.90,
    Omen: 0.85,
    Sova: 0.85,
    Sage: 0.80,
  },
}

/**
 * AGENT COUNTER EFFECTIVENESS
 * How well agents counter other agents
 */
// @ts-expect-error - Used for reference/future enhancements
const AGENT_COUNTERS: Record<string, Record<string, number>> = {
  Cypher: {
    Jett: 0.85, // Trips and cam catch dash plays
    Raze: 0.80,
    Phoenix: 0.75,
  },
  Breach: {
    Cypher: 0.90, // Flashes destroy cam play
    Jett: 0.85,
    Sage: 0.80,
  },
  Jett: {
    Viper: 0.85, // Can't dash into walls
    Sage: 0.75, // Wall slows her
  },
  Phoenix: {
    Omen: 0.80, // Smokes counter entry
    Viper: 0.85,
  },
  Sova: {
    Cypher: 0.75, // Cam destroys drones
  },
  Raze: {
    Viper: 0.85, // Wall blocks grenades
  },
}

/**
 * Helper: Calculate matchup differential
 */
function calculateMatchupDifferential(
  yourTeam: Team,
  opponentTeam: Team,
  metric: keyof Team['stats']
): number {
  return (yourTeam.stats[metric] - opponentTeam.stats[metric]) / 100
}

/**
 * Helper: Identify key player matchups
 */
function analyzePlayerMatchups(yourTeam: Team, opponentTeam: Team): string[] {
  const insights: string[] = []

  const yourDuelists = yourTeam.players.filter((p) => p.role === 'Duelist')
  const opponentDuelists = opponentTeam.players.filter((p) => p.role === 'Duelist')

  yourDuelists.forEach((yourDuelist) => {
    opponentDuelists.forEach((oppDuelist) => {
      const acsDiff = yourDuelist.stats.acs - oppDuelist.stats.acs
      if (Math.abs(acsDiff) > 15) {
        const advantage = acsDiff > 0 ? 'advantage' : 'disadvantage'
        insights.push(
          `${yourDuelist.ign} has a ${Math.abs(acsDiff)} ACS ${advantage} vs ${oppDuelist.ign} - ` +
            `${acsDiff > 0 ? 'abuse duelist matchup early' : 'avoid early duelist trades'}`
        )
      }
    })
  })

  return insights
}

/**
 * Helper: Build optimal agent composition
 */
function buildAgentComposition(
  yourTeam: Team,
  opponentTeam: Team,
  map: string
): Array<{
  agent: string
  role: string
  player: string
  reasoning: string
  keyResponsibilities: string[]
}> {
  const composition: Array<{
    agent: string
    role: string
    player: string
    reasoning: string
    keyResponsibilities: string[]
  }> = []

  const mapLower = map.toLowerCase()
  const mapPreferences = MAP_AGENT_PREFERENCES[mapLower] || {}

  // Determine role requirements based on map and enemy comp
  // const roles = ['Duelist', 'Sentinel', 'Initiator', 'Controller', 'Controller']
  const roleCount: Record<string, number> = {
    Duelist: 1,
    Sentinel: 1,
    Initiator: 1,
    Controller: 2,
  }

  // Get players for each role
  for (const [role, needed] of Object.entries(roleCount)) {
    const playersInRole = yourTeam.players.filter((p) => p.role === role)

    for (let i = 0; i < needed && i < playersInRole.length; i++) {
      const player = playersInRole[i]

      // Pick agent with best synergy and map fit
      const bestAgent = player.primaryAgents.sort((a, b) => {
        const aMapScore = mapPreferences[a.toLowerCase()] || 0.5
        const bMapScore = mapPreferences[b.toLowerCase()] || 0.5
        return bMapScore - aMapScore
      })[0]

      const responsibilities = getPlayerResponsibilities(
        role,
        bestAgent,
        opponentTeam.playstyle
      )

      composition.push({
        agent: bestAgent,
        role,
        player: player.ign,
        reasoning:
          `${player.ign} specializes in ${bestAgent} with ${player.stats.acs} ACS. ` +
          `${bestAgent} has ${(mapPreferences[bestAgent.toLowerCase()] || 0.7) * 100}% map fit for ${map}.`,
        keyResponsibilities: responsibilities,
      })
    }
  }

  return composition
}

/**
 * Helper: Determine player responsibilities based on role and opponent
 */
function getPlayerResponsibilities(
  role: string,
  agent: string,
  opponentPlaystyle: string
): string[] {
  const responsibilities: Record<string, string[]> = {
    Duelist: [
      'First contact + map control',
      'Entry trades and repositioning',
      'Aggressive mid-round pivots',
      'Clutch generation through mechanics',
    ],
    Sentinel: [
      'Site anchor positioning',
      'Cross-fire setup establishment',
      'Retake impact and trading',
      'Anti-lurk positioning when needed',
    ],
    Initiator: [
      'Utility setup for site exec',
      'Recon and information gathering',
      'Shock dart trading and support',
      'Coordinated entry sequences',
    ],
    Controller: [
      'Smoke placement for site control',
      'One-way setup for defense',
      'Post-plant positioning and vision',
      'Rotational support and timing',
    ],
  }

  const baseResponsibilities = responsibilities[role] || []

  // Adjust for opponent playstyle
  if (opponentPlaystyle === 'Aggressive') {
    baseResponsibilities.push('Be ready for early utility trades')
  } else if (opponentPlaystyle === 'Defensive') {
    baseResponsibilities.push('Execute quickly before retake utility assembled')
  }

  return baseResponsibilities
}

/**
 * Helper: Generate pistol round strategy
 */
function generatePistolStrategy(
  yourTeam: Team,
  opponentTeam: Team,
  map: string,
  isAttack: boolean
): StrategyOutput['pistolRounds'][keyof StrategyOutput['pistolRounds']] {
  const opponentPistolTendencies = opponentTeam.pistolTendencies

  if (isAttack) {
    // ATTACK PISTOL
    const playerSetup = [
      {
        player: yourTeam.players[0].ign,
        agent: 'Jett',
        position: 'Mid entry',
        responsibility: 'Mid control and site decision maker',
      },
      {
        player: yourTeam.players[1].ign,
        agent: 'Omen',
        position: 'B long',
        responsibility: 'Initial smoke for site deception',
      },
      {
        player: yourTeam.players[2].ign,
        agent: 'Sova',
        position: 'A main',
        responsibility: 'Recon dart for site clarity',
      },
      {
        player: yourTeam.players[3].ign,
        agent: 'Breach',
        position: 'Mid support',
        responsibility: 'Flash support and entry setup',
      },
      {
        player: yourTeam.players[4].ign,
        agent: 'Sage',
        position: 'Lurk position',
        responsibility: 'Utility support and plant setup',
      },
    ]

    const utilitySequence = [
      { time: '0:05', player: yourTeam.players[2].ign, action: 'Sova dart into site' },
      { time: '0:10', player: yourTeam.players[0].ign, action: 'Scout mid for early info' },
      { time: '0:15', player: yourTeam.players[1].ign, action: 'Omen smoke A long' },
      {
        time: '0:25',
        player: yourTeam.players[3].ign,
        action: 'Breach flash entry support',
      },
      { time: '0:35', player: yourTeam.players[4].ign, action: 'Slow orb on plant' },
    ]

    return {
      setup: playerSetup,
      strategy:
        `Light armor buy with upgraded pistols. Scout mid aggressively with ${yourTeam.players[0].ign}. ` +
        `If defense is stacked on one site, fake and hit other. ` +
        `${opponentPistolTendencies.attack.buyStrategy} - counter with staggered positions to avoid getting clustered.`,
      utilitySequence,
      plantSite: opponentPistolTendencies.attack.preferredPlantSite === 'A' ? 'B' : 'A',
      winCondition:
        `Pick opening trade with superior positioning. Use mid control to delay their retake. ` +
        `Plant with Sage slow, force them into bad defuse angles.`,
      fallbackPlan:
        `If caught in crossfire, rotate to opposite site. Sage orb + Omen smoke allows escape rotation.`,
    }
  } else {
    // DEFENSE PISTOL
    const playerSetup = [
      {
        player: yourTeam.players[1].ign,
        agent: 'Cypher',
        position: opponentPistolTendencies.defense.stackTendency.percentage > 50 ? opponentPistolTendencies.defense.stackTendency.site : (opponentPistolTendencies.defense.stackTendency.site === 'A' ? 'B' : 'A'),
        responsibility: 'Camera trip setup for early kills',
      },
      {
        player: yourTeam.players[0].ign,
        agent: 'Jett',
        position: 'Mid control',
        responsibility: 'Pick and mobility',
      },
      {
        player: yourTeam.players[2].ign,
        agent: 'Sage',
        position: 'Opposite stack site',
        responsibility: 'Delay and wall defense',
      },
      {
        player: yourTeam.players[3].ign,
        agent: 'Omen',
        position: 'Site anchor',
        responsibility: 'One-way smoke setup',
      },
      {
        player: yourTeam.players[4].ign,
        agent: 'Sova',
        position: 'Support position',
        responsibility: 'Utility support',
      },
    ]

    const utilitySequence = [
      { time: '0:10', player: yourTeam.players[1].ign, action: 'Place Cypher cam and trips' },
      { time: '0:20', player: yourTeam.players[3].ign, action: 'Setup one-way smoke' },
      { time: '0:30', player: yourTeam.players[0].ign, action: 'Peek mid for info' },
      {
        time: '0:45',
        player: yourTeam.players[4].ign,
        action: 'Listen for utility + rotate calls',
      },
    ]

    return {
      setup: playerSetup,
      strategy:
        `Stack likely attack site (${opponentPistolTendencies.defense.stackTendency.percentage}% stack ${opponentPistolTendencies.defense.stackTendency.site}). ` +
        `Use Cypher trips for early info. Never peek into their upgrades. Let them waste utility on empty site.`,
      utilitySequence,
      winCondition:
        `Get early pick with trips or camera. Force them into 4v5 retake scenario. ` +
        `Trade with your utilities - Sage wall, Omen smoke.`,
      fallbackPlan:
        `If exec is early and fast, immediately rotate off site. Use Jett mobility to swing and catch pushers.`,
    }
  }
}

interface RoundTimelineEntry {
  timeRange: string
  phase: string
  actions: string[]
  keyDecisions: string[]
  utilityUsage: string[]
  rotationTriggers: string[]
}

/**
 * Helper: Generate round timeline
 */
function generateRoundTimeline(
  yourTeam: Team,
  opponentTeam: Team,
  map: string,
  isAttack: boolean
): RoundTimelineEntry[] {
  const timeline: RoundTimelineEntry[] = []

  if (isAttack) {
    timeline.push({
      timeRange: '0:00-0:15',
      phase: 'Default Spread & Info Gathering',
      actions: [
        `All players split map control - ${yourTeam.players[0].ign} mid entry`,
        `${yourTeam.players[2].ign} (Sova) fire dart into primary site`,
        `${yourTeam.players[1].ign} (Omen) prepare smokes for secondary site`,
      ],
      keyDecisions: [
        'Do we have mid control?',
        'Is opponent stacked on primary site?',
        'Are there lurkers we can catch early?',
      ],
      utilityUsage: [
        `Sova recon dart (${yourTeam.players[2].ign})`,
        'Jett dash peek mid',
        'Light utility commits only',
      ],
      rotationTriggers: [],
    })

    timeline.push({
      timeRange: '0:15-0:30',
      phase: 'Mid-Control & Exec Build',
      actions: [
        `Gather mid dominance if possible`,
        `${yourTeam.players[2].ign} pulls back for another dart rotation`,
        `Duelists (${yourTeam.players[0].ign}) start aggressive peeks`,
      ],
      keyDecisions: [
        'Do we have man advantage?',
        'Is site exec economy-efficient?',
        'Should we fake opposite site?',
      ],
      utilityUsage: [
        'Breach flash support',
        'Omen smoke positioning',
        'Begin entry setup',
      ],
      rotationTriggers: [],
    })

    timeline.push({
      timeRange: '0:30-0:45',
      phase: 'EXECUTE or FAKE',
      actions: [
        `COMMIT: Full site execute with 4 players pushing site`,
        `Breach flashes in, ${yourTeam.players[0].ign} enters, Omen provides cover smoke`,
      ],
      keyDecisions: [
        'Do we have player advantage?',
        'Is retake utility visible?',
        'Can we plant safely?',
      ],
      utilityUsage: [
        'Breach flash entry',
        'Omen offensive smokes',
        'Sova shock darts for site clear',
        'Sage slow for plant defense',
      ],
      rotationTriggers: [],
    })

    timeline.push({
      timeRange: '0:45-1:00',
      phase: 'Post-Plant Lockdown',
      actions: [
        `Plant bomb (${yourTeam.players[4].ign} Sage plants)`,
        `Position for retake denial`,
        `${yourTeam.players[0].ign} (Jett) high ground, ${yourTeam.players[3].ign} lurk watch`,
      ],
      keyDecisions: [
        'How many are hitting site?',
        'Can we get picks before defuse?',
        'Should we play off-site retake defense?',
      ],
      utilityUsage: [
        'Omen post-plant vision',
        'Sage orb for defuse deny',
        'Cypher cam if applicable',
      ],
      rotationTriggers: [],
    })

    timeline.push({
      timeRange: '1:00-1:30',
      phase: 'Retake Defense & Bomb Hold',
      actions: [
        `Hold positions and play time`,
        `Get early picks if possible`,
        `${yourTeam.players[0].ign} (Jett) dash in if overwhelmed`,
      ],
      keyDecisions: [
        'Do we have retake resources?',
        'Should we play aggressive or passive?',
        'Can we get last-second picks?',
      ],
      utilityUsage: [
        'Remaining utility for duelist trades',
        'Ult economy awareness',
      ],
      rotationTriggers: [],
    })
  } else {
    timeline.push({
      timeRange: '0:00-0:30',
      phase: 'Default Setup & Anchor Down',
      actions: [
        `2 site, 2 mid, 1 lurk setup`,
        `${yourTeam.players[1].ign} (Cypher) camera placed for early info`,
        `${yourTeam.players[3].ign} (Omen) smoke one-way setup`,
      ],
      keyDecisions: [
        'Where is the lurker coming from?',
        'Do we have utility stacks visible?',
        'Should we play aggressive or passive info?',
      ],
      utilityUsage: [
        'Cypher trips B',
        'Omen wall prep',
        'Sage orb utility ready',
      ],
      rotationTriggers: [
        'Heavy utility dump indicates site exec',
        'Mid control loss triggers rotation',
        'Sound cues from attackers',
      ],
    })

    timeline.push({
      timeRange: '0:30-0:50',
      phase: 'Exec Intel & Rotation Trigger',
      actions: [
        `Listen for exec utility (smokes, flashes)`,
        `${yourTeam.players[2].ign} (Sage) watches for mid rotation`,
        `If exec visible, rotation mid is triggered`,
      ],
      keyDecisions: [
        'Which site is exec hitting?',
        'How many rotations do we need?',
        'Is this a fake or real exec?',
      ],
      utilityUsage: [
        'Minimal utility - preserve for retake',
        'Camera positioning for timings',
      ],
      rotationTriggers: [
        'Double smoke on one site',
        'Exec utility sounds (Breach, Sova)',
        'Player callouts',
      ],
    })

    timeline.push({
      timeRange: '0:50-1:10',
      phase: 'Active Rotation & Crossfire Setup',
      actions: [
        `Rotate off site if exec is clear`,
        `Establish crossfire angles with mid rotators`,
        `${yourTeam.players[0].ign} (Jett) swing for pick attempts`,
      ],
      keyDecisions: [
        'Is their entry strong or weak?',
        'Should we play retake or delay?',
        'Can we get an opening pick?',
      ],
      utilityUsage: [
        'Omen offensive smoke positioning',
        'Sage wall entry denial',
        'Breach flash support for counter-attack',
      ],
      rotationTriggers: [
        'Confirmed exec on one site',
        'Plant sound if they get through',
        'Multiple utility dumps',
      ],
    })

    timeline.push({
      timeRange: '1:10-1:30',
      phase: 'Retake Setup & Final Fight',
      actions: [
        `Assemble for organized retake`,
        `${yourTeam.players[3].ign} (Omen) smokes site entry`,
        `${yourTeam.players[0].ign} (Jett) aggressive entry with utility`,
      ],
      keyDecisions: [
        'Do we have plant planted?',
        'How many attackers are alive?',
        'Can we overwhelm with utilities?',
      ],
      utilityUsage: [
        'Full utility deployment for retake',
        'Ult economy for final fight',
      ],
      rotationTriggers: [
        'Bomb planted - immediate rotation',
        'All attackers visible on one site',
        'Spike timer warnings',
      ],
    })
  }

  return timeline
}

/**
 * Helper: Analyze opponent weaknesses
 */
function analyzeOpponentWeaknesses(
  yourTeam: Team,
  opponentTeam: Team
): StrategyOutput['counterStrategy']['opponentWeaknesses'] {
  const weaknesses: StrategyOutput['counterStrategy']['opponentWeaknesses'] = []

  // Low adaptability = exploit consistency
  if (opponentTeam.stats.adaptability < 75) {
    weaknesses.push({
      weakness: 'Low adaptability score - predictable playbook',
      howToExploit: 'Stack their most likely site and punish with crossfire',
      timing: 'First 3 rounds to identify pattern',
    })
  }

  // Low utility efficiency = counter with util spam
  if (opponentTeam.stats.utilityEfficiency < 75) {
    weaknesses.push({
      weakness: 'Weak utility efficiency - wasting resources',
      howToExploit: 'Rush before utility is deployed, or bait utility throws',
      timing: 'Early rounds before they settle into rhythm',
    })
  }

  // Low aggression = exploit passivity
  if (opponentTeam.stats.aggression < 65) {
    weaknesses.push({
      weakness: 'Passive playstyle - slow default setup',
      howToExploit: 'Early aggressive pushes before defense is established',
      timing: '0:10-0:20 mark on your attack side',
    })
  }

  // High aggression but low clutch = exploit overcommit
  if (opponentTeam.stats.aggression > 80 && opponentTeam.stats.clutchFactor < 75) {
    weaknesses.push({
      weakness: 'Aggressive but low clutch potential - overcommits',
      howToExploit: 'Play patient defense, let them burn utility, win trades',
      timing: 'Mid-round when utility is exhausted',
    })
  }

  // Pistol tendencies analysis
  if (opponentTeam.pistolTendencies.attack.buyStrategy === 'Frenzy Stack') {
    weaknesses.push({
      weakness: 'Frenzy stack pistol - vulnerable to anti-rush',
      howToExploit: 'Heavy armor with operator, let them funnel into chokepoints',
      timing: 'Defense pistol - play anti-eco positions',
    })
  }

  // Mid-round tendencies
  if (opponentTeam.midRoundTendencies.fakeFrequency > 35) {
    weaknesses.push({
      weakness: 'High fake frequency - commits to rotations',
      howToExploit: 'Play disciplined, dont over-rotate on first exec signals',
      timing: '0:40-1:00 minute mark',
    })
  }

  return weaknesses
}

/**
 * Helper: Analyze opponent strengths
 */
function analyzeOpponentStrengths(
  yourTeam: Team,
  opponentTeam: Team
): StrategyOutput['counterStrategy']['opponentStrengths'] {
  const strengths: StrategyOutput['counterStrategy']['opponentStrengths'] = []

  // High adaptability = need backup strats
  if (opponentTeam.stats.adaptability > 85) {
    strengths.push({
      strength: 'Highly adaptable - quick playstyle changes',
      howToNeutralize: 'Prepare 2-3 alternative comp/strat combinations',
      avoidance: 'Never commit fully to one plan - keep options open',
    })
  }

  // High utility efficiency = respect util trades
  if (opponentTeam.stats.utilityEfficiency > 85) {
    strengths.push({
      strength: 'Excellent utility usage - efficient resource management',
      howToNeutralize: 'Avoid fighting into their utility - punish positioning instead',
      avoidance: 'Dont push into blind smokes or utility-heavy areas',
    })
  }

  // High aggression = expect early peeks
  if (opponentTeam.stats.aggression > 80) {
    strengths.push({
      strength: 'Aggressive default setup - early map pressure',
      howToNeutralize: 'Play off-site, force them into unfavorable fights',
      avoidance: 'Avoid early duelist peeks - let them come to you',
    })
  }

  // High clutch factor = tight rounds late
  if (opponentTeam.stats.clutchFactor > 85) {
    strengths.push({
      strength: 'Exceptional clutch ability - strong in disadvantage',
      howToNeutralize: 'Close out rounds decisively - get multi-picks early',
      avoidance: 'Dont let rounds go 1v2 or 1v3 scenarios',
    })
  }

  // Specific player threats
  const topPlayer = opponentTeam.players.reduce((prev, current) =>
    prev.stats.acs > current.stats.acs ? prev : current
  )

  strengths.push({
    strength: `${topPlayer.ign} - Elite duelist with ${topPlayer.stats.acs} ACS and ${topPlayer.stats.firstBloodPct}% first-blood rate`,
    howToNeutralize: `Assign your best sentinel/controller to watch their position - deny angles`,
    avoidance: `Never 1v1 duel ${topPlayer.ign} - use utility and numbers`,
  })

  return strengths
}

/**
 * Helper: Generate adaptation triggers
 */
function generateAdaptationTriggers(
  yourTeam: Team,
  opponentTeam: Team
): StrategyOutput['counterStrategy']['adaptationTriggers'] {
  return [
    {
      situation: 'Opponent has won 3+ rounds in a row with same site exec',
      adjustment: 'Switch to anti-exec setup - stack opposite site, rotate early',
    },
    {
      situation: 'Your team is 0-3 down',
      adjustment: 'Play defensive save round, reset economy, force them into anti-eco',
    },
    {
      situation:
        'Opponent duelist (top ACS player) has 5+ kills by round 5',
      adjustment:
        'Assign hard counter - Cypher camera, Breach flash support, focus their position',
    },
    {
      situation: 'Opponent is consistently faking and forcing rotations',
      adjustment:
        'Stop falling for fakes - play disciplined positions, wait for visual contact',
    },
    {
      situation: 'Losing pistol side consistently',
      adjustment:
        'Shift to pure anti-eco rounds - maximize picks over trades, preserve utilities',
    },
    {
      situation: 'Opponent has 4+ ultimate abilities across team',
      adjustment: 'Play safe - stagger enemy ult usage, avoid multi-ult fights',
    },
    {
      situation: 'Your team is up 8-3 in round economy',
      adjustment:
        'Full buy and complete stack - dictate terms with overwhelming firepower',
    },
    {
      situation: 'Opponent agent composition is unusual/unconventional',
      adjustment:
        'Adapt on-the-fly - identify new synergies they might exploit, adjust counter-comp',
    },
  ]
}

/**
 * Helper: Generate economy plan
 */
function generateEconomyPlan(yourTeam: Team): StrategyOutput['economyPlan'] {
  return {
    forceBuyRounds: [4, 7, 9], // Standard force buy timings in VALORANT economy
    ecoRounds: [3, 6, 8],
    bonusRoundStrategy:
      'After winning gun round, decide between full buy (1900+ credits each) or light buy based on opponent resources. ' +
      'If confident, full buy. If uncertain, conservative light armor + upgraded pistols.',
    ultimateEconomyTargets: [
      'Ensure your Duelist has ultimate by round 5-6 for aggressive plays',
      'Maintain Controller ultimate for post-plant or site exec on rounds 11+',
      'Generate Sentinel ultimate by round 7-8 for anti-retake setup',
    ],
  }
}

/**
 * MAIN STRATEGY GENERATION FUNCTION
 * Produces professional-grade tactical analysis for a team matchup
 */
export function generateStrategy(
  yourTeam: Team,
  opponentTeam: Team,
  map: string
): StrategyOutput {
  const mapLower = map.toLowerCase()
  // Map characteristics - simplified version for complexity-free generation
  const mapChar = { 
    playStyle: mapLower === 'haven' ? 'Balanced' : mapLower.includes('split') ? 'Defensive' : 'Aggressive',
    complexity: mapLower === 'icebox' || mapLower === 'haven' || mapLower === 'breeze' ? 'High' as const : 'Medium' as const, 
    keyFeatures: ['site control', 'utility placement', 'rotational flexibility'] 
  }

  // ═══════════════════════════════════════════════════════════════════
  // 1. MATCHUP OVERVIEW & ANALYSIS
  // ═══════════════════════════════════════════════════════════════════

  const aggressionDiff = calculateMatchupDifferential(
    yourTeam,
    opponentTeam,
    'aggression'
  )
  const adaptabilityDiff = calculateMatchupDifferential(
    yourTeam,
    opponentTeam,
    'adaptability'
  )
  const clutchDiff = calculateMatchupDifferential(
    yourTeam,
    opponentTeam,
    'clutchFactor'
  )

  const playerMatchupInsights = analyzePlayerMatchups(yourTeam, opponentTeam)

  const matchupAnalysis =
    `${yourTeam.name} (${yourTeam.playstyle}) vs ${opponentTeam.name} (${opponentTeam.playstyle}) on ${map}: ` +
    `Stylistic clash between ${yourTeam.stats.aggression > opponentTeam.stats.aggression ? 'aggressive' : 'passive'} your team ` +
    `and ${opponentTeam.stats.aggression > 75 ? 'aggressive' : 'defensive'} opponents. ` +
    `${playerMatchupInsights.length > 0 ? playerMatchupInsights[0] : ''} ` +
    `Key stat differential: Adaptability ${Math.abs(adaptabilityDiff * 100).toFixed(0)}%, ` +
    `Aggression ${Math.abs(aggressionDiff * 100).toFixed(0)}%, Clutch ${Math.abs(clutchDiff * 100).toFixed(0)}%. ` +
    `${map} favors ${mapChar.playStyle === 'Defensive' ? 'patient, site-setup-focused teams' : 'fast-paced, aggressive playmakers'}. ` +
    `${yourTeam.name} has a statistical ${clutchDiff > 0 ? 'advantage' : 'disadvantage'} in close rounds. `

  const keyAdvantages = []
  if (adaptabilityDiff > 0.05) {
    keyAdvantages.push(
      `Superior adaptability (+${(adaptabilityDiff * 100).toFixed(0)}%) - more flexible mid-round pivots`
    )
  }
  if (clutchDiff > 0.05) {
    keyAdvantages.push(
      `Stronger clutch potential - better in 1vX scenarios late round`
    )
  }
  if (yourTeam.stats.utilityEfficiency > opponentTeam.stats.utilityEfficiency) {
    keyAdvantages.push(
      `Better utility efficiency - maximize resources, minimize waste`
    )
  }
  if (yourTeam.players.some((p) => p.stats.acs > opponentTeam.players[0].stats.acs + 20)) {
    keyAdvantages.push(`Duelist advantage - stronger entry fraggers`)
  }
  if (keyAdvantages.length === 0) {
    keyAdvantages.push(
      'Balanced matchup - execution and discipline will decide'
    )
  }

  const keyThreats = []
  if (opponentTeam.stats.adaptability > 85) {
    keyThreats.push(
      `${opponentTeam.name} is highly adaptable - expect multiple strat variations`
    )
  }
  if (opponentTeam.stats.aggression > 80) {
    keyThreats.push(
      `Early aggression threat - prepare anti-rush positions for pistol`
    )
  }
  const topOpponent = opponentTeam.players.reduce((prev, current) =>
    prev.stats.acs > current.stats.acs ? prev : current
  )
  if (topOpponent.stats.acs > 260) {
    keyThreats.push(
      `${topOpponent.ign} is an elite mechanical player - mute angles, use utility`
    )
  }
  if (opponentTeam.stats.clutchFactor > 85) {
    keyThreats.push(
      `Exceptional clutch team - never give away free money rounds`
    )
  }

  const recommendedApproach =
    `Play ${yourTeam.stats.aggression > opponentTeam.stats.aggression ? 'to your aggressive strengths' : 'disciplined, patient defaults'}. ` +
    `${map} is ${mapChar.complexity === 'High' ? 'complex' : 'straightforward'} - ` +
    `focus on ${mapChar.keyFeatures ? mapChar.keyFeatures[0] : 'site control'}. ` +
    `Leverage your ${keyAdvantages[0] || 'team cohesion'} and mitigate ${keyThreats[0] || 'early aggression'} ` +
    `through disciplined defaults and timely rotations.`

  // ═══════════════════════════════════════════════════════════════════
  // 2. AGENT COMPOSITION
  // ═══════════════════════════════════════════════════════════════════

  const agentComp = buildAgentComposition(yourTeam, opponentTeam, map)

  const compositionRationale =
    `${agentComp.map((a) => a.agent).join(', ')} provides balanced site control with ` +
    `${agentComp.filter((a) => a.role === 'Controller').length} controllers for vision denial, ` +
    `${agentComp.filter((a) => a.role === 'Initiator').length} initiators for info, and ` +
    `strong ${agentComp[0].agent} entry potential. Composition counters ${opponentTeam.playstyle} playstyle ` +
    `by ${opponentTeam.stats.aggression > 80 ? 'having defensive utility for anti-rush' : 'maintaining offensive pressure'}.`

  const alternativeComps = [
    {
      name: 'Double Duelist Aggressive',
      agents: ['Jett', 'Raze', 'Breach', 'Omen', 'Sage'],
      whenToUse:
        'When opponent shows passive defaults - overwhelm with dual entry pressure (0-1 on attack rounds)',
    },
    {
      name: 'Sentinel-Heavy Defensive',
      agents: ['Jett', 'Cypher', 'Sova', 'Omen', 'Sage'],
      whenToUse:
        'If opponent is running high-aggression compositions - prioritize retakes and area denial',
    },
    {
      name: 'Recon-Focused Information',
      agents: ['Phoenix', 'Sova', 'Breach', 'Omen', 'Sage'],
      whenToUse:
        'For post-round 8 play - maximize information gathering, setup multi-site execs with better reads',
    },
  ]

  // ═══════════════════════════════════════════════════════════════════
  // 3. PISTOL ROUND STRATEGIES
  // ═══════════════════════════════════════════════════════════════════

  const defensePistol = generatePistolStrategy(
    yourTeam,
    opponentTeam,
    map,
    false
  ) as StrategyOutput['pistolRounds']['defense']
  const attackPistol = generatePistolStrategy(
    yourTeam,
    opponentTeam,
    map,
    true
  ) as StrategyOutput['pistolRounds']['attack']

  // ═══════════════════════════════════════════════════════════════════
  // 4. ROUND TIMELINE (DETAILED 15-SECOND INTERVALS)
  // ═══════════════════════════════════════════════════════════════════

  const gunRoundAttack = generateRoundTimeline(
    yourTeam,
    opponentTeam,
    map,
    true
  )
  const gunRoundDefense = generateRoundTimeline(
    yourTeam,
    opponentTeam,
    map,
    false
  )

  // ═══════════════════════════════════════════════════════════════════
  // 5. COUNTER-STRATEGY ANALYSIS
  // ═══════════════════════════════════════════════════════════════════

  const opponentWeaknesses = analyzeOpponentWeaknesses(yourTeam, opponentTeam)
  const opponentStrengths = analyzeOpponentStrengths(yourTeam, opponentTeam)
  const adaptationTriggers = generateAdaptationTriggers(yourTeam, opponentTeam)

  // ═══════════════════════════════════════════════════════════════════
  // 6. ECONOMY PLAN
  // ═══════════════════════════════════════════════════════════════════

  const economyPlan = generateEconomyPlan(yourTeam)

  // ═══════════════════════════════════════════════════════════════════
  // 7. ASSEMBLE & RETURN FULL STRATEGY OUTPUT
  // ═══════════════════════════════════════════════════════════════════

  return {
    overview: {
      matchupAnalysis,
      keyAdvantages:
        keyAdvantages.length > 0
          ? keyAdvantages
          : ['Well-balanced matchup - execution decides outcome'],
      keyThreats:
        keyThreats.length > 0
          ? keyThreats
          : ['Respect opponent fundamentals'],
      recommendedApproach,
    },

    agentComposition: {
      agents: agentComp,
      compositionRationale,
      alternativeComps,
    },

    pistolRounds: {
      defense: defensePistol,
      attack: attackPistol,
    },

    roundTimeline: {
      gunRoundAttack,
      gunRoundDefense,
    },

    counterStrategy: {
      opponentWeaknesses,
      opponentStrengths,
      adaptationTriggers,
    },

    economyPlan,
  }
}
