import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Copy, Share2, Download, X } from 'lucide-react'
import { useStrategy } from '@/context/StrategyContext'
import type { StrategyData } from '@/context/StrategyContext'
import { GlowButton } from '@/components/GlowButton'
import { TabSystem, type Tab } from '@/components/TabSystem'
import { Layout } from '@/components/Layout'
import { EnhancedLoadingSpinner } from '@/components/EnhancedLoadingSpinner'
import { OverviewPanel } from '@/components/OverviewPanel'
import { AgentCompPanel } from '@/components/AgentCompPanel'
import { PistolRoundPanel } from '@/components/PistolRoundPanel'
import { TimelinePanel } from '@/components/TimelinePanel'
import { CounterStrategyPanel } from '@/components/CounterStrategyPanel'
import { StrategyHistory } from '@/components/StrategyHistory'
import { copyToClipboard, copyShareLink, downloadAsJSON } from '@/utils/exportStrategies'
import type { StrategyOutput } from '@/data/strategy-generator'

const MAPS = ['Split', 'Haven', 'Bind', 'Ascent', 'Icebox', 'Breeze', 'Fracture', 'Pearl', 'Lotus']
const TEAMS = [
  'Sentinels',
  'Global Esports',
  'Paper Rex',
  'LOUD',
  'Fnatic',
  'FUT',
  'Leviatan',
  'PRX',
]

// Mock AI generation - replace with real API call
async function generateStrategy(
  map: string,
  yourTeam: string,
  opponentTeam: string
): Promise<StrategyOutput> {
  // Simulate network delay for realistic AI thinking
  await new Promise((resolve) => setTimeout(resolve, 2500))

  // Return a compact, well-typed StrategyOutput
  return {
    overview: {
      matchupAnalysis: `${yourTeam} vs ${opponentTeam} on ${map}: Focus on early map control and disciplined utility usage.`,
      keyAdvantages: ['Early duel strength', 'Utility efficiency'],
      keyThreats: ['Aggressive flanks', 'High force-buy rate'],
      recommendedApproach: 'Secure first contact, exploit rotations, and prioritize post-plant geometry.',
    },
    agentComposition: {
      agents: [
        {
          agent: 'Jett',
          role: 'Duelist',
          player: 'Your Main Entry',
          reasoning: 'Primary entry fragger with strong duel potential.',
          keyResponsibilities: ['Lead entries', 'Gather intel', 'Plant area control'],
        },
      ],
      compositionRationale: 'Balanced team composition for coordinated site execution.',
      alternativeComps: [
        {
          name: 'Aggressive Comp',
          agents: ['Jett', 'Breach', 'Omen'],
          whenToUse: 'When opponent has weak defense',
        },
      ],
    },
    pistolRounds: {
      attack: {
        setup: [
          {
            player: 'Jett',
            agent: 'Jett',
            position: 'Entry',
            responsibility: 'Lead entry',
          },
        ],
        strategy: 'Win first duel to establish advantage.',
        utilitySequence: [{ time: '0:10s', player: 'Jett', action: 'Entry duel' }],
        plantSite: 'A Site main area',
        winCondition: 'Plant spike and hold.',
        fallbackPlan: 'Regroup if entry fails.',
      },
      defense: {
        setup: [
          {
            player: 'Sage',
            agent: 'Sage',
            position: 'Anchor',
            responsibility: 'Defend site',
          },
        ],
        strategy: 'Hold site defensively.',
        utilitySequence: [{ time: '0:10s', player: 'Sage', action: 'Place wall' }],
        winCondition: 'Deny entry and retake.',
        fallbackPlan: 'Retreat and regroup.',
      },
    },
    roundTimeline: {
      gunRoundAttack: [
        {
          timeRange: '0-10s',
          phase: 'Approach',
          actions: ['Move to site'],
          keyDecisions: ['Execute timing'],
          utilityUsage: ['Smoke entry'],
        },
      ],
      gunRoundDefense: [
        {
          timeRange: '0-10s',
          phase: 'Setup',
          actions: ['Place utility'],
          keyDecisions: ['Site stack'],
          rotationTriggers: ['Attacker pressure'],
        },
      ],
    },
    counterStrategy: {
      opponentWeaknesses: [
        {
          weakness: 'Predictable defaults',
          howToExploit: 'Aggressive early pressure',
          timing: 'Rounds 1-5',
        },
      ],
      opponentStrengths: [
        {
          strength: 'Superior duel skills',
          howToNeutralize: 'Use utility advantage',
          avoidance: 'Avoid open duels',
        },
      ],
      adaptationTriggers: [
        {
          situation: 'Losing pistol',
          adjustment: 'Play anti-eco rounds',
        },
      ],
    },
    economyPlan: {
      forceBuyRounds: [4, 8, 12],
      ecoRounds: [3, 7, 11],
      bonusRoundStrategy: 'Full buy on bonus rounds.',
      ultimateEconomyTargets: ['Establish lead early', 'Control round advantage'],
    },
  }
}

export default function StrategyPage() {
  const { currentStrategy, setCurrentStrategy, addToHistory } = useStrategy()
  const [selectedMap, setSelectedMap] = useState('')
  const [yourTeam, setYourTeam] = useState('')
  const [opponentTeam, setOpponentTeam] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  )

  // Show notification
  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentStrategy) {
        setCurrentStrategy(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStrategy, setCurrentStrategy])

  const handleGenerate = async () => {
    if (!selectedMap || !yourTeam || !opponentTeam) {
      notify('Please select all fields', 'error')
      return
    }

    if (yourTeam === opponentTeam) {
      notify('Please select different teams', 'error')
      return
    }

    setIsGenerating(true)

    try {
      // Generate strategy
      const output = await generateStrategy(selectedMap, yourTeam, opponentTeam)

      const newStrategy: StrategyData = {
        id: Date.now().toString(),
        timestamp: new Date(),
        game: 'VALORANT',
        map: selectedMap,
        yourTeam,
        opponentTeam,
        output,
      }

      setCurrentStrategy(newStrategy)
      addToHistory(newStrategy)
      notify('Strategy generated successfully!')

      // Scroll to results
      setTimeout(() => {
        document.getElementById('strategy-results')?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    } catch (error) {
      console.error('Strategy generation failed:', error)
      notify('Failed to generate strategy', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = useCallback(
    (type: 'copy' | 'share' | 'download') => {
      if (!currentStrategy?.output) return

      switch (type) {
        case 'copy':
          copyToClipboard(currentStrategy, currentStrategy.output).then((result) => {
            notify(result.message, result.success ? 'success' : 'error')
          })
          break
        case 'share':
          copyShareLink(currentStrategy, currentStrategy.output).then((result) => {
            notify(result.message, result.success ? 'success' : 'error')
          })
          break
        case 'download':
          downloadAsJSON(currentStrategy, currentStrategy.output)
          notify('Strategy downloaded!')
          break
      }
    },
    [currentStrategy]
  )

  const tabs: Tab[] = currentStrategy?.output
    ? [
        {
          id: 'overview',
          label: 'Overview',
          content: <OverviewPanel strategy={currentStrategy.output} />,
        },
        {
          id: 'agents',
          label: 'Agent Comp',
          content: <AgentCompPanel strategy={currentStrategy.output} />,
        },
        {
          id: 'pistol',
          label: 'Pistol Rounds',
          content: <PistolRoundPanel strategy={currentStrategy.output} />,
        },
        {
          id: 'timeline',
          label: 'Round Timeline',
          content: <TimelinePanel strategy={currentStrategy.output} />,
        },
        {
          id: 'counter',
          label: 'Counter-Strategy',
          content: <CounterStrategyPanel strategy={currentStrategy.output} />,
        },
      ]
    : []

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Strategy Generator</h1>
          <p className="text-[#A8B2C1]">
            Create AI-powered tactical strategies for your team powered by Emergent AI
          </p>
          <div className="mt-3 inline-block px-3 py-1 bg-[#FF4655]/20 border border-[#FF4655]/30 rounded-full text-xs font-semibold text-[#FF4655]">
            BETA v1.0.0
          </div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 px-4 py-2 rounded-lg font-semibold text-white ${
                notification.type === 'success'
                  ? 'bg-[#0ECB81] border border-[#0ECB81]/50'
                  : 'bg-[#FF4655] border border-[#FF4655]/50'
              }`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          {/* Left Panel - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl p-6 h-fit sticky top-20"
          >
            <h2 className="text-xl font-bold text-white mb-6">Configuration</h2>

            {/* Game Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#ECE8E1] mb-2">Game</label>
              <select
                value="valorant"
                disabled
                className="w-full px-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white opacity-75 cursor-not-allowed"
              >
                <option>VALORANT</option>
              </select>
              <p className="text-xs text-[#A8B2C1] mt-2">League of Legends coming soon</p>
            </div>

            {/* Map Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#ECE8E1] mb-2">Map</label>
              <select
                value={selectedMap}
                onChange={(e) => setSelectedMap(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white focus:outline-none focus:border-[#FF4655] transition-colors"
              >
                <option value="">Select a map...</option>
                {MAPS.map((map) => (
                  <option key={map} value={map}>
                    {map}
                  </option>
                ))}
              </select>
            </div>

            {/* Your Team */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#ECE8E1] mb-2">Your Team</label>
              <select
                value={yourTeam}
                onChange={(e) => setYourTeam(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white focus:outline-none focus:border-[#FF4655] transition-colors"
              >
                <option value="">Select your team...</option>
                {TEAMS.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {/* Opponent Team */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#ECE8E1] mb-2">
                Opponent Team
              </label>
              <select
                value={opponentTeam}
                onChange={(e) => setOpponentTeam(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white focus:outline-none focus:border-[#FF4655] transition-colors"
              >
                <option value="">Select opponent...</option>
                {TEAMS.filter((team) => team !== yourTeam).map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <GlowButton
              onClick={handleGenerate}
              disabled={
                !selectedMap ||
                !yourTeam ||
                !opponentTeam ||
                yourTeam === opponentTeam ||
                isGenerating
              }
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="inline-block mr-2 w-5 h-5" />
                  Generate Strategy
                </>
              )}
            </GlowButton>

            {/* History Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowHistory(!showHistory)}
              className="w-full mt-3 px-4 py-2 border border-[#2B3E50] rounded-lg text-white font-semibold hover:border-[#0095FF]/50 transition-colors"
            >
              📚 View History
            </motion.button>
          </motion.div>

          {/* Right Panel - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl p-6"
            id="strategy-results"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Strategy Results</h2>
              {currentStrategy && (
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setCurrentStrategy(null)}
                  className="p-2 hover:bg-[#2B3E50] rounded-lg transition-colors"
                  title="Clear strategy (ESC)"
                >
                  <X className="w-5 h-5 text-[#A8B2C1]" />
                </motion.button>
              )}
            </div>

            {isGenerating ? (
              <div className="py-8">
                <EnhancedLoadingSpinner totalDuration={25000} />
              </div>
            ) : currentStrategy?.output ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Strategy Info Header */}
                <div className="p-4 bg-gradient-to-r from-[#FF4655]/10 to-[#0095FF]/10 border border-[#FF4655]/20 rounded-lg">
                  <p className="text-sm text-[#A8B2C1] mb-1">Current Strategy</p>
                  <p className="text-white font-bold mb-3">
                    {currentStrategy.yourTeam} <span className="text-[#A8B2C1]">vs</span>{' '}
                    {currentStrategy.opponentTeam} • {currentStrategy.map}
                  </p>

                  {/* Export Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport('copy')}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-[#0095FF]/20 border border-[#0095FF]/30 rounded hover:border-[#0095FF]/60 text-[#0095FF] font-semibold transition-colors"
                      title="Copy markdown to clipboard"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport('share')}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-[#0ECB81]/20 border border-[#0ECB81]/30 rounded hover:border-[#0ECB81]/60 text-[#0ECB81] font-semibold transition-colors"
                      title="Copy share link"
                    >
                      <Share2 className="w-3 h-3" />
                      Share
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport('download')}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-[#FFD700]/20 border border-[#FFD700]/30 rounded hover:border-[#FFD700]/60 text-[#FFD700] font-semibold transition-colors"
                      title="Download as JSON"
                    >
                      <Download className="w-3 h-3" />
                      JSON
                    </motion.button>
                  </div>
                </div>

                {/* Tabs */}
                <TabSystem tabs={tabs} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Zap className="w-12 h-12 text-[#FF4655]/30 mx-auto mb-4" />
                <p className="text-[#A8B2C1]">
                  Select teams and map, then click Generate to create a strategy
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* History Modal */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0F1923] border border-[#2B3E50] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">📚 Strategy History</h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-2 hover:bg-[#2B3E50] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#A8B2C1]" />
                  </button>
                </div>

                <StrategyHistory
                  onSelectStrategy={(strategy) => {
                    setCurrentStrategy(strategy)
                    setShowHistory(false)
                  }}
                  maxItems={10}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}
