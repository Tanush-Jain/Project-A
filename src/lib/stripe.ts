import Stripe from 'stripe'

export const stripe = new Stripe(
  (process.env.STRIPE_SECRET_KEY as string) || '',
  {
    apiVersion: '2026-01-28.clover' as any,
  }
)

// Price IDs - Replace with actual Stripe price IDs
export const PRICE_IDS = {
  PRO_MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_pro_monthly',
  PRO_YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID || 'price_pro_yearly',
  TEAM_MONTHLY: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID || 'price_team_monthly',
  TEAM_YEARLY: process.env.STRIPE_TEAM_YEARLY_PRICE_ID || 'price_team_yearly',
}

// Pricing configuration
export const PRICING_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    features: [
      '5 analyses per month',
      'Basic strategy output',
      'Community support',
    ],
    limits: {
      analysesPerMonth: 5,
      strategiesPerMonth: 10,
    },
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 1900, // $19.00
    monthlyPrice: '$19',
    yearlyPrice: '$190',
    yearlySavings: '$38',
    features: [
      'Unlimited analyses',
      'Full AI strategy generation',
      'Riot API integration',
      'Player stats tracking',
      'Priority support',
      'All maps & agents',
    ],
    limits: {
      analysesPerMonth: -1, // unlimited
      strategiesPerMonth: -1,
    },
  },
  TEAM: {
    id: 'team',
    name: 'Team',
    price: 4900, // $49.00
    monthlyPrice: '$49',
    yearlyPrice: '$490',
    yearlySavings: '$98',
    features: [
      'Everything in Pro',
      '5 team member seats',
      'Coach dashboard',
      'Team analytics',
      'Custom branding',
      'API access',
      'Dedicated support',
    ],
    limits: {
      analysesPerMonth: -1,
      strategiesPerMonth: -1,
      teamMembers: 5,
    },
  },
}

export function getPlanFromPriceId(priceId: string): string {
  switch (priceId) {
    case PRICE_IDS.PRO_MONTHLY:
    case PRICE_IDS.PRO_YEARLY:
      return 'PRO'
    case PRICE_IDS.TEAM_MONTHLY:
    case PRICE_IDS.TEAM_YEARLY:
      return 'TEAM'
    default:
      return 'FREE'
  }
}

export function isYearlyPrice(priceId: string): boolean {
  return priceId === PRICE_IDS.PRO_YEARLY || priceId === PRICE_IDS.TEAM_YEARLY
}

/**
 * Create or retrieve Stripe customer for user
 */
export async function getOrCreateCustomer(userId: string, email: string): Promise<string> {
  const { prisma } = await import('@/lib/prisma')
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  })

  // Update user with customer ID
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  })

  return customer.id
}

/**
 * Create checkout session
 */
export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const { prisma } = await import('@/lib/prisma')
  
  const user = await prisma.user.findUnique({ where: { id: userId } })
  
  if (!user) {
    throw new Error('User not found')
  }

  // Get or create customer
  const customerId = await getOrCreateCustomer(userId, user.email)

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    metadata: {
      userId,
    },
  })

  return session
}

/**
 * Create billing portal session
 */
export async function createBillingPortal(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}

/**
 * Retrieve subscription details
 */
export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId)
}

/**
 * Cancel subscription at period end
 */
export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}

/**
 * Reactivate subscription
 */
export async function reactivateSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  })
}

/**
 * Update subscription to new price
 */
export async function updateSubscriptionPrice(subscriptionId: string, newPriceId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  
  return stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
  })
}
