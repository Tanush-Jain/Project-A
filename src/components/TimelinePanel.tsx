import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Clock } from 'lucide-react'
import type { StrategyOutput } from '@/data/strategy-generator'

interface TimelinePanelProps {
  strategy: StrategyOutput
}

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export function TimelinePanel({ strategy }: TimelinePanelProps) {
  const { roundTimeline } = strategy
  const [activeTab, setActiveTab] = useState<'attack' | 'defense'>('attack')

  const currentTimeline =
    activeTab === 'attack' ? roundTimeline.gunRoundAttack : roundTimeline.gunRoundDefense

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
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
          className="space-y-4"
        >
          {/* Vertical Timeline */}
          <div className="space-y-4 pl-4 border-l-2 border-[#FF4655]/30">
            {currentTimeline.map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="relative group cursor-pointer"
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 top-3 w-4 h-4 bg-[#FF4655] rounded-full border-2 border-[#0F1923] group-hover:scale-125 transition-transform" />

                {/* Content Card */}
                <motion.div
                  whileHover={{ x: 8 }}
                  className="p-4 bg-[#0F1923] border border-[#2B3E50] rounded-lg hover:border-[#FF4655]/50 transition-all"
                >
                  {/* Time Range & Phase */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-mono text-[#0ECB81]">{block.timeRange}</p>
                      <p className="font-semibold text-white text-lg">{block.phase}</p>
                    </div>
                    <span className="text-2xl">⏱️</span>
                  </div>

                  {/* Actions */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#A8B2C1] uppercase mb-1">Actions</p>
                    <ul className="space-y-1">
                      {block.actions.map((action, aidx) => (
                        <li key={aidx} className="text-sm text-[#A8B2C1] flex gap-2">
                          <span className="text-[#FF4655]">→</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Decisions */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#0ECB81] uppercase mb-1">
                      Key Decisions
                    </p>
                    <ul className="space-y-1">
                      {block.keyDecisions.map((decision, didx) => (
                        <li key={didx} className="text-sm text-[#0ECB81] flex gap-2">
                          <span>✓</span>
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Utility Usage (Attack) or Rotation Triggers (Defense) */}
                  {'utilityUsage' in block && block.utilityUsage && (
                    <div>
                      <p className="text-xs font-semibold text-[#0095FF] uppercase mb-1">
                        <Zap className="w-3 h-3 inline mr-1" />
                        Utility Usage
                      </p>
                      <ul className="space-y-1">
                        {block.utilityUsage.map((util: string, uidx: number) => (
                          <li key={uidx} className="text-sm text-[#0095FF] flex gap-2">
                            <span>⚡</span>
                            {util}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rotation Triggers (Defense) */}
                  {'rotationTriggers' in block && block.rotationTriggers && (
                    <div>
                      <p className="text-xs font-semibold text-[#0095FF] uppercase mb-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Rotation Triggers
                      </p>
                      <ul className="space-y-1">
                        {block.rotationTriggers.map((trigger: string, tidx: number) => (
                          <li key={tidx} className="text-sm text-[#0095FF] flex gap-2">
                            <span>🔄</span>
                            {trigger}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-[#0F1923]/50 border border-[#2B3E50] rounded-lg grid grid-cols-2 md:grid-cols-4 gap-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF4655] rounded-full" />
              <span className="text-[#A8B2C1]">Timeline Point</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0ECB81]">→</span>
              <span className="text-[#A8B2C1]">Actions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0ECB81]">✓</span>
              <span className="text-[#A8B2C1]">Decisions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0095FF]">⚡</span>
              <span className="text-[#A8B2C1]">Utility/Rotation</span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
