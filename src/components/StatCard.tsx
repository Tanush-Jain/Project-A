import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
}

export function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative p-6 rounded-lg border border-[#2B3E50] bg-[#1C2B3A]/50 backdrop-blur-sm",
        "transition-all duration-300 hover:border-[#FF4655]/50 hover:shadow-[0_0_30px_rgba(255,70,85,0.2)]",
        "cursor-default group"
      )}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF4655]/30 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF4655]/30 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FF4655]/30 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF4655]/30 rounded-br-lg" />
      
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-[#0F1923] border border-[#2B3E50] group-hover:border-[#FF4655]/30 transition-colors">
          <Icon className="w-6 h-6 text-[#FF4655]" />
        </div>
        {trend && (
          <span className={cn(
            "text-sm font-mono",
            trend.isPositive ? "text-green-400" : "text-red-400"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-[#A8B2C1] text-sm uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold font-mono text-white group-hover:text-[#FF4655] transition-colors">
          {value}
        </p>
      </div>
    </motion.div>
  )
}

