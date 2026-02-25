# Wopseeion - Production Deployment Guide

## 🚀 Deployment Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Gemini API key
- Riot API key (optional)
- Stripe account (optional)
- Docker installed (for containerized deployment)

### Environment Setup

1. **Copy environment template**
```bash
cp .env.local.example .env.local
```

2. **Fill in required variables**
```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=sk-...
DATABASE_URL=postgresql://user:password@localhost:5432/wopseeion
RIOT_API_KEY=RGAPI-...
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your-secret-key
```

### Local Development

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# Open http://localhost:3000
```

### Database Setup

```bash
# Create database
createdb wopseeion

# Run migrations
npx prisma migrate deploy

# Seed initial data (optional)
npx prisma db seed
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f app

# Run migrations in container
docker-compose exec app npx prisma migrate deploy
```

### Vercel Deployment

1. **Connect repository to Vercel**
```bash
npm install -g vercel
vercel link
```

2. **Set environment variables in Vercel dashboard**
```
NEXT_PUBLIC_GEMINI_API_KEY
DATABASE_URL
RIOT_API_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
JWT_SECRET
```

3. **Deploy**
```bash
vercel --prod
```

### Production Checklist

- [ ] Environment variables set correctly
- [ ] Database migrations completed
- [ ] Stripe webhooks configured
- [ ] API rate limits set
- [ ] SSL/HTTPS enabled
- [ ] CORS configured
- [ ] Analytics connected
- [ ] Error tracking (Sentry) enabled
- [ ] Database backups configured
- [ ] CDN enabled for static assets
- [ ] Cache headers configured

### Performance Optimization

```bash
# Build analysis
npm run build -- --analyze

# Generate bundle size report
npm run build

# Test lighthouse
npm run lighthouse
```

### Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking (configure in code)
- **Database Monitoring**: Check PostgreSQL logs
- **API Metrics**: Monitor in Stripe/Gemini dashboards

### Scaling

For high-traffic scenarios:

1. **Database**
   - Enable read replicas
   - Configure connection pooling (PgBouncer)
   - Monitor slow queries

2. **Application**
   - Use Redis for caching
   - Implement rate limiting
   - Use CDN for static assets

3. **API**
   - Implement request queuing
   - Cache Gemini/Riot API responses
   - Use edge functions for optimization

### Rollback

```bash
# Rollback last migration
npx prisma migrate resolve --rolled-back

# Redeploy to previous commit
git revert HEAD
git push
```

### Troubleshooting

**Database Connection Failed**
```bash
# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

**API Key Not Working**
```bash
# Verify keys in .env.local
cat .env.local | grep API_KEY

# Test Gemini API
curl -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"test"}]}]}' \
  -H "x-goog-api-key: $NEXT_PUBLIC_GEMINI_API_KEY"
```

**Build Failures**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for type errors
npm run type-check
```

### Security Best Practices

1. **Secrets Management**
   - Never commit .env.local
   - Rotate API keys regularly
   - Use secret manager (GitHub Secrets, Vercel)

2. **Database Security**
   - Use strong passwords
   - Enable SSL connections
   - Restrict database access by IP

3. **API Security**
   - Implement rate limiting
   - Use API key rotation
   - Enable request signing

4. **Application Security**
   - Enable CORS properly
   - Implement CSRF protection
   - Use secure cookies (httpOnly, secure)
   - Add security headers

### Maintenance

**Weekly Tasks**
- [ ] Monitor error logs
- [ ] Check API usage/quotas
- [ ] Review database performance

**Monthly Tasks**
- [ ] Database backup verification
- [ ] Security audit
- [ ] Dependency updates

**Quarterly Tasks**
- [ ] Load testing
- [ ] Security penetration testing
- [ ] Disaster recovery drills

---

For more information, see [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
