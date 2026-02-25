# Wopseeion Backend Setup Guide

## 📚 Backend Infrastructure Overview

This guide covers setting up the complete backend for Wopseeion, including database, APIs, and services.

---

## 🗄️ Database Setup

### Prisma Configuration

**File: `prisma/schema.prisma`**

The schema includes:
- **Users**: Authentication and profile management
- **Strategies**: Saved strategies (Valorant & LOL)
- **Live Analysis**: Match analysis data
- **Social Features**: Comments, likes, sharing
- **Team Data**: Professional team profiles
- **Maps**: Game maps and callouts
- **Analytics**: API usage and audit logs

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy

# Create migration from schema changes
npx prisma migrate dev --name add_new_field

# View migration status
npx prisma migrate status
```

### Database Seeding

**File: `prisma/seed.ts`**

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create initial teams, maps, etc.
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Run with:
```bash
npx prisma db seed
```

---

## 🔌 API Endpoints

### Strategy Generation

**Endpoint**: `POST /api/strategy`

**Request Body**:
```json
{
  "map": "Split",
  "yourTeam": "Sentinels",
  "opponentTeam": "LOUD",
  "game": "valorant"
}
```

**Response**:
```json
{
  "id": "strategy_123",
  "strategy": {
    "matchupAnalysis": "...",
    "agentComposition": {...},
    "pistolRounds": {...},
    "roundTimeline": {...},
    "counterStrategy": {...},
    "economyPlan": {...}
  }
}
```

---

### Live Analysis

**Endpoint**: `POST /api/live-analysis`

**Request Body**:
```json
{
  "game": "valorant",
  "currentState": "Round 5, 10-2 lead",
  "eventLog": ["spike planted", "player killed", "rotation called"]
}
```

**Response**:
```json
{
  "commentary": "Excellent defense rotation!",
  "prediction": "Next attack will be on A site",
  "keyPlays": ["Camera control", "Utility usage"]
}
```

---

### Riot Stats API

**Endpoint**: `GET /api/riot?gameName=TenZ&tagLine=5154`

**Response**:
```json
{
  "player": {
    "id": "...",
    "name": "TenZ",
    "level": 500
  },
  "stats": {
    "rank": "DIAMOND",
    "tier": "1",
    "leaguePoints": 75
  },
  "matches": [...]
}
```

---

### Stripe Webhook

**Endpoint**: `POST /api/stripe/webhook`

**Handles**:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `payment_intent.succeeded`

---

## 🔑 Authentication Setup

### JWT Configuration

**File: `src/lib/auth.ts`** (create this file)

```typescript
import jwt from 'jsonwebtoken'

export function generateToken(userId: string) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRY || '7d' }
  )
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!)
}
```

### Protected API Routes

```typescript
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const payload = verifyToken(token)
    // Use payload.userId for database queries
  } catch {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}
```

---

## 🤖 AI Integration

### Gemini API

**Setup**:
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set `NEXT_PUBLIC_GEMINI_API_KEY` in .env.local
3. Use `src/lib/gemini.ts` for API calls

**Features**:
- Strategy generation (Valorant & LOL)
- Live match analysis
- Commentary generation

---

### Riot API

**Setup**:
1. Register at [Riot Developer Portal](https://developer.riotgames.com)
2. Get development API key
3. Set `RIOT_API_KEY` in .env.local
4. Use `src/lib/riot-api.ts` for calls

**Available Endpoints**:
- Player lookup by name
- Match history
- Ranked statistics
- Champion mastery

---

## 💳 Stripe Integration

### Payment Setup

1. **Create Stripe account** at [stripe.com](https://stripe.com)
2. **Get keys** from dashboard
3. **Set environment variables**:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_test_...
   ```

### Pricing Plans

**In `src/lib/stripe.ts`**:
- **FREE**: 10 strategies/month, 5 live analyses/month
- **PRO**: Unlimited strategies, unlimited analyses
- **ENTERPRISE**: Custom limits

### Webhook Configuration

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yoursite.com/api/stripe/webhook`
3. Select events: `customer.subscription.*`, `payment_intent.*`
4. Copy signing secret to `.env.local`

---

## 📊 State Management (Zustand)

**File: `src/store/useAppStore.ts`**

Global state includes:
- User authentication
- Current game selection
- UI state (sidebar, theme)
- Notifications
- Loading states

Usage:
```typescript
import { useAppStore } from '@/store/useAppStore'

export function MyComponent() {
  const { user, setUser } = useAppStore()
  
  return <div>{user?.name}</div>
}
```

---

## 🎯 Custom Hooks

### `useStrategy()`
Generate and manage strategies
```typescript
const { generateStrategy, currentStrategy } = useStrategy()
```

### `useLiveAnalysis()`
Analyze live matches
```typescript
const { analyze, data, isLoading } = useLiveAnalysis()
```

### `useRiotStats()`
Fetch player statistics
```typescript
const { data, isLoading, error } = useRiotStats('TenZ', '5154')
```

### `useStrategies()`
Fetch saved strategies
```typescript
const { strategies, refetch } = useStrategies('valorant')
```

---

## 📝 Prisma ORM Usage

### Creating Records

```typescript
const strategy = await prisma.strategy.create({
  data: {
    userId: 'user_123',
    title: 'Split Strategy',
    game: 'valorant',
    map: 'Split',
    yourTeam: 'Sentinels',
    opponentTeam: 'LOUD',
    data: { /* strategy JSON */ },
  },
})
```

### Querying Records

```typescript
// Find by ID
const strategy = await prisma.strategy.findUnique({
  where: { id: 'strategy_123' },
})

// Find many with filters
const strategies = await prisma.strategy.findMany({
  where: {
    userId: 'user_123',
    game: 'valorant',
  },
  orderBy: { createdAt: 'desc' },
  take: 20,
})
```

### Updating Records

```typescript
const updated = await prisma.strategy.update({
  where: { id: 'strategy_123' },
  data: {
    rating: 5,
    views: { increment: 1 },
  },
})
```

### Deleting Records

```typescript
await prisma.strategy.delete({
  where: { id: 'strategy_123' },
})
```

---

## 🔒 Security

### Environment Variables
- Never commit `.env.local`
- Use `.env.local.example` as template
- Rotate API keys regularly
- Use strong database passwords

### Rate Limiting

```typescript
// In API routes
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
})

const { success } = await ratelimit.limit(userId)
```

### CORS Configuration

```typescript
// In middleware or API routes
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL,
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
```

---

## 📈 Performance Optimization

### Caching

**React Query** (in hooks):
```typescript
useQuery({
  queryKey: ['strategies', gameId],
  queryFn: fetchStrategies,
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

**Redis** (for backend):
```typescript
// Use for API response caching
const cached = await redis.get(`strategy:${id}`)
```

### Database Indexing

Already configured in `prisma/schema.prisma`:
```prisma
@@index([userId, game])
@@unique([email])
```

---

## 🧪 Testing

### API Testing

```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/react

# Run tests
npm run test
```

Example test:
```typescript
import { describe, it, expect } from 'vitest'
import { generateValorantStrategy } from '@/lib/gemini'

describe('Strategy Generation', () => {
  it('generates strategy for valid input', async () => {
    const result = await generateValorantStrategy({
      map: 'Split',
      yourTeam: 'Sentinels',
      opponentTeam: 'LOUD',
    })
    expect(result).toHaveProperty('strategy')
  })
})
```

---

## 📚 Additional Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/latest)
- [Stripe Docs](https://stripe.com/docs)
- [Gemini API](https://ai.google.dev/)

---

**Need help?** Check specific library docs or open an issue on GitHub.
