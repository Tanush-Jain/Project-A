import { motion } from 'framer-motion'
import { Shield, AlertCircle, Zap } from 'lucide-react'
import type { StrategyOutput } from '@/data/strategy-generator'

interface CounterStrategyPanelProps {
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

const columnVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: { y: -4, transition: { duration: 0.2 } },
}

export function CounterStrategyPanel({ strategy }: CounterStrategyPanelProps) {
  const { counterStrategy } = strategy

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weaknesses to Exploit */}
        <motion.div
          variants={columnVariants}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#FF4655]" />
            Weaknesses to Exploit
          </h3>
          <div className="space-y-2">
            {counterStrategy.opponentWeaknesses.map((weakness, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className="p-4 bg-[#FF4655]/10 border border-[#FF4655]/30 rounded-lg hover:border-[#FF4655]/60 transition-colors cursor-pointer"
              >
                <p className="font-semibold text-white">{weakness.weakness}</p>
                <p className="text-sm text-[#A8B2C1] mt-2">{weakness.howToExploit}</p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#FF4655]/20">
                  <span className="text-xs font-mono text-[#FF4655]">⏱️</span>
                  <span className="text-xs text-[#A8B2C1]">{weakness.timing}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strengths to Neutralize */}
        <motion.div
          variants={columnVariants}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#0ECB81]" />
            Strengths to Neutralize
          </h3>
          <div className="space-y-2">
            {counterStrategy.opponentStrengths.map((strength, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className="p-4 bg-[#0ECB81]/10 border border-[#0ECB81]/30 rounded-lg hover:border-[#0ECB81]/60 transition-colors cursor-pointer"
              >
                <p className="font-semibold text-white">{strength.strength}</p>
                <p className="text-sm text-[#A8B2C1] mt-2">{strength.howToNeutralize}</p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#0ECB81]/20">
                  <span className="text-xs font-mono text-[#0ECB81]">🚫</span>
                  <span className="text-xs text-[#A8B2C1]">{strength.avoidance}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Adaptation Triggers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3 mt-8 pt-8 border-t border-[#2B3E50]"
      >
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#0095FF]" />
          Adaptation Triggers
        </h3>
        <p className="text-sm text-[#A8B2C1]">
          Watch for these situations and adjust your strategy accordingly
        </p>
        <div className="grid gap-2">
          {counterStrategy.adaptationTriggers.map((trigger, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + idx * 0.05 }}
              className="p-3 bg-[#0095FF]/10 border border-[#0095FF]/30 rounded-lg hover:border-[#0095FF]/60 transition-colors"
            >
              <div className="flex gap-3">
                <span className="text-lg flex-shrink-0">→</span>
                <div>
                  <p className="font-semibold text-[#0095FF]">{trigger.situation}</p>
                  <p className="text-sm text-[#A8B2C1] mt-1">{trigger.adjustment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
