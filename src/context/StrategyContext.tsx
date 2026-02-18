import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { StrategyOutput } from '@/data/strategy-generator'

export interface StrategyData {
  id: string
  timestamp: Date
  game: string
  map: string
  yourTeam: string
  opponentTeam: string
  // Full strategy output
  output?: StrategyOutput
  // Legacy simple fields (kept for backward compatibility)
  overview?: string
  agents?: string[]
  pistolRounds?: string
  roundTimeline?: string
  counterStrategy?: string
}

interface StrategyContextType {
  currentStrategy: StrategyData | null
  strategyHistory: StrategyData[]
  setCurrentStrategy: (strategy: StrategyData | null) => void
  addToHistory: (strategy: StrategyData) => void
  clearCurrentStrategy: () => void
  removeFromHistory: (id: string) => void
  getStrategyById: (id: string) => StrategyData | undefined
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined)

export function StrategyProvider({ children }: { children: ReactNode }) {
  const [currentStrategy, setCurrentStrategy] = useState<StrategyData | null>(null)
  const [strategyHistory, setStrategyHistory] = useState<StrategyData[]>(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem('valorant_strategy_history')
      if (storedHistory) {
        try {
          const parsed = JSON.parse(storedHistory)
          return parsed.map((s: StrategyData) => ({
            ...s,
            timestamp: new Date(s.timestamp),
          }))
        } catch (e) {
          console.error('Failed to parse strategy history', e)
        }
      }
    }
    return []
  })

  // Persist history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('valorant_strategy_history', JSON.stringify(strategyHistory))
  }, [strategyHistory])

  const addToHistory = (strategy: StrategyData) => {
    setStrategyHistory((prev) => [strategy, ...prev].slice(0, 10))
  }

  const removeFromHistory = (id: string) => {
    setStrategyHistory((prev) => prev.filter((s) => s.id !== id))
  }

  const getStrategyById = (id: string) => {
    return strategyHistory.find((s) => s.id === id)
  }

  const clearCurrentStrategy = () => {
    setCurrentStrategy(null)
  }

  return (
    <StrategyContext.Provider
      value={{
        currentStrategy,
        strategyHistory,
        setCurrentStrategy,
        addToHistory,
        clearCurrentStrategy,
        removeFromHistory,
        getStrategyById,
      }}
    >
      {children}
    </StrategyContext.Provider>
  )
}

export function useStrategy() {
  const context = useContext(StrategyContext)
  if (context === undefined) {
    throw new Error('useStrategy must be used within a StrategyProvider')
  }
  return context
}