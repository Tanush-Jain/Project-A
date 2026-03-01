/**
 * Valorant Live Match Analyzer
 * Analyzes YouTube VCT matches and generates winning strategies
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import type { 
  VideoMetadata, 
  ValorantMatchAnalysis, 
  ValorantTeam,
  AgentPick,
  RoundTimelineEvent,
  CoachingPoint
} from '@/types/lol'
import { getValorantTeam, valorantProTeams } from '@/data/lol-teams'

const genAI = new GoogleGenerativeAI(
  (process.env.NEXT_PUBLIC_GEMINI_API_KEY as string) || ''
)

// Schema for JSON output validation
const ValorantAnalysisSchema = {
  matchOverview: {
    yourTeam: 'string',
    opponentTeam: 'string',
    map: 'string',
    result: 'string',
    finalScore: 'string',
    tournament: 'string',
    yourAgents: [{ agent: 'string', role: 'string', player: 'string?' }],
    opponentAgents: [{ agent: 'string', role: 'string', player: 'string?' }],
    yourSide: 'string',
    opponentSide: 'string',
    summary: 'string'
  },
  opponentAnalysis: {
    playstyle: 'string',
    strengths: ['string'],
    weaknesses: ['string'],
    dangerousPlayers: ['string'],
    mapControlStyle: 'string',
    economyTendencies: 'string'
  },
  winningStrategy: {
    keyPoints: ['string'],
    agentsToCounter: ['string'],
    mapsToTarget: ['string'],
    economyPlan: ['string']
  },
  timeline: [{
    round: 'number',
    timeRange: 'string',
    phase: 'string',
    actions: ['string'],
    keyDecision: 'string',
    scoreAfter: 'string',
    economy: { yourTeam: 'number', opponentTeam: 'number' },
    plantSite: 'string?',
    result: 'string?'
  }],
  coachingPoints: [{
    round: 'number?',
    player: 'string?',
    agent: 'string?',
    advice: 'string'
  }]
}

export async function analyzeValorantMatch(
  videoMetadata: VideoMetadata,
  yourTeamId: string
): Promise<ValorantMatchAnalysis> {
  
  const yourTeam = getValorantTeam(yourTeamId)
  
  if (!yourTeam) {
    throw new Error(`Team not found: ${yourTeamId}`)
  }

  const prompt = `
You are an elite VALORANT esports analyst (ex-VCT coach).

VIDEO CONTEXT:
Title: "${videoMetadata.title}"
Description: "${videoMetadata.description}"

Your Team: ${yourTeam.name} (${yourTeam.region})

TASK: Analyze this VCT match and create a winning strategy for the rematch.

Extract from video metadata:
- Both team names
- Agent picks (5 per team with roles)
- Player names (if mentioned: TenZ, Derke,Aspas,Boaster,Faker etc.)
- Who won and final score
- Tournament/context (VCT Masters, VCT Champions, etc.)
- Map played

Then generate:

1. MATCH OVERVIEW (comprehensive)
   - Identify which side your team played (Attack/Defense)
   - List all 10 agents with roles (Duelist, Initiator, Controller, Sentinel)
   - 2-3 paragraph summary of what happened
   - Why your team won/lost
   - Key turning points (economy swings, clutches, utility combos)

2. OPPONENT ANALYSIS
   - Their playstyle (aggressive entry, defensive setups, mid-round calling)
   - 3-4 strengths they demonstrated
   - 4-5 exploitable weaknesses (be specific!)
   - Dangerous players to watch (why they're threats)
   - Map control tendencies
   - Economy management patterns

3. WINNING STRATEGY
   - 5-6 key strategic points (specific tactics)
   - Which enemy agents to target/deny (priority list)
   - Maps to target if they play again
   - Economy plan (when to force, when to save)

4. GAME TIMELINE (13-25 rounds for regulation)
   Create realistic timeline:
   Each round needs:
   - Round number (1, 2, 3...)
   - Time range (e.g., "0:00-0:40")
   - Phase (e.g., "Pistol Round", "Buy Round", "Force Buy", "Eco Round")
   - Actions: 3-5 specific things happening
   - Key Decision: 100-150 word strategic breakdown
     Format: "IF [situation] THEN [action] BECAUSE [reason]"
   - Score after round
   - Economy estimate for both teams
   - Plant site (if applicable): A, B, C
   - Result: win/loss/draw

5. COACHING POINTS (5 critical reminders)
   Each point: 1-2 sentences of actionable advice
   Reference specific agents, players, timings, economy situations

CRITICAL REQUIREMENTS:
- Use agent names from video description (Jett, Raze, Sova, Omen, Cypher, etc.)
- Use player names if mentioned
- Be hyper-specific (not "play safe" but "Force buy round 8 if opponent saves")
- Timeline must be realistic game flow
- Key decisions include backup plans
- Include spike plant locations (A Site, B Site, etc.)

Output ONLY valid JSON matching this schema:
${JSON.stringify(ValorantAnalysisSchema, null, 2)}
`

  const result = await callGeminiWithRetry(prompt)
  return parseValorantAnalysis(result)
}

async function callGeminiWithRetry(prompt: string, maxRetries = 3): Promise<string> {
  let lastError: Error | null = null
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      const result = await model.generateContent(prompt)
      const response = result.response
      const text = response.text()
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return jsonMatch[0]
      }
      
      return text
    } catch (error) {
      lastError = error as Error
      console.error(`Gemini API attempt ${attempt} failed:`, error)
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
      }
    }
  }
  
  throw new Error(`Failed to generate analysis after ${maxRetries} attempts: ${lastError?.message}`)
}

function parseValorantAnalysis(rawResponse: string): ValorantMatchAnalysis {
  try {
    const parsed = JSON.parse(rawResponse)
    
    // Validate and transform the response
    return {
      matchOverview: {
        yourTeam: parsed.matchOverview?.yourTeam || 'Unknown',
        opponentTeam: parsed.matchOverview?.opponentTeam || 'Unknown',
        map: parsed.matchOverview?.map || 'Unknown',
        result: parsed.matchOverview?.result || 'Unknown',
        finalScore: parsed.matchOverview?.finalScore || '0-0',
        tournament: parsed.matchOverview?.tournament || 'VCT',
        yourAgents: parsed.matchOverview?.yourAgents || [],
        opponentAgents: parsed.matchOverview?.opponentAgents || [],
        yourSide: parsed.matchOverview?.yourSide || 'Attack',
        opponentSide: parsed.matchOverview?.opponentSide || 'Defense',
        summary: parsed.matchOverview?.summary || ''
      },
      opponentAnalysis: {
        playstyle: parsed.opponentAnalysis?.playstyle || 'Unknown',
        strengths: parsed.opponentAnalysis?.strengths || [],
        weaknesses: parsed.opponentAnalysis?.weaknesses || [],
        dangerousPlayers: parsed.opponentAnalysis?.dangerousPlayers || [],
        mapControlStyle: parsed.opponentAnalysis?.mapControlStyle || 'Unknown',
        economyTendencies: parsed.opponentAnalysis?.economyTendencies || 'Unknown'
      },
      winningStrategy: {
        keyPoints: parsed.winningStrategy?.keyPoints || [],
        agentsToCounter: parsed.winningStrategy?.agentsToCounter || [],
        mapsToTarget: parsed.winningStrategy?.mapsToTarget || [],
        economyPlan: parsed.winningStrategy?.economyPlan || []
      },
      timeline: (parsed.timeline || []).map((event: any): RoundTimelineEvent => ({
        round: event.round || 1,
        timeRange: event.timeRange || '0:00-0:40',
        phase: event.phase || 'Unknown',
        actions: event.actions || [],
        keyDecision: event.keyDecision || '',
        scoreAfter: event.scoreAfter || '0-0',
        economy: event.economy || { yourTeam: 0, opponentTeam: 0 },
        plantSite: event.plantSite || null,
        result: event.result || 'loss'
      })),
      coachingPoints: (parsed.coachingPoints || []).map((point: any): CoachingPoint => ({
        round: point.round,
        player: point.player,
        agent: point.agent,
        advice: point.advice || ''
      }))
    }
  } catch (error) {
    console.error('Failed to parse Valorant analysis:', error)
    throw new Error('Failed to parse analysis response')
  }
}

// Helper function to extract video ID from YouTube URL
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}

// Mock function to fetch video metadata (would use YouTube API in production)
export async function fetchVideoMetadata(videoId: string): Promise<VideoMetadata> {
  // In production, this would call YouTube Data API
  // For now, return mock data based on video ID
  return {
    videoId,
    title: 'VCT Match Analysis',
    description: 'Professional Valorant match from VCT tournament',
    duration: 3600, // 1 hour
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
}

// Rate limiting helper (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(userId: string, maxRequests = 10, windowMs = 3600000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(userId)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

export function getRateLimitRemaining(userId: string): number {
  const record = rateLimitMap.get(userId)
  if (!record) return 10
  return Math.max(0, 10 - record.count)
}

