import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma

// ============================================================================
// Helper Functions for Common Queries
// ============================================================================

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      teams: {
        include: {
          team: true
        }
      },
      subscriptions: true,
      playerStats: true
    }
  })
}

/**
 * Get user by Riot PUUID
 */
export async function getUserByRiotPuuid(puuid: string) {
  return prisma.user.findFirst({
    where: { 
      playerStats: {
        some: { riotPuuid: puuid }
      }
    }
  })
}

/**
 * Get user's active subscription
 */
export async function getUserActiveSubscription(userId: string) {
  return prisma.subscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE'
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

/**
 * Get team's analyses
 */
export function getTeamAnalyses(teamId: string, limit = 20) {
  return prisma.analysis.findMany({
    where: { teamId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: {
        select: { name: true, avatar: true }
      }
    }
  })
}

/**
 * Get user's strategies
 */
export function getUserStrategies(userId: string, game?: string) {
  return prisma.strategy.findMany({
    where: {
      userId,
      ...(game ? { game: game as any } : {})
    },
    orderBy: { createdAt: 'desc' }
  })
}

/**
 * Get public strategies
 */
export function getPublicStrategies(game?: string, limit = 50) {
  return prisma.strategy.findMany({
    where: {
      isPublic: true,
      ...(game ? { game: game as any } : {})
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: {
        select: { name: true, avatar: true }
      }
    }
  })
}

/**
 * Update or create player stats
 */
export async function upsertPlayerStats(
  userId: string,
  game: string,
  agentName: string | null,
  mapName: string | null,
  stats: {
    winRate?: number
    kda?: number
    avgScore?: number
    riotPuuid?: string
  }
) {
  return prisma.playerStats.upsert({
    where: {
      userId_game_agentName_mapName: {
        userId,
        game: game as any,
        agentName: agentName || '',
        mapName: mapName || ''
      }
    },
    update: {
      ...stats,
      lastUpdated: new Date()
    },
    create: {
      userId,
      game: game as any,
      agentName,
      mapName,
      ...stats
    }
  })
}

