import { GoogleGenerativeAI } from '@google/generative-ai'
import type {
  ValorantTeam,
  StrategyOutput,
  MapStats,
  PistolTendency,
  AgentPick,
  TimelineEvent,
} from '@/types/valorant'
import { valorantTeams, getTeamByName } from '@/data/valorant-teams'

const genAI = new GoogleGenerativeAI(
  (process.env.NEXT_PUBLIC_GEMINI_API_KEY as string) || ''
)

// --- helpers -------------------------------------------------------------
export function getMapData(map: string): { callouts: string[]; sites: string[] } {
  // a small lookup, expand as needed
  const data: Record<string, { callouts: string[]; sites: string[] }> = {
    Split: { callouts: ['A Heaven', 'A Main', 'B Main', 'Mid'], sites: ['A', 'B'] },
    Ascent: { callouts: ['A Main', 'B Main', 'Mid', 'Market'], sites: ['A', 'B'] },
    Bind: { callouts: ['A Short', 'B Long', 'Teleport', 'Hookah'], sites: ['A', 'B'] },
    Icebox: { callouts: ['A Rafters', 'B Nest', 'Mid', 'Yellow'], sites: ['A', 'B'] },
    Haven: { callouts: ['A Heaven', 'B Garage', 'C Mid', 'CT'], sites: ['A', 'B', 'C'] },
    Breeze: { callouts: ['A Cave', 'B Window', 'Mid', 'Courtyard'], sites: ['A', 'B'] },
    Fracture: { callouts: ['A Drop', 'B Sewer', 'Mid', 'Attacker Spawn'], sites: ['A', 'B'] },
  }

  return data[map] || { callouts: [], sites: [] }
}

async function callGeminiWithRetry(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  let attempts = 0
  while (attempts < 3) {
    try {
      const res = await model.generateContent(prompt)
      return res.response.text()
    } catch (err) {
      attempts++
      if (attempts >= 3) throw err
    }
  }
  throw new Error('unreachable')
}

function parseAndValidateStrategy(raw: string): StrategyOutput {
  const parsed = JSON.parse(raw) as StrategyOutput
  // rudimentary validation
  if (!parsed.matchupAnalysis || !parsed.agentComposition) {
    throw new Error('Invalid strategy schema')
  }
  return parsed
}

function validateAgentComp(comp: AgentPick[]): boolean {
  return comp.length === 5
}

function validateTimeline(tl: TimelineEvent[]): boolean {
  return tl.length >= 12
}

// -------------------------------------------------------------------------
export async function generateValorantStrategy(
  map: string,
  yourTeam: string,
  opponentTeam: string
): Promise<StrategyOutput> {
  const yourTeamData = getTeamByName(yourTeam)
  const opponentData = getTeamByName(opponentTeam)
  const mapData = getMapData(map)

  if (!yourTeamData || !opponentData) {
    throw new Error('Team not found')
  }

  const prompt = `
You are an elite VALORANT VCT analyst creating a winning strategy.

MATCH CONTEXT:
Your Team: ${yourTeam} (${yourTeamData.region})
- Players: ${yourTeamData.players
    .map((p) => `${p.ign} (${p.role})`)
    .join(', ')}
- Playstyle: ${yourTeamData.playstyle}
- Map Stats on ${map}: ${
    yourTeamData.mapStats.find((m) => m.map === map)?.winRate || 'N/A'
  }% WR

Opponent: ${opponentTeam} (${opponentData.region})
- Players: ${opponentData.players
    .map((p) => `${p.ign} (${p.role})`)
    .join(', ')}
- Playstyle: ${opponentData.playstyle}
- Map Stats on ${map}: ${
    opponentData.mapStats.find((m) => m.map === map)?.winRate || 'N/A'
  }% WR

Map: ${map}
- Key Callouts: ${mapData.callouts.join(', ')}
- Default Sites: ${mapData.sites.join(', ')}

CURRENT META (VCT 2026 Kickoff - Patch 12.03):
- Top Agents: Yoru (44% pick), Viper (43%), Omen (43%), Gekko (buffed), Raze, Fade
- Meta Comps: Yoru-Viper-Omen-Fade-Raze (58% WR in Pacific)
- Economy: Pistol win \u2192 Bonus (2500cr), Force after 2 losses, Eco <900cr

YOUR TASK:
Generate a complete, executable strategy to beat ${opponentTeam}.

OUTPUT REQUIREMENTS:
1. MATCHUP ANALYSIS
   - 3-4 paragraph overview of how this matchup plays out
   - List 3-4 specific advantages your team has
   - List 3-4 specific threats from opponent
   - Define THE win condition (one clear objective)

2. AGENT COMPOSITION
   - 5 agents optimal for this matchup
   - Assign each to a specific player from your team
   - Gun preference per agent (Operator/Vandal/Phantom)
   - 2-3 sentence reasoning WHY this agent for this player
   - 3-4 responsibilities per agent

3. PISTOL ROUNDS
   Attack Pistol:
   - Exact player positions with map callouts
   - Gun buys (Classic/Sheriff/Frenzy) per player
   - Armor decision (yes/no)
   - Utility sequence with timestamps (e.g., "0:15 - Fade eye A Main")
   - Plant location with crossfire setup
   
   Defense Pistol:
   - Setup positions (exact callouts)
   - Rotation triggers
   - Stack decision (3-2 split, 4-1, etc.)
   - Retake plan if site lost

4. ROUND TIMELINE (12-15 events)
   For each 15-second interval (0:00-0:15, 0:15-0:30, etc.) until 1:45:
   - Phase name (e.g., "Setup", "Pressure A", "Execute B", "Post-Plant")
   - Player positions (exact callouts like "A Heaven", "Mid Window")
   - Actions (what each player does)
   - Decision logic (IF-THEN statements)
   - Utility usage (player + ability + timestamp)
   - Gun setup (who has Operator, etc.)

5. COUNTER-STRATEGY
   - 4-6 specific opponent weaknesses to exploit (use player stats)
   - 3-4 ways to neutralize their strengths
   - Player matchups (your player vs their player)
   - Adaptation triggers ("IF they stack A 3 rounds \u2192 switch to B exec")

6. ECONOMY MANAGEMENT
   - Which rounds to force buy (based on opponent tendencies)
   - When to eco (don't force stupid rounds)
   - Gun priority (who gets Operator, who rifles)
   - Ultimate coordination (combine ults for round wins)

CRITICAL REQUIREMENTS:
- Use EXACT player IGNs from team rosters
- Use EXACT map callouts (A Long, B Short, etc.)
- Include specific stats (e.g., "TenZ 67% HS rate \u2192 entry from Long")
- Every decision needs reasoning backed by data
- Timeline must be ACTIONABLE (coaches can copy-paste to players)

Return ONLY valid JSON matching this exact schema:
${JSON.stringify({}, null, 2)}

NO markdown, NO explanations outside JSON, JUST the JSON object.
`;

  const raw = await callGeminiWithRetry(prompt)
  const strategy = parseAndValidateStrategy(raw)
  return strategy
}
