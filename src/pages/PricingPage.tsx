import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlowButton } from '@/components/GlowButton'
import { Layout } from '@/components/Layout'

const tiers = [
  {
    name: 'Starter',
    price: '$500',
    period: '/month',
    description: 'Perfect for solo coaches and small teams',
    features: [
      'Solo coach access',
      '100 strategies/month',
      'Basic analytics',
      'Map-specific tactics',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro Team',
    price: '$2,500',
    period: '/month',
    description: 'For professional teams and organizations',
    features: [
      '5 coach accounts',
      'Unlimited strategies',
      'Advanced analytics & reporting',
      'VOD analysis integration',
      'Custom agent database',
      'Priority support',
      'Team collaboration tools',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Tournament',
    price: '$10,000',
    period: '/event',
    description: 'For tournaments and events',
    features: [
      'Dedicated AI coach',
      'Real-time support',
      'Live match analysis',
      'opponent scouting reports',
      'Post-match debriefs',
      'Custom strategy modules',
      'Unlimited team seats',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-20 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-[#A8B2C1] max-w-2xl mx-auto">
            Choose the plan that best fits your coaching needs
          </p>
        </motion.section>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative rounded-2xl border transition-all duration-300 ${
                tier.highlighted
                  ? 'border-[#FF4655] bg-[#1C2B3A] shadow-[0_0_60px_rgba(255,70,85,0.3)] md:scale-105'
                  : 'border-[#2B3E50] bg-[#1C2B3A]/30 hover:border-[#FF4655]/50'
              }`}
            >
              {/* Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF4655] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-[#A8B2C1] text-sm mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold font-mono text-[#FF4655]">{tier.price}</span>
                  <span className="text-[#A8B2C1] ml-2">{tier.period}</span>
                </div>

                {/* CTA Button */}
                <div className="mb-8">
                  <Link to="/signup" className="w-full block">
                    <GlowButton
                      size="lg"
                      className="w-full"
                      variant={tier.highlighted ? 'primary' : 'secondary'}
                    >
                      {tier.cta}
                    </GlowButton>
                  </Link>
                </div>

                {/* Features */}
                <div className="space-y-4 border-t border-[#2B3E50] pt-8">
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
                      <span className="text-[#A8B2C1]">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, all plans can be cancelled at any time with no penalties.',
              },
              {
                q: 'Do you offer enterprise plans?',
                a: 'Yes! Contact our sales team for custom enterprise pricing and features.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, Pro Team plan includes 14 days free. No credit card required.',
              },
              {
                q: 'Do you support other games?',
                a: 'Currently VALORANT only. League of Legends and CS:GO support coming Q2 2024.',
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
