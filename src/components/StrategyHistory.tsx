import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Eye } from 'lucide-react'
import { useState } from 'react'
import { useStrategy } from '@/context/StrategyContext'
import type { StrategyData } from '@/context/StrategyContext'

interface StrategyHistoryProps {
  onSelectStrategy?: (strategy: StrategyData) => void
  maxItems?: number
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
  hover: { y: -4, transition: { duration: 0.2 } },
}

export function StrategyHistory({
  onSelectStrategy,
  maxItems = 10,
}: StrategyHistoryProps) {
  const { strategyHistory, removeFromHistory } = useStrategy()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const displayStrategies = strategyHistory.slice(0, maxItems)

  if (displayStrategies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <p className="text-[#A8B2C1]">No strategies generated yet.</p>
        <p className="text-sm text-[#A8B2C1]/60 mt-2">
          Generate your first strategy to see it appear here.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <AnimatePresence mode="popLayout">
        {displayStrategies.map((strategy) => (
          <motion.div
            key={strategy.id}
            variants={cardVariants}
            whileHover="hover"
            exit="exit"
            onMouseEnter={() => setHoveredId(strategy.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative rounded-lg border border-[#2B3E50] bg-[#0F1923]/50 overflow-hidden hover:border-[#FF4655]/50 transition-colors"
          >
            {/* Gradient overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === strategy.id ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-[#FF4655]/10 to-transparent pointer-events-none"
            />

            {/* Card Content */}
            <div className="p-4 space-y-3 relative z-10">
              {/* Teams */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#A8B2C1] uppercase tracking-wide">
                  Matchup
                </p>
                <p className="text-sm font-bold text-white">
                  {strategy.yourTeam} <span className="text-[#A8B2C1]/60">vs</span> {strategy.opponentTeam}
                </p>
              </div>

              {/* Map */}
              <div className="flex items-center gap-2">
                <span className="text-lg">🗺️</span>
                <p className="text-sm text-[#A8B2C1]">{strategy.map}</p>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-[#A8B2C1]/60">
                {new Date(strategy.timestamp).toLocaleDateString()} at{' '}
                {new Date(strategy.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredId === strategy.id ? 1 : 0,
                  y: hoveredId === strategy.id ? 0 : 10,
                }}
                className="flex gap-2 pt-2 border-t border-[#2B3E50] mt-2"
              >
                <button
                  onClick={() => onSelectStrategy?.(strategy)}
                  className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-[#FF4655]/20 border border-[#FF4655]/30 rounded hover:border-[#FF4655]/60 transition-colors text-xs font-semibold text-[#FF4655]"
                  title="View this strategy"
                >
                  <Eye className="w-3 h-3" />
                  View
                </button>
                <button
                  onClick={() => removeFromHistory(strategy.id)}
                  className="px-2 py-2 bg-red-500/20 border border-red-500/30 rounded hover:border-red-500/60 transition-colors text-red-400 hover:text-red-300"
                  title="Delete this strategy"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.div>
            </div>

            {/* Type Badge */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-[#FF4655]/20 border border-[#FF4655]/30 rounded text-xs font-semibold text-[#FF4655]">
              {strategy.game}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
