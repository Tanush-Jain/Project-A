# Wopseeion - Production Deployment Guide

## 🚀 Quick Deploy

### One-Command Deployment (Railway + Vercel)
```bash
# 1. Fork/clone repo
# 2. Create Railway PostgreSQL
# 3. Import to Vercel
# 4. Add env vars (see below)
# 5. Deploy!
```

## Environment Setup

### Required Environment Variables

1. **Copy the template**
```bash
cp .env.example .env.local
```

2. **Fill in these variables:**

```bash
# Database (Railway, Supabase, or PostgreSQL)
DATABASE_URL="postgresql://..."

# Gemini AI (https://aistudio.google.com/app/apikey)
NEXT_PUBLIC_GEMINI_API_KEY="AIzaSy..."

# Riot Games API (https://developer.riotgames.com/)
RIOT_API_KEY="RGAPI-..."

# Stripe (https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe Price IDs (create in Stripe Dashboard)
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_YEARLY_PRICE_ID="price_..."
STRIPE_TEAM_MONTHLY_PRICE_ID="price_..."
STRIPE_TEAM_YEARLY_PRICE_ID="price_..."

# App URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Auth (generate: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
- Go to https://vercel.com/new
- Import your repository
- Add environment variables in Vercel dashboard

3. **Deploy**
- Vercel will automatically deploy on push to main

### Option 2: Docker Compose (Local/Server)

```bash
# 1. Configure environment
cp .env.example .env
# Edit .env with your values

# 2. Start services
docker-compose up -d

# 3. Run migrations
docker-compose exec app npx prisma migrate deploy

# 4. Seed data (optional)
docker-compose exec app npx prisma db seed
```

### Option 3: Railway + Vercel

1. **Create Railway Database**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and create project
railway login
railway init
railway add postgresql
railway variables
```

2. **Get DATABASE_URL** from Railway dashboard

3. **Deploy to Vercel** (see Option 1)

## Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Seed data
npx prisma db seed
```

## Stripe Webhook Setup

1. **Create webhook endpoint**
```
https://your-domain.com/api/stripe/webhook
```

2. **Add webhook secret** to environment
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

3. **Select events:**
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

## Post-Deployment Checklist

- [ ] Database migrations run successfully
- [ ] All environment variables set
- [ ] Stripe webhooks configured and working
- [ ] Custom domain connected (optional)
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Analytics tracking (Vercel Analytics)
- [ ] Error tracking (Sentry - optional)
- [ ] API rate limits configured

## Monitoring

### Vercel Analytics
- Built-in at: https://vercel.com/dashboard

### Sentry (Optional)
```bash
npm install @sentry/nextjs
```
Add to `next.config.js`:
```javascript
const withSentry = require("@sentry/nextjs")({
  sentry: {
    org: "your-org",
    project: "your-project"
  }
})
module.exports = withSentry({})
```

## Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf .next node_modules/.cache
npm install
npm run build
```

### Database Connection
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check Prisma
npx prisma studio
```

### API Errors
- Check Vercel function logs
- Verify environment variables
- Check Stripe/Gemini API quotas
