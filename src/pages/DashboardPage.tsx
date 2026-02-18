import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, Zap, History } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useStrategy } from '@/context/StrategyContext'
import { GlowButton } from '@/components/GlowButton'
import { StatCard } from '@/components/StatCard'
import { StrategyCard } from '@/components/StrategyCard'
import { Layout } from '@/components/Layout'

export default function DashboardPage() {
  const { user } = useAuth()
  const { strategyHistory } = useStrategy()

  const recentStrategies = strategyHistory.slice(0, 3)
  const coachName = user?.email?.split('@')[0] || 'Coach'

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Welcome back, <span className="text-[#FF4655]">{coachName}</span>
          </h1>
          <p className="text-lg text-[#A8B2C1]">
            Ready to generate winning strategies?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Strategies Created"
            value={strategyHistory.length}
            icon={BarChart3}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Win Rate"
            value="87.5%"
            icon={Zap}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Teams Analyzed"
            value="42"
            icon={History}
            trend={{ value: 0, isPositive: false }}
          />
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-20 py-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Generate a Strategy?
          </h2>
          <Link to="/strategy">
            <GlowButton size="lg" className="min-w-[300px]">
              <Zap className="inline-block mr-2 w-5 h-5" />
              Generate New Strategy
            </GlowButton>
          </Link>
        </motion.div>

        {/* Recent Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Recent Strategies</h3>
            {strategyHistory.length > 0 && (
              <Link to="/dashboard" className="text-[#FF4655] hover:text-white transition-colors text-sm font-medium">
                View All →
              </Link>
            )}
          </div>

          {recentStrategies.length > 0 ? (
            <div className="space-y-4">
              {recentStrategies.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={{
                    id: strategy.id,
                    map: strategy.map,
                    yourTeam: strategy.yourTeam,
                    opponentTeam: strategy.opponentTeam,
                    timestamp: strategy.timestamp,
                  }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-lg"
            >
              <p className="text-[#A8B2C1] mb-4">No strategies yet</p>
              <Link to="/strategy">
                <GlowButton variant="secondary">Create Your First Strategy</GlowButton>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  )
}
