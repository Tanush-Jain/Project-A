import { NextRequest, NextResponse } from 'next/server'
import { createBillingPortal } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// Mock auth - replace with actual auth
async function getCurrentUser() {
  return { id: 'user_123', stripeCustomerId: 'cus_xxx' }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's Stripe customer ID from database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true }
    })

    if (!dbUser?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 400 }
      )
    }

    // Build return URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173'
    const returnUrl = `${baseUrl}/dashboard/settings`

    // Create billing portal session
    const session = await createBillingPortal(dbUser.stripeCustomerId, returnUrl)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Billing Portal Error:', error)
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    )
  }
}

