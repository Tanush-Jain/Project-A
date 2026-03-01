import { NextRequest, NextResponse } from 'next/server'
import { stripe, getPlanFromPriceId } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        (process.env.STRIPE_WEBHOOK_SECRET as string) || ''
      )
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription
        await handleTrialWillEnd(subscription)
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const customerId = session.customer as string

  if (!userId) {
    console.error('No userId in checkout session metadata')
    return
  }

  // Retrieve the subscription
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  const priceId = subscription.items.data[0].price.id
  const plan = getPlanFromPriceId(priceId)

  // Create subscription record
  await prisma.subscription.create({
    data: {
      userId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status: 'ACTIVE',
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })

  // Update user plan
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: plan as any,
      stripeCustomerId: customerId,
    },
  })

  console.log(`Checkout completed for user ${userId}, plan: ${plan}`)
}

/**
 * Handle subscription updates
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Find subscription by Stripe ID
  const existingSub = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (!existingSub) {
    console.log('Subscription not found in database:', subscription.id)
    return
  }

  const priceId = subscription.items.data[0].price.id
  const plan = getPlanFromPriceId(priceId)

  // Update subscription status
  await prisma.subscription.update({
    where: { id: existingSub.id },
    data: {
      status: subscription.status === 'active' ? 'ACTIVE' : 
              subscription.status === 'canceled' ? 'CANCELLED' : 
              subscription.status === 'past_due' ? 'PAST_DUE' : 'ACTIVE',
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })

  // Update user plan
  await prisma.user.update({
    where: { id: existingSub.userId },
    data: { plan: plan as any },
  })

  console.log(`Subscription updated: ${subscription.id}, status: ${subscription.status}`)
}

/**
 * Handle subscription deletion/cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const existingSub = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (!existingSub) {
    console.log('Subscription not found for deletion:', subscription.id)
    return
  }

  // Update subscription status
  await prisma.subscription.update({
    where: { id: existingSub.id },
    data: { status: 'CANCELLED' },
  })

  // Revert user to FREE plan
  await prisma.user.update({
    where: { id: existingSub.userId },
    data: { plan: 'FREE' },
  })

  console.log(`Subscription cancelled: ${subscription.id}`)
}

/**
 * Handle failed payments
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  // Find user by customer ID
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (!user) {
    console.log('User not found for failed payment:', customerId)
    return
  }

  // Update subscription to past due
  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id, status: 'ACTIVE' },
  })

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: 'PAST_DUE' },
    })
  }

  // Could send email notification here
  console.log(`Payment failed for user ${user.id}`)
}

/**
 * Handle trial ending notification
 */
async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  const existingSub = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (existingSub) {
    // Could send email notification about trial ending
    console.log(`Trial will end for subscription: ${subscription.id}`)
  }
}
