import Stripe from 'stripe'

export const stripe = new Stripe(
  (process.env.STRIPE_SECRET_KEY as string) || '',
  {
    apiVersion: '2023-10-16',
  }
)

export const PRICING_PLANS = {
  FREE: {
    id: 'price_free',
    name: 'Free',
    price: 0,
    limits: {
      strategiesPerMonth: 10,
      liveAnalysisPerMonth: 5,
      maxStorageGB: 1,
    },
  },
  PRO: {
    id: 'price_pro_monthly',
    name: 'Pro',
    price: 2999, // $29.99
    limits: {
      strategiesPerMonth: -1, // unlimited
      liveAnalysisPerMonth: -1,
      maxStorageGB: 50,
    },
  },
  ENTERPRISE: {
    id: 'price_enterprise_monthly',
    name: 'Enterprise',
    price: 9999, // $99.99
    limits: {
      strategiesPerMonth: -1,
      liveAnalysisPerMonth: -1,
      maxStorageGB: 500,
    },
  },
}

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  returnUrl: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: returnUrl,
      client_reference_id: userId,
      metadata: {
        userId,
      },
    })
    return session
  } catch (error) {
    console.error('Stripe Error:', error)
    throw new Error('Failed to create checkout session')
  }
}

export async function retrieveSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Stripe Error:', error)
    throw new Error('Failed to retrieve subscription')
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
    return subscription
  } catch (error) {
    console.error('Stripe Error:', error)
    throw new Error('Failed to cancel subscription')
  }
}

export async function updateSubscription(
  subscriptionId: string,
  priceId: string
) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const updated = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
    })
    return updated
  } catch (error) {
    console.error('Stripe Error:', error)
    throw new Error('Failed to update subscription')
  }
}
