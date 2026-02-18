import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Clock, Trophy } from 'lucide-react'
import type { StrategyOutput } from '@/data/strategy-generator'

interface PistolRoundPanelProps {
  strategy: StrategyOutput
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export function PistolRoundPanel({ strategy }: PistolRoundPanelProps) {
  const { pistolRounds } = strategy
  const [activeTab, setActiveTab] = useState<'attack' | 'defense'>('attack')

  const currentRound = activeTab === 'attack' ? pistolRounds.attack : pistolRounds.defense

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 border-b border-[#2B3E50]"
      >
        {(['attack', 'defense'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold transition-colors border-b-2 capitalize ${
              activeTab === tab
                ? 'text-[#FF4655] border-[#FF4655]'
                : 'text-[#A8B2C1] border-transparent hover:text-white'
            }`}
          >
            {tab === 'attack' ? '🔴 Attack' : '🔵 Defense'}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          {/* Strategy Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-[#0F1923]/50 border border-[#2B3E50] rounded-lg"
          >
            <p className="text-[#A8B2C1] leading-relaxed">{currentRound.strategy}</p>
          </motion.div>

          {/* Setup Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-[#FF4655]" />
              Player Setup
            </h3>
            <div className="grid gap-2">
              {currentRound.setup.map((setup, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="p-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white">{setup.player}</p>
                      <p className="text-sm text-[#A8B2C1]">{setup.agent}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[#FF4655]/20 border border-[#FF4655]/30 rounded text-[#FF4655]">
                      {setup.position}
                    </span>
                  </div>
                  <p className="text-xs text-[#A8B2C1] mt-2">{setup.responsibility}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Utility Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0ECB81]" />
              Utility Timeline
            </h3>
            <div className="space-y-2 pl-4 border-l-2 border-[#0ECB81]/30">
              {currentRound.utilitySequence.map((util, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="relative -ml-6 pl-4"
                >
                  <div className="absolute left-0 top-2 w-3 h-3 bg-[#0ECB81] rounded-full border-2 border-[#0F1923]" />
                  <div>
                    <p className="font-semibold text-white">{util.time}</p>
                    <p className="text-sm text-[#A8B2C1]">
                      {util.player} • {util.action}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Win Condition Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 bg-gradient-to-r from-[#0ECB81]/10 to-[#0095FF]/10 border border-[#0ECB81]/30 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-[#0ECB81] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#0ECB81]">Win Condition</p>
                <p className="text-white mt-1">{currentRound.winCondition}</p>
              </div>
            </div>
          </motion.div>

          {/* Fallback Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-[#FF4655]/10 border border-[#FF4655]/20 rounded-lg"
          >
            <p className="font-semibold text-white mb-2">📋 Fallback Plan</p>
            <p className="text-[#A8B2C1]">{currentRound.fallbackPlan}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
