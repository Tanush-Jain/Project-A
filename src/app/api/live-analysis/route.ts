import { NextRequest, NextResponse } from 'next/server'
import { analyzeValorantMatch, extractYouTubeId, fetchVideoMetadata, checkRateLimit } from '@/lib/valorant-analyzer'

// Rate limiting: 10 analyses per hour per user
const MAX_REQUESTS = 10
const WINDOW_MS = 3600000 // 1 hour

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoUrl, yourTeamId } = body

    // Validate input
    if (!videoUrl || !yourTeamId) {
      return NextResponse.json(
        { error: 'Missing required fields: videoUrl and yourTeamId' },
        { status: 400 }
      )
    }

    // Get user identifier (use IP or user ID if available)
    const userId = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'anonymous'

    // Check rate limit
    if (!checkRateLimit(userId, MAX_REQUESTS, WINDOW_MS)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Maximum 10 analyses per hour.' },
        { status: 429 }
      )
    }

    // Extract video ID from URL
    const videoId = extractYouTubeId(videoUrl)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }

    // Get video metadata
    const metadata = await fetchVideoMetadata(videoId)

    // Generate analysis with Gemini
    const analysis = await analyzeValorantMatch(metadata, yourTeamId)

    return NextResponse.json({ 
      success: true, 
      data: analysis 
    }, { status: 200 })

  } catch (error) {
    console.error('Live Analysis Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze match' },
      { status: 500 }
    )
  }
}

// Optional: Add GET method for rate limit status
export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'anonymous'
  
  // Could return remaining requests from Redis or similar
  return NextResponse.json({
    message: 'Valorant Live Analysis API',
    methods: ['POST'],
    rateLimit: {
      maxRequests: MAX_REQUESTS,
      windowMs: WINDOW_MS
    }
  })
}

