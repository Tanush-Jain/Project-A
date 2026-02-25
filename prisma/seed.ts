import { PrismaClient, Plan, Game, SubscriptionStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // ===== CREATE USERS =====
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'coach@fnatic.com',
        name: 'Fnatic Coach',
        avatar: 'https://example.com/avatars/coach1.jpg',
        plan: Plan.TEAM,
        rank: 'Radiant',
        game: Game.VALORANT,
        stripeCustomerId: 'cus_test_coach1',
      },
    }),
    prisma.user.create({
      data: {
        email: 'pro@valorant.com',
        name: 'Pro Player',
        avatar: 'https://example.com/avatars/pro1.jpg',
        plan: Plan.PRO,
        rank: 'Ascendant 2',
        game: Game.VALORANT,
        stripeCustomerId: 'cus_test_pro1',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user@lol.com',
        name: 'LoL Player',
        avatar: 'https://example.com/avatars/lol1.jpg',
        plan: Plan.PRO,
        rank: 'Diamond 2',
        game: Game.LOL,
        stripeCustomerId: 'cus_test_lol1',
      },
    }),
    prisma.user.create({
      data: {
        email: 'free@user.com',
        name: 'Free User',
        avatar: null,
        plan: Plan.FREE,
        rank: 'Gold 3',
        game: Game.VALORANT,
        stripeCustomerId: null,
      },
    }),
    prisma.user.create({
      data: {
        email: 'cs2@player.com',
        name: 'CS2 Player',
        avatar: 'https://example.com/avatars/cs2.jpg',
        plan: Plan.FREE,
        rank: 'Global Elite',
        game: Game.CS2,
        stripeCustomerId: null,
      },
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // ===== CREATE TEAMS =====
  const fnatic = await prisma.team.create({
    data: {
      name: 'Fnatic',
      logo: 'https://example.com/logos/fnatic.png',
      region: 'EMEA',
      game: Game.VALORANT,
      ownerId: users[0].id,
      members: {
        create: [
          { userId: users[0].id, role: 'owner' },
          { userId: users[1].id, role: 'captain' },
        ],
      },
    },
  })

  const loud = await prisma.team.create({
    data: {
      name: 'LOUD',
      logo: 'https://example.com/logos/loud.png',
      region: 'Americas',
      game: Game.VALORANT,
      ownerId: users[1].id,
      members: {
        create: [
          { userId: users[1].id, role: 'owner' },
        ],
      },
    },
  })

  const sentinels = await prisma.team.create({
    data: {
      name: 'Sentinels',
      logo: 'https://example.com/logos/sentinels.png',
      region: 'Americas',
      game: Game.VALORANT,
      ownerId: users[1].id,
    },
  })

  console.log('✅ Created teams: Fnatic, LOUD, Sentinels')

  // ===== CREATE SUBSCRIPTIONS =====
  await Promise.all([
    prisma.subscription.create({
      data: {
        userId: users[0].id,
        teamId: fnatic.id,
        plan: Plan.TEAM,
        stripeSubscriptionId: 'sub_test_team1',
        currentPeriodEnd: new Date('2025-12-31'),
        status: SubscriptionStatus.ACTIVE,
      },
    }),
    prisma.subscription.create({
      data: {
        userId: users[1].id,
        teamId: loud.id,
        plan: Plan.TEAM,
        stripeSubscriptionId: 'sub_test_team2',
        currentPeriodEnd: new Date('2025-11-30'),
        status: SubscriptionStatus.ACTIVE,
      },
    }),
    prisma.subscription.create({
      data: {
        userId: users[2].id,
        plan: Plan.PRO,
        stripeSubscriptionId: 'sub_test_pro1',
        currentPeriodEnd: new Date('2025-10-15'),
        status: SubscriptionStatus.ACTIVE,
      },
    }),
    prisma.subscription.create({
      data: {
        userId: users[3].id,
        plan: Plan.FREE,
        status: SubscriptionStatus.CANCELLED,
      },
    }),
  ])

  console.log('✅ Created subscriptions')

  // ===== CREATE STRATEGIES =====
  const strategies = await Promise.all([
    prisma.strategy.create({
      data: {
        userId: users[0].id,
        mapName: 'Ascent',
        yourTeam: 'Fnatic',
        opponentTeam: 'LOUD',
        game: Game.VALORANT,
        strategyData: {
          name: 'A Site Rush - Split Push',
          rounds: [
            { round: 1, type: 'attack', steps: ['Smoke mid', 'Flash A short', 'Rush A'] },
            { round: 2, type: 'defense', steps: ['Stack A', 'Default setup', 'Hold angles'] },
          ],
          agents: ['Jett', 'Omen', 'Sova', 'Killjoy', 'Fade'],
        },
        isSaved: true,
        isPublic: true,
      },
    }),
    prisma.strategy.create({
      data: {
        userId: users[1].id,
        mapName: 'Bind',
        yourTeam: 'LOUD',
        opponentTeam: 'Sentinels',
        game: Game.VALORANT,
        strategyData: {
          name: 'B Site Execute',
          rounds: [
            { round: 1, type: 'attack', steps: ['Smoke B long', 'Smoke hookah', 'Plant B'] },
          ],
          agents: ['Raze', 'Breach', 'Sova', 'Cypher', 'Omen'],
        },
        isSaved: true,
        isPublic: true,
      },
    }),
    prisma.strategy.create({
      data: {
        userId: users[2].id,
        mapName: 'Summoners Rift',
        yourTeam: 'T1',
        opponentTeam: 'Gen.G',
        game: Game.LOL,
        strategyData: {
          name: 'Early Game Aggro',
          lanes: {
            top: 'Pick teamfight',
            jungle: 'Invade enemy buff',
            mid: 'Push and roam',
            bot: 'Play safe',
            support: 'Ward river',
          },
        },
        isSaved: true,
        isPublic: false,
      },
    }),
    prisma.strategy.create({
      data: {
        userId: users[3].id,
        mapName: 'Haven',
        yourTeam: 'My Team',
        opponentTeam: 'Enemy',
        game: Game.VALORANT,
        strategyData: {
          name: 'Default Attack',
          rounds: [{ round: 1, type: 'attack', steps: ['Default mid', 'Check corners'] }],
        },
        isSaved: false,
        isPublic: false,
      },
    }),
  ])

  console.log(`✅ Created ${strategies.length} strategies`)

  // ===== CREATE ANALYSES =====
  const analyses = await Promise.all([
    prisma.analysis.create({
      data: {
        userId: users[0].id,
        teamId: fnatic.id,
        game: Game.VALORANT,
        youtubeUrl: 'https://youtube.com/watch?v=abc123',
        videoId: 'abc123',
        yourTeam: 'Fnatic',
        opponentTeam: 'LOUD',
        analysisData: {
          summary: 'Great team coordination',
          keyMoments: [
            { timestamp: 120, description: 'Good execute' },
            { timestamp: 300, description: 'Nice retake' },
          ],
          recommendations: ['Improve mid control', 'Better utility usage'],
        },
      },
    }),
    prisma.analysis.create({
      data: {
        userId: users[1].id,
        teamId: loud.id,
        game: Game.VALORANT,
        youtubeUrl: 'https://youtube.com/watch?v=xyz789',
        videoId: 'xyz789',
        yourTeam: 'LOUD',
        opponentTeam: 'Sentinels',
        analysisData: {
          summary: 'Strong defensive play',
          keyMoments: [
            { timestamp: 60, description: 'Great hold' },
            { timestamp: 180, description: 'Excellent trade' },
          ],
          recommendations: ['Work on post-plant', 'Improve rotations'],
        },
      },
    }),
    prisma.analysis.create({
      data: {
        userId: users[2].id,
        game: Game.LOL,
        youtubeUrl: 'https://youtube.com/watch?v=lol123',
        videoId: 'lol123',
        yourTeam: 'T1',
        opponentTeam: 'Gen.G',
        analysisData: {
          summary: 'Solid early game',
          keyMoments: [
            { timestamp: 240, description: 'Dragon take' },
            { timestamp: 480, description: 'Good gank' },
          ],
          recommendations: ['Better objective setup', 'Improve vision control'],
        },
      },
    }),
  ])

  console.log(`✅ Created ${analyses.length} analyses`)

  // ===== CREATE PLAYER STATS =====
  const playerStats = await Promise.all([
    prisma.playerStats.create({
      data: {
        userId: users[1].id,
        game: Game.VALORANT,
        agentName: 'Jett',
        mapName: 'Ascent',
        winRate: 68.5,
        kda: 1.45,
        avgScore: 285.3,
        riotPuuid: 'puuid_jett_001',
        lastUpdated: new Date(),
      },
    }),
    prisma.playerStats.create({
      data: {
        userId: users[1].id,
        game: Game.VALORANT,
        agentName: 'Omen',
        mapName: 'Haven',
        winRate: 62.0,
        kda: 1.28,
        avgScore: 265.8,
        riotPuuid: 'puuid_omen_001',
        lastUpdated: new Date(),
      },
    }),
    prisma.playerStats.create({
      data: {
        userId: users[1].id,
        game: Game.VALORANT,
        agentName: 'Sova',
        mapName: 'Bind',
        winRate: 55.0,
        kda: 1.05,
        avgScore: 220.1,
        riotPuuid: 'puuid_sova_001',
        lastUpdated: new Date(),
      },
    }),
    prisma.playerStats.create({
      data: {
        userId: users[2].id,
        game: Game.LOL,
        agentName: 'Zed',
        mapName: 'Summoners Rift',
        winRate: 58.2,
        kda: 2.85,
        avgScore: 420.5,
        riotPuuid: 'puuid_zed_lol',
        lastUpdated: new Date(),
      },
    }),
    prisma.playerStats.create({
      data: {
        userId: users[2].id,
        game: Game.LOL,
        agentName: 'Yasuo',
        mapName: 'Summoners Rift',
        winRate: 52.0,
        kda: 2.15,
        avgScore: 380.2,
        riotPuuid: 'puuid_yasuo_lol',
        lastUpdated: new Date(),
      },
    }),
    prisma.playerStats.create({
      data: {
        userId: users[3].id,
        game: Game.VALORANT,
        agentName: 'Phoenix',
        mapName: 'Split',
        winRate: 45.0,
        kda: 0.95,
        avgScore: 195.5,
        riotPuuid: 'puuid_phoenix_001',
        lastUpdated: new Date(),
      },
    }),
    prisma.playerStats.create({
      data: {
        userId: users[4].id,
        game: Game.CS2,
        agentName: 'AWPer',
        mapName: 'Mirage',
        winRate: 60.0,
        kda: 1.32,
        avgScore: 110.8,
        riotPuuid: null, // CS2 doesn't use Riot PUUID
        lastUpdated: new Date(),
      },
    }),
  ])

  console.log(`✅ Created ${playerStats.length} player stats records`)

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - Users: ${users.length}`)
  console.log(`   - Teams: 3 (Fnatic, LOUD, Sentinels)`)
  console.log(`   - Subscriptions: 4`)
  console.log(`   - Strategies: ${strategies.length}`)
  console.log(`   - Analyses: ${analyses.length}`)
  console.log(`   - Player Stats: ${playerStats.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

