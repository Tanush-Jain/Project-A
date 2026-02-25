import { NextRequest, NextResponse } from 'next/server'
import {
  getPlayerByName,
  getMatchHistory,
  getRankedStats,
} from '@/lib/riot-api'

export async function GET(request: NextRequest) {
  try {
    const gameName = request.nextUrl.searchParams.get('gameName')
    const tagLine = request.nextUrl.searchParams.get('tagLine')

    if (!gameName || !tagLine) {
      return NextResponse.json(
        { error: 'Missing gameName or tagLine' },
        { status: 400 }
      )
    }

    // Get player info
    const player = await getPlayerByName(gameName, tagLine)

    // Get match history
    const matches = await getMatchHistory(player.puuid, 10)

    // Get ranked stats
    const stats = await getRankedStats(player.id)

    return NextResponse.json(
      { player, matches, stats },
      { status: 200 }
    )
  } catch (error) {
    console.error('Riot API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch player stats' },
      { status: 500 }
    )
  }
}
