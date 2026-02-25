import { NextRequest, NextResponse } from 'next/server'
import { generateValorantStrategy } from '@/lib/gemini'
import { prisma as _prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { map, yourTeam, opponentTeam, game } = body

    // Validate input
    if (!map || !yourTeam || !opponentTeam) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Call Gemini API
    const strategy = await generateValorantStrategy({
      map,
      yourTeam,
      opponentTeam,
      gameMode: game,
    })

    // Save to database (optional)
    // const savedStrategy = await prisma.strategy.create({
    //   data: {
    //     userId: session.user.id,
    //     title: `${yourTeam} vs ${opponentTeam} - ${map}`,
    //     game: game || 'valorant',
    //     map,
    //     yourTeam,
    //     opponentTeam,
    //     data: strategy,
    //   },
    // })

    return NextResponse.json(strategy, { status: 200 })
  } catch (error) {
    console.error('Strategy API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate strategy' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const _game = request.nextUrl.searchParams.get('game') || 'valorant'
    // const userId = session.user.id

    // Fetch recent strategies
    // const strategies = await prisma.strategy.findMany({
    //   where: { userId, game },
    //   orderBy: { createdAt: 'desc' },
    //   take: 20,
    // })

    return NextResponse.json([
      { status: 200 }
    ])
  } catch (error) {
    console.error('Strategy GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch strategies' },
      { status: 500 }
    )
  }
}
