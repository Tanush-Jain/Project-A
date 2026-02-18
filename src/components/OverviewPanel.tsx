import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Target } from 'lucide-react'
import type { StrategyOutput } from '@/data/strategy-generator'

interface OverviewPanelProps {
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function OverviewPanel({ strategy }: OverviewPanelProps) {
  const { overview } = strategy

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Matchup Analysis */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-[#FF4655]" />
          Matchup Analysis
        </h3>
        <p className="text-[#A8B2C1] leading-relaxed bg-[#0F1923]/50 border border-[#2B3E50] rounded-lg p-4">
          {overview.matchupAnalysis}
        </p>
      </motion.div>

      {/* Key Advantages */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#0ECB81]" />
          Key Advantages
        </h3>
        <div className="grid gap-2">
          {overview.keyAdvantages.map((advantage, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-start gap-3 p-3 bg-[#0ECB81]/10 border border-[#0ECB81]/20 rounded-lg hover:border-[#0ECB81]/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0ECB81] mt-0.5 flex-shrink-0" />
              <span className="text-[#A8B2C1]">{advantage}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Threats */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#FF4655]" />
          Key Threats
        </h3>
        <div className="grid gap-2">
          {overview.keyThreats.map((threat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-start gap-3 p-3 bg-[#FF4655]/10 border border-[#FF4655]/20 rounded-lg hover:border-[#FF4655]/40 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-[#FF4655] mt-0.5 flex-shrink-0" />
              <span className="text-[#A8B2C1]">{threat}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Approach */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Recommended Approach</h3>
        <div className="p-4 bg-gradient-to-r from-[#FF4655]/10 via-[#0ECB81]/10 to-[#FF4655]/10 border border-[#FF4655]/30 rounded-lg">
          <p className="text-white font-medium text-center">
            {overview.recommendedApproach}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
