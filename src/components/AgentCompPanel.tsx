import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, ChevronDown } from 'lucide-react'
import type { StrategyOutput } from '@/data/strategy-generator'

interface AgentCompPanelProps {
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
}

export function AgentCompPanel({ strategy }: AgentCompPanelProps) {
  const { agentComposition } = strategy
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const [showAlternatives, setShowAlternatives] = useState(false)

  const roleColors: Record<string, string> = {
    Duelist: 'border-[#FF4655]',
    Initiator: 'border-[#0ECB81]',
    Controller: 'border-[#9B4DFF]',
    Sentinel: 'border-[#0095FF]',
    Flex: 'border-[#FFD700]',
  }

  const roleBgColors: Record<string, string> = {
    Duelist: 'bg-[#FF4655]/10',
    Initiator: 'bg-[#0ECB81]/10',
    Controller: 'bg-[#9B4DFF]/10',
    Sentinel: 'bg-[#0095FF]/10',
    Flex: 'bg-[#FFD700]/10',
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Composition Rationale */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-[#0F1923]/50 border border-[#2B3E50] rounded-lg"
      >
        <p className="text-[#A8B2C1]">{agentComposition.compositionRationale}</p>
      </motion.div>

      {/* Agent Cards - 5 in a row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {agentComposition.agents.map((agent, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            className={`cursor-pointer rounded-lg border-2 transition-all ${roleColors[agent.role] || 'border-[#2B3E50]'} ${roleBgColors[agent.role] || 'bg-[#0F1923]/50'}`}
          >
            <div className="p-4 space-y-2">
              {/* Agent Name - Large */}
              <div className="text-center">
                <p className="text-lg font-bold text-white">{agent.agent}</p>
                <p className="text-xs text-[#A8B2C1] mt-1">{agent.role}</p>
              </div>

              {/* Player Name */}
              <div className="text-center border-t border-current border-opacity-20 pt-2">
                <p className="text-sm font-semibold text-white">{agent.player}</p>
              </div>

              {/* Show more indicator */}
              <div className="flex justify-center pt-1">
                <ChevronDown
                  className={`w-4 h-4 text-[#A8B2C1] transition-transform ${
                    expandedIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Expanded Section */}
            <AnimatePresence>
              {expandedIdx === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-current border-opacity-20 p-4 space-y-3 bg-[#0F1923]/30"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#0ECB81] uppercase">Reasoning</p>
                    <p className="text-xs text-[#A8B2C1] mt-1">{agent.reasoning}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#0ECB81] uppercase mb-2">
                      Key Responsibilities
                    </p>
                    <ul className="space-y-1">
                      {agent.keyResponsibilities.slice(0, 3).map((resp, ridx) => (
                        <li key={ridx} className="text-xs text-[#A8B2C1] flex gap-1">
                          <span className="text-[#FF4655]">→</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Alternative Compositions */}
      {agentComposition.alternativeComps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="w-full flex items-center justify-between p-4 bg-[#0F1923]/50 border border-[#2B3E50] rounded-lg hover:border-[#FF4655]/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FF4655]" />
              <span className="font-semibold text-white">Alternative Compositions</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[#A8B2C1] transition-transform ${
                showAlternatives ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {showAlternatives && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid gap-3 mt-3"
              >
                {agentComposition.alternativeComps.map((comp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-[#0F1923] border border-[#2B3E50] rounded-lg"
                  >
                    <p className="font-semibold text-white">{comp.name}</p>
                    <p className="text-sm text-[#A8B2C1] mt-1">{comp.agents.join(' • ')}</p>
                    <p className="text-xs text-[#A8B2C1] mt-2 italic">{comp.whenToUse}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}
