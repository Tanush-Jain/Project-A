import { NextRequest, NextResponse } from 'next/server'
import { generateLiveCommentary } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { game, currentState, eventLog } = body

    if (!game || !currentState) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const analysis = await generateLiveCommentary({
      game,
      currentState,
      eventLog: eventLog || [],
    })

    return NextResponse.json(analysis, { status: 200 })
  } catch (error) {
    console.error('Live Analysis Error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze match' },
      { status: 500 }
    )
  }
}
