import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabSystemProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function TabSystem({ tabs, defaultTab, className }: TabSystemProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tab Headers */}
      <div className="flex gap-1 p-1 bg-[#0F1923] rounded-lg border border-[#2B3E50] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
              activeTab === tab.id 
                ? "text-white" 
                : "text-[#A8B2C1] hover:text-white"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#1C2B3A] rounded-md border border-[#2B3E50]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-[400px]"
        >
          {activeContent}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

