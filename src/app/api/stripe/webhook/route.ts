import { NextResponse, type NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const _body = await request.json()
    const sig = request.headers.get('stripe-signature')

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    const event = stripe.webhooks.constructEvent(
      await request.text(),
      sig,
      (process.env.STRIPE_WEBHOOK_SECRET as string) || ''
    )

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        // Update user subscription in database
        console.log('Subscription updated:', event.data.object)
        break

      case 'customer.subscription.deleted':
        // Cancel user subscription
        console.log('Subscription deleted:', event.data.object)
        break

      case 'payment_intent.succeeded':
        // Mark payment as complete
        console.log('Payment succeeded:', event.data.object)
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    )
  }
}
