import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface EnhancedLoadingSpinnerProps {
  stage?: number
  totalDuration?: number
}

const LOADING_STAGES = [
  { label: 'Analyzing team compositions...', icon: '👥', color: '#FF4655' },
  { label: 'Processing map data...', icon: '🗺️', color: '#0095FF' },
  { label: 'Calculating optimal strategies...', icon: '🧠', color: '#0ECB81' },
  { label: 'Generating tactical timelines...', icon: '⏱️', color: '#FFD700' },
  { label: 'Finalizing recommendations...', icon: '✨', color: '#9B4DFF' },
]

export function EnhancedLoadingSpinner({
  stage = 0,
  totalDuration = 25000,
}: EnhancedLoadingSpinnerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentStage, setCurrentStage] = useState(Math.min(stage, LOADING_STAGES.length - 1))

  const stagePercentage = 100 / LOADING_STAGES.length

  // Update elapsed time for progress bar
  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      const percentage = Math.min((elapsed / totalDuration) * 100, 100)

      setElapsedTime(percentage)

      // Determine current stage based on elapsed time
      const newStage = Math.min(
        Math.floor((percentage / 100) * LOADING_STAGES.length),
        LOADING_STAGES.length - 1
      )
      setCurrentStage(newStage)

      if (percentage >= 100) {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [totalDuration])

  const currentStageData = LOADING_STAGES[currentStage]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center space-y-8 py-12"
    >
      {/* Main Spinner */}
      <motion.div variants={itemVariants} className="relative w-24 h-24">
        {/* Outer spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-3 border-transparent border-t-[#FF4655] border-r-[#0095FF]"
        />

        {/* Middle spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-3 border-transparent border-b-[#0ECB81] border-l-[#FFD700]"
        />

        {/* Inner pulsing icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-3xl"
        >
          {currentStageData.icon}
        </motion.div>
      </motion.div>

      {/* Stage Label */}
      <motion.div
        key={currentStage}
        variants={itemVariants}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-2"
      >
        <p className="text-xl font-semibold text-white">{currentStageData.label}</p>
        <p className="text-sm text-[#A8B2C1]">
          Stage {currentStage + 1} of {LOADING_STAGES.length}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={itemVariants} className="w-full max-w-xs space-y-2">
        <div className="h-2 bg-[#0F1923] border border-[#2B3E50] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF4655] via-[#0095FF] to-[#0ECB81]"
            style={{ width: `${elapsedTime}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#A8B2C1]">
          <span>{Math.round(elapsedTime)}%</span>
          <span>{Math.ceil((totalDuration / 1000) * ((100 - elapsedTime) / 100))}s</span>
        </div>
      </motion.div>

      {/* Stage Indicators */}
      <motion.div variants={itemVariants} className="flex gap-2 mt-6">
        {LOADING_STAGES.map((s, idx) => (
          <motion.div
            key={idx}
            animate={{
              scale: idx === currentStage ? 1.2 : 1,
              backgroundColor: idx <= currentStage ? s.color : '#2B3E50',
            }}
            transition={{ duration: 0.2 }}
            className="w-2 h-2 rounded-full"
            title={s.label}
          />
        ))}
      </motion.div>

      {/* Status Text */}
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-[#A8B2C1] italic"
      >
        This typically takes 15-30 seconds...
      </motion.p>
    </motion.div>
  )
}
