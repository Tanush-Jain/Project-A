import { getTeamByExactName } from '../data/teams'
import type { Team, Player, MapStats } from '../data/types'

// ===== TYPE DEFINITIONS FOR STRATEGY OUTPUT =====

export interface StrategyOutput {
  matchupAnalysis: string
  agentComp: AgentCompRecommendation[]
  pistolRounds: PistolRoundPlan
  roundTimeline: RoundTimelineEntry[]
  counterStrategy: CounterStrategy
  economy: EconomyGuide
}

export interface AgentCompRecommendation {
  player: string
  role: string
  recommendedAgent: string
  reasoning: string
}

export interface PistolRoundPlan {
  attack: {
    strategy: string
    positions: Record<string, string>
    utility: string[]
    winCondition: string
  }
  defense: {
    strategy: string
    positions: Record<string, string>
    utility: string[]
    stackSite: string
  }
}

export interface RoundTimelineEntry {
  timeSeconds: number
  description: string
  positions: Record<string, string>
  utility: string[]
  expectedGuns: string
}

export interface CounterStrategy {
  overview: string
  exploitWeakness: ExploitItem[]
}

export interface ExploitItem {
  opponentWeakness: string
  howToExploit: string
  recommendedPlay: string
}

export interface EconomyGuide {
  fullBuy: {
    when: string
    expectedGuns: string[]
    strategy: string
  }
  halfBuy: {
    when: string
    recommendedGuns: string[]
    strategy: string
  }
  save: {
    when: string
    expectedSetup: string
    goal: string
  }
  force: {
    when: string
    strategy: string
    expectedOutcome: string
  }
}

// ===== HELPER FUNCTIONS =====

// Dynamic import for Anthropic to avoid build issues
async function getAnthropicClient() {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  return new Anthropic({
    apiKey: import.meta.env.ANTHROPIC_API_KEY || '',
  })
}

function buildStrategistPrompt(
  yourTeam: Team,
  opponent: Team,
  map: string
): string {
  return `You are a VALORANT strategist AI. Generate a detailed match strategy for ${yourTeam.name} vs ${opponent.name} on ${map}.

YOUR TEAM: ${yourTeam.name} (${yourTeam.region})
- Playstyle: ${yourTeam.playstyle}
- Players:
${yourTeam.players.map((p) => `- ${p.ign} (${p.role}): ${p.primaryAgents[0]} | ACS:${p.stats.acs} | K/D:${p.stats.kdRatio} | FB:${p.stats.firstBloodPct}% | Clutch:${p.stats.clutchPct}% | Weaknesses: ${p.weaknesses.join(', ')}`).join('\n')}
- Map Stats on ${map}:
${yourTeam.mapStats[map] ? `Attack: ${yourTeam.mapStats[map].attackWinRate}% | Defense: ${yourTeam.mapStats[map].defenseWinRate}%` : 'No data'}

OPPONENT: ${opponent.name} (${opponent.region})
- Playstyle: ${opponent.playstyle}
- Players:
${opponent.players.map((p) => `- ${p.ign} (${p.role}): ${p.primaryAgents[0]} | ACS:${p.stats.acs} | K/D:${p.stats.kdRatio} | FB:${p.stats.firstBloodPct}% | Clutch:${p.stats.clutchPct}% | Weaknesses: ${p.weaknesses.join(', ')}`).join('\n')}
- Map Stats on ${map}:
${opponent.mapStats[map] ? `Attack: ${opponent.mapStats[map].attackWinRate}% | Defense: ${opponent.mapStats[map].defenseWinRate}%` : 'No data'}

Generate a comprehensive strategy in JSON format with these sections:

1. **matchupAnalysis**: 5 paragraphs analyzing the matchup
2. **agentComp**: Recommend agent comp with reasoning for each player
3. **pistolRounds**: Attack and defense pistol strategy with positions
4. **roundTimeline**: Round-by-round timeline (every 30 seconds: 0s, 30s, 60s, 90s, 120s)
5. **counterStrategy**: How to exploit each opponent weakness
6. **economy**: When to force, save, full buy

Return ONLY valid JSON matching this schema:
{
  "matchupAnalysis": "string (5 paragraphs)",
  "agentComp": [{"player": "string", "role": "string", "recommendedAgent": "string", "reasoning": "string"}],
  "pistolRounds": {
    "attack": {"strategy": "string", "positions": {"role": "position"}, "utility": ["string"], "winCondition": "string"},
    "defense": {"strategy": "string", "positions": {"role": "position"}, "utility": ["string"], "stackSite": "string"}
  },
  "roundTimeline": [{"timeSeconds": number, "description": "string", "positions": {"role": "string"}, "utility": ["string"], "expectedGuns": "string"}],
  "counterStrategy": {
    "overview": "string",
    "exploitWeakness": [{"opponentWeakness": "string", "howToExploit": "string", "recommendedPlay": "string"}]
  },
  "economy": {
    "fullBuy": {"when": "string", "expectedGuns": ["string"], "strategy": "string"},
    "halfBuy": {"when": "string", "recommendedGuns": ["string"], "strategy": "string"},
    "save": {"when": "string", "expectedSetup": "string", "goal": "string"},
    "force": {"when": "string", "strategy": "string", "expectedOutcome": "string"}
  }
}

Return ONLY the JSON, no other text.`
}

// ===== MAIN FUNCTION =====

export async function generateStrategy(
  yourTeamName: string,
  opponentTeamName: string,
  map: string
): Promise<StrategyOutput> {
  const yourTeam = getTeamByExactName(yourTeamName)
  const opponent = getTeamByExactName(opponentTeamName)

  if (!yourTeam) {
    throw new Error(`Team "${yourTeamName}" not found. Available: ${getAllTeamNames().join(', ')}`)
  }

  if (!opponent) {
    throw new Error(`Team "${opponentTeamName}" not found. Available: ${getAllTeamNames().join(', ')}`)
  }

  // Check for API key
  if (!import.meta.env.ANTHROPIC_API_KEY) {
    // Return fallback strategy if no API key
    return generateFallbackStrategy(yourTeam, opponent, map)
  }

  try {
    const anthropic = await getAnthropicClient()
    const prompt = buildStrategistPrompt(yourTeam, opponent, map)

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const strategy = JSON.parse(jsonMatch[0]) as StrategyOutput
    return strategy
  } catch (error) {
    console.error('Error generating strategy:', error)
    // Return fallback on error
    return generateFallbackStrategy(yourTeam, opponent, map)
  }
}

function generateFallbackStrategy(
  yourTeam: Team,
  opponent: Team,
  map: string
): StrategyOutput {
  const mapData = yourTeam.mapStats[map]
  const opponentMapData = opponent.mapStats[map]
  
  const starPlayer = yourTeam.players.find(p => p.role === 'Duelist') || yourTeam.players[0]
  const opponentWeakness = opponent.players.find(p => p.role === 'Sentinel')?.weaknesses[0] || 'vulnerable to aggression'

  return {
    matchupAnalysis: `${yourTeam.name} faces ${opponent.name} on ${map}. ${yourTeam.name} plays a ${yourTeam.playstyle} style while ${opponent.name} is known for ${opponent.playstyle} play. The key matchup will be ${starPlayer?.ign} facing the opponent's entry fragger. ${yourTeam.name} should leverage their ${starPlayer?.stats.firstBloodPct}% first blood rate to gain early advantages. Against ${opponent.name}'s ${opponentWeakness}, ${yourTeam.name} should press the attack. The map statistics show ${yourTeam.name} has a ${mapData?.attackWinRate || 50}% attack win rate and ${mapData?.defenseWinRate || 50}% defense win rate on ${map}.`,
    agentComp: yourTeam.players.map((player) => ({
      player: player.ign,
      role: player.role,
      recommendedAgent: player.primaryAgents[0] || 'flex',
      reasoning: `${player.ign} on ${player.primaryAgents[0]} gives ${yourTeam.name} ${player.stats.kdRatio > 1.2 ? 'strong fragging power' : 'consistent utility'} matching their ${player.stats.kdRatio} K/D ratio.`,
    })),
    pistolRounds: {
      attack: {
        strategy: 'Fast site take using smoke and flash',
        positions: {
          Duelist: 'Site entry',
          Controller: 'Smoke supporter',
          Initiator: 'Flash backup',
          Sentinel: 'Anchor',
          IGL: 'Mid caller',
        },
        utility: ['Smokes to block vision', 'Flash for entry'],
        winCondition: 'Win entry duel and plant',
      },
      defense: {
        strategy: 'Default setup with rotate capability',
        positions: {
          Duelist: 'Aggressive anchor',
          Controller: 'Smoke controller',
          Initiator: 'Information',
          Sentinel: 'Site anchor',
          IGL: 'Mid control',
        },
        utility: ['Cypher trips', 'Killjoy util'],
        stackSite: 'B',
      },
    },
    roundTimeline: [
      { timeSeconds: 0, description: 'Round start - default positions', positions: { Duelist: 'Default', Controller: 'Default', Initiator: 'Default', Sentinel: 'Default', IGL: 'Mid' }, utility: [], expectedGuns: 'Pistols' },
      { timeSeconds: 30, description: 'Mid control or site pressure', positions: { Duelist: 'Forward', Controller: 'Smokes', Initiator: 'Recon', Sentinel: 'Anchor', IGL: 'Call' }, utility: ['Smokes', 'Drones'], expectedGuns: 'Pistols/SMGs' },
      { timeSeconds: 60, description: 'Site commitment or defense', positions: { Duelist: 'Entry', Controller: 'Plant', Initiator: 'Support', Sentinel: 'Anchor', IGL: 'Trade' }, utility: ['Flash', 'Utility'], expectedGuns: 'SMGs/Rifles' },
      { timeSeconds: 90, description: 'Plant or retake phase', positions: { Duelist: 'Site', Controller: 'Plant spot', Initiator: 'Off-angle', Sentinel: 'Anchor', IGL: 'Default' }, utility: ['Plant'], expectedGuns: 'Rifles' },
      { timeSeconds: 120, description: 'Round end or clutch', positions: { Duelist: 'Clutch', Controller: 'Default', Initiator: 'Support', Sentinel: 'Anchor', IGL: 'Trade' }, utility: [], expectedGuns: 'Rifles' },
    ],
    counterStrategy: {
      overview: `Exploit ${opponent.name}'s weaknesses through targeted strategies based on their ${opponent.playstyle} playstyle.`,
      exploitWeakness: opponent.players.flatMap((p) =>
        p.weaknesses.slice(0, 1).map((w) => ({
          opponentWeakness: w,
          howToExploit: `Target ${p.ign} when they are ${w.toLowerCase()}`,
          recommendedPlay: `Force ${p.ign} into disadvantageous situations using aggressive utility`,
        }))
      ).slice(0, 5),
    },
    economy: {
      fullBuy: {
        when: 'After winning pistol + bonus or eco round',
        expectedGuns: ['Vandal', 'Phantom', 'Operator'],
        strategy: 'Full utility buy with rifles',
      },
      halfBuy: {
        when: 'Lost pistol but won bonus',
        recommendedGuns: ['Spectre', 'Stinger', 'Sheriff'],
        strategy: 'Light buy with SMG or save for next',
      },
      save: {
        when: 'Lost 2+ consecutive or no money',
        expectedSetup: 'Default positions with minimal investment',
        goal: 'Win pistol next round',
      },
      force: {
        when: 'Must win round (match point, half switch)',
        strategy: 'All-in with whatever weapons available',
        expectedOutcome: 'High risk but necessary',
      },
    },
  }
}

export function getAllTeamNames(): string[] {
  return [
    'Sentinels',
    'NRG',
    'LOUD',
    'Paper Rex',
    'Fnatic',
    'Team Vitality',
    'EDG',
    'ZETA Division',
    'DRX',
    'T1',
  ]
}

export function getAllMaps(): string[] {
  return ['Ascent', 'Bind', 'Haven', 'Split', 'Icebox', 'Breeze', 'Fracture', 'Pearl']
}

