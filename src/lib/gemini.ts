import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  (process.env.NEXT_PUBLIC_GEMINI_API_KEY as string) || ''
)

export async function generateValorantStrategy(input: {
  map: string
  yourTeam: string
  opponentTeam: string
  gameMode?: string
}) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an elite VALORANT coach. Generate a comprehensive strategy for the following matchup:

Map: ${input.map}
Our Team: ${input.yourTeam}
Opponent: ${input.opponentTeam}
Mode: ${input.gameMode || '5v5 Competitive'}

Provide a detailed strategy including:
1. Matchup Analysis
2. Recommended Agent Composition with roles and explanations
3. Attack Strategy (default setup, utility usage, plant locations)
4. Defense Strategy (setup, rotations, anchor positions)
5. Pistol Round Plan (attack and defense)
6. Anti-Strats for opponent weaknesses
7. Economy Plan (force buy, eco rounds)
8. Key Callouts and Positions on ${input.map}

Format response as JSON with clear sections.
`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch {
      return { strategy: text, raw: true }
    }
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('Failed to generate strategy')
  }
}

export async function generateLeagueAnalysis(input: {
  teams: string[]
  patchVersion: string
  role?: string
}) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are a professional League of Legends analyst. Analyze the following matchup:

Teams: ${input.teams.join(' vs ')}
Patch: ${input.patchVersion}
Role Focus: ${input.role || 'All roles'}

Provide analysis including:
1. Team Composition Analysis
2. Win Conditions
3. Draft Strategy
4. Early Game Plan
5. Mid/Late Game Win Conditions
6. Key Champion Matchups
7. Wave Management Tips
8. Vision Control Strategy

Format as JSON with detailed strategies.
`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch {
      return { analysis: text, raw: true }
    }
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('Failed to generate analysis')
  }
}

export async function generateLiveCommentary(input: {
  game: string
  currentState: string
  eventLog: string[]
}) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an expert esports commentator providing live analysis.

Game: ${input.game}
Current State: ${input.currentState}
Recent Events: ${input.eventLog.join(', ')}

Provide brief, exciting commentary (2-3 sentences) analyzing the current situation, predicting next moves, and highlighting key plays.
Format as JSON with fields: commentary, prediction, keyPlays.
`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch {
      return { commentary: text, raw: true }
    }
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('Failed to generate commentary')
  }
}
