import { motion } from 'framer-motion'
import { Map, Users, Clock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StrategyData {
  id: string
  map: string
  yourTeam: string
  opponentTeam: string
  timestamp: Date
  winProbability?: number
}

interface StrategyCardProps {
  strategy: StrategyData
  onClick?: () => void
  delay?: number
}

export function StrategyCard({ strategy, onClick, delay = 0 }: StrategyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={cn(
        "group relative p-5 rounded-lg border border-[#2B3E50] bg-[#1C2B3A]/30 cursor-pointer",
        "transition-all duration-300 hover:border-[#FF4655]/50 hover:bg-[#1C2B3A]/60",
        "hover:shadow-[0_0_30px_rgba(255,70,85,0.15)]"
      )}
    >
      {/* Hover glow line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF4655] rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#0F1923] border border-[#2B3E50]">
              <Map className="w-4 h-4 text-[#FF4655]" />
            </div>
            <span className="text-white font-medium">{strategy.map}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-[#A8B2C1]">
            <Users className="w-4 h-4" />
            <span>{strategy.yourTeam}</span>
            <span className="text-[#FF4655]">vs</span>
            <span>{strategy.opponentTeam}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[#A8B2C1]">
            <Clock className="w-3 h-3" />
            <span>{strategy.timestamp.toLocaleDateString()}</span>
            <span>•</span>
            <span>{strategy.timestamp.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {strategy.winProbability && (
            <div className={cn(
              "px-3 py-1 rounded font-mono text-sm font-bold",
              strategy.winProbability >= 60 ? "bg-green-500/20 text-green-400" :
              strategy.winProbability >= 40 ? "bg-yellow-500/20 text-yellow-400" :
              "bg-red-500/20 text-red-400"
            )}>
              {strategy.winProbability}%
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-[#A8B2C1] group-hover:text-[#FF4655] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  )
}

