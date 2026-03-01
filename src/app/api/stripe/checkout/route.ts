import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, PRICE_IDS } from '@/lib/stripe'

// Mock auth - replace with actual auth (Clerk, NextAuth, etc.)
async function getCurrentUser() {
  // In production, get user from session
  // For now, return a mock user ID
  return { id: 'user_123', email: 'user@example.com' }
}

export async function POST(request: NextRequest) {
  try {
    const { priceId, billingCycle } = await request.json()
    
    // Get current user (mock for now)
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Determine which price ID to use
    let selectedPriceId: string
    switch (priceId) {
      case 'pro':
        selectedPriceId = billingCycle === 'yearly' ? PRICE_IDS.PRO_YEARLY : PRICE_IDS.PRO_MONTHLY
        break
      case 'team':
        selectedPriceId = billingCycle === 'yearly' ? PRICE_IDS.TEAM_YEARLY : PRICE_IDS.TEAM_MONTHLY
        break
      default:
        return NextResponse.json(
          { error: 'Invalid plan' },
          { status: 400 }
        )
    }

    // Build URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173'
    const successUrl = `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/pricing`

    // Create checkout session
    const session = await createCheckoutSession(
      user.id,
      selectedPriceId,
      successUrl,
      cancelUrl
    )

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout Error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

