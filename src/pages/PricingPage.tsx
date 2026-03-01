import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlowButton } from '@/components/GlowButton'
import { Layout } from '@/components/Layout'

type BillingCycle = 'monthly' | 'yearly'

interface Tier {
  id: string
  name: string
  monthlyPrice: string
  yearlyPrice: string
  yearlySavings?: string
  features: string[]
}

// Define tiers with proper typing
const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    features: [
      '5 analyses per month',
      'Basic strategy output',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
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
  },
  {
    id: 'team',
    name: 'Team',
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
  },
]

// Feature comparison matrix
const featureMatrix = {
  free: [
    { name: 'Analyses per month', value: '5' },
    { name: 'Strategy generation', value: 'Basic' },
    { name: 'Riot API stats', value: false },
    { name: 'Maps & agents', value: 'Limited' },
    { name: 'Priority support', value: false },
    { name: 'Team features', value: false },
    { name: 'Custom branding', value: false },
  ],
  pro: [
    { name: 'Analyses per month', value: 'Unlimited' },
    { name: 'Strategy generation', value: 'Full AI' },
    { name: 'Riot API stats', value: true },
    { name: 'Maps & agents', value: 'All' },
    { name: 'Priority support', value: true },
    { name: 'Team features', value: false },
    { name: 'Custom branding', value: false },
  ],
  team: [
    { name: 'Analyses per month', value: 'Unlimited' },
    { name: 'Strategy generation', value: 'Full AI' },
    { name: 'Riot API stats', value: true },
    { name: 'Maps & agents', value: 'All' },
    { name: 'Priority support', value: 'Dedicated' },
    { name: 'Team features', value: '5 seats' },
    { name: 'Custom branding', value: true },
  ],
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  const handleCheckout = async (planId: string) => {
    if (planId === 'free') {
      window.location.href = '/signup'
      return
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: planId,
          billingCycle,
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-[#A8B2C1] max-w-2xl mx-auto mb-8">
            Choose the plan that fits your coaching needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-[#A8B2C1]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-[#2B3E50] rounded-full transition-colors hover:bg-[#3B4E60]"
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-[#FF4655] rounded-full"
                animate={{ left: billingCycle === 'monthly' ? '4px' : '28px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-[#A8B2C1]'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full"
              >
                Save 20%
              </motion.span>
            )}
          </div>
        </motion.section>

        {/* Trial Notice */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-[#A8B2C1] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            14-day free trial on all plans
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative rounded-2xl border transition-all duration-300 ${
                tier.id === 'pro'
                  ? 'border-[#FF4655] bg-[#1C2B3A] shadow-[0_0_60px_rgba(255,70,85,0.3)] md:scale-105'
                  : 'border-[#2B3E50] bg-[#1C2B3A]/30 hover:border-[#FF4655]/50'
              }`}
            >
              {/* Badge */}
              {tier.id === 'pro' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF4655] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-[#A8B2C1] text-sm mb-6">
                  {tier.id === 'free' && 'Perfect for getting started'}
                  {tier.id === 'pro' && 'For serious players and coaches'}
                  {tier.id === 'team' && 'For organizations and esports teams'}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold font-mono text-[#FF4655]">
                      {billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                    </span>
                    <span className="text-[#A8B2C1]">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {tier.yearlySavings && billingCycle === 'yearly' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 text-sm mt-1"
                    >
                      Save {tier.yearlySavings}/year
                    </motion.p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIdx) => (
                    <motion.div
                      key={featureIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: featureIdx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-[#FF4655] flex-shrink-0" />
                      <span className="text-[#A8B2C1] text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(tier.id)}
                  className={`w-full ${
                    tier.id === 'pro'
                      ? 'bg-[#FF4655] hover:bg-[#FF5A67]'
                      : 'bg-[#2B3E50] hover:bg-[#3B4E60]'
                  } text-white font-semibold py-3 px-6 rounded-lg transition-colors`}
                >
                  {tier.id === 'free' ? 'Get Started Free' : 'Start Free Trial'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Compare Plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-[#2B3E50]">
                  <th className="text-left py-4 px-4 text-[#A8B2C1] font-medium">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier.id} className="text-center py-4 px-4 text-white font-medium">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureMatrix.free.map((feature, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-[#2B3E50]/50"
                  >
                    <td className="py-4 px-4 text-[#A8B2C1]">{feature.name}</td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.value === 'boolean' ? (
                        feature.value ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[#A8B2C1] mx-auto" />
                        )
                      ) : (
                        <span className="text-white">{feature.value}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof featureMatrix.pro[idx].value === 'boolean' ? (
                        featureMatrix.pro[idx].value ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[#A8B2C1] mx-auto" />
                        )
                      ) : (
                        <span className="text-white">{String(featureMatrix.pro[idx].value)}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof featureMatrix.team[idx].value === 'boolean' ? (
                        featureMatrix.team[idx].value ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[#A8B2C1] mx-auto" />
                        )
                      ) : (
                        <span className="text-white">{String(featureMatrix.team[idx].value)}</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, all plans can be cancelled at any time. Your access will continue until the end of your billing period.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, and PayPal through Stripe.',
              },
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes, you can change your plan at any time. Changes take effect immediately with prorated billing.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! All paid plans include a 14-day free trial. No credit card required to start.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl hover:border-[#FF4655]/50 transition-colors"
              >
                <h4 className="text-lg font-bold text-white mb-2">{item.q}</h4>
                <p className="text-[#A8B2C1]">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}

