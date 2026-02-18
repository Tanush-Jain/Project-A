import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  return (
    <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#2B3E50]"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-1 rounded-full border-2 border-[#FF4655]/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-[#FF4655]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Center dot */}
      <motion.div
        className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#FF4655]"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#FF4655]/20 blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  )
}

// Full screen loader
export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-[#0F1923] flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        <LoadingSpinner size="lg" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#A8B2C1] text-sm uppercase tracking-widest"
        >
          Loading Strategy...
        </motion.p>
      </div>
    </div>
  )
}

