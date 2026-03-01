/**
 * Valorant Live Match Analyzer Component
 * Main UI for analyzing VCT matches from YouTube videos
 */

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Loader2, 
  Youtube, 
  Users, 
  Target, 
  Trophy, 
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Gamepad2
} from 'lucide-react'
import { TabSystem } from '@/components/TabSystem'
import { Button } from '@/components/ui/button'
import { valorantProTeams, getValorantTeam } from '@/data/lol-teams'
import type { ValorantMatchAnalysis, ValorantTeam } from '@/types/lol'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface LiveAnalyzerProps {
  onAnalysisComplete?: (analysis: ValorantMatchAnalysis) => void
}

export function LiveAnalyzer({ onAnalysisComplete }: LiveAnalyzerProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysis, setAnalysis] = useState<ValorantMatchAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = useCallback(async () => {
    if (!selectedTeam || !youtubeUrl) {
      setError('Please select a team and enter a YouTube URL')
      return
    }

    setError(null)
    setIsLoading(true)
    setProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const response = await fetch('/api/live-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: youtubeUrl,
          yourTeamId: selectedTeam
        })
      })

      clearInterval(progressInterval)
      setProgress(100)

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed')
      }

      setAnalysis(data.data)
      onAnalysisComplete?.(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [selectedTeam, youtubeUrl, onAnalysisComplete])

  const team = selectedTeam ? getValorantTeam(selectedTeam) : undefined

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          <Gamepad2 className="w-10 h-10 text-red-500" />
          Valorant Live Match Analysis
        </h1>
        <p className="text-gray-400">
          Analyze VCT matches from YouTube and get AI-powered coaching insights
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        {/* Team Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Select Your Team
          </label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full h-12 px-4 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
          >
            <option value="">Choose your team...</option>
            <optgroup label="Americas">
              {valorantProTeams.filter(t => t.region === 'Americas').map(team => (
                <option key={team.id} value={team.id}>
                  {team.emoji} {team.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="EMEA">
              {valorantProTeams.filter(t => t.region === 'EMEA').map(team => (
                <option key={team.id} value={team.id}>
                  {team.emoji} {team.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Pacific">
              {valorantProTeams.filter(t => t.region === 'Pacific').map(team => (
                <option key={team.id} value={team.id}>
                  {team.emoji} {team.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* YouTube URL Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Youtube className="w-4 h-4" />
            YouTube Video URL
          </label>
          <div className="relative">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste VCT match YouTube URL..."
              className="w-full h-12 px-4 pr-12 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            <Youtube className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
          </div>
        </div>
      </motion.div>

      {/* Analyze Button */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <Button
          onClick={handleAnalyze}
          disabled={isLoading || !selectedTeam || !youtubeUrl}
          className="h-14 px-8 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Analyze Match
            </>
          )}
        </Button>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Analyzing match...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-[#1C2B3A] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-center text-sm text-gray-400">
              <div className="p-3 bg-[#0F1923] rounded-lg">
                <Loader2 className="w-5 h-5 mx-auto mb-2 animate-spin text-red-500" />
                Extracting video data
              </div>
              <div className="p-3 bg-[#0F1923] rounded-lg">
                <Users className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                Analyzing teams
              </div>
              <div className="p-3 bg-[#0F1923] rounded-lg">
                <Target className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                Generating strategy
              </div>
              <div className="p-3 bg-[#0F1923] rounded-lg">
                <Trophy className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                Creating timeline
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {analysis && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Result Banner */}
            <div className={`p-4 rounded-lg border ${
              analysis.matchOverview.result === 'Victory' || analysis.matchOverview.result.toLowerCase().includes('win')
                ? 'bg-green-500/10 border-green-500/30'
                : analysis.matchOverview.result.toLowerCase().includes('loss')
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-yellow-500/10 border-yellow-500/30'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {analysis.matchOverview.result.toLowerCase().includes('win') ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : analysis.matchOverview.result.toLowerCase().includes('loss') ? (
                    <XCircle className="w-8 h-8 text-red-500" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-yellow-500" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {analysis.matchOverview.yourTeam} {analysis.matchOverview.result}
                    </h3>
                    <p className="text-gray-400">
                      {analysis.matchOverview.finalScore} on {analysis.matchOverview.map} - {analysis.matchOverview.tournament}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Your Side</p>
                  <p className={`font-bold ${analysis.matchOverview.yourSide === 'Attack' ? 'text-orange-400' : 'text-blue-400'}`}>
                    {analysis.matchOverview.yourSide}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <TabSystem
              tabs={[
                {
                  id: 'overview',
                  label: 'Match Overview',
                  content: <MatchOverviewPanel analysis={analysis} team={team} />
                },
                {
                  id: 'opponent',
                  label: 'Opponent Analysis',
                  content: <OpponentAnalysisPanel analysis={analysis} />
                },
                {
                  id: 'strategy',
                  label: 'Winning Strategy',
                  content: <WinningStrategyPanel analysis={analysis} />
                },
                {
                  id: 'timeline',
                  label: 'Game Timeline',
                  content: <TimelinePanel analysis={analysis} />
                },
                {
                  id: 'coaching',
                  label: 'Coaching Points',
                  content: <CoachingPointsPanel analysis={analysis} />
                }
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Match Overview Panel
function MatchOverviewPanel({ analysis, team }: { analysis: ValorantMatchAnalysis; team: ValorantTeam | undefined }) {
  return (
    <div className="space-y-6">
      {/* Team Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Your Team */}
        <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-500">-</span>
            {analysis.matchOverview.yourTeam}
          </h3>
          <div className="space-y-2">
            {analysis.matchOverview.yourAgents.map((agent, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{agent.role}</span>
                <span className="text-white font-medium">{agent.agent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opponent Team */}
        <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">-</span>
            {analysis.matchOverview.opponentTeam}
          </h3>
          <div className="space-y-2">
            {analysis.matchOverview.opponentAgents.map((agent, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{agent.role}</span>
                <span className="text-white font-medium">{agent.agent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
        <h3 className="text-lg font-bold text-white mb-3">Match Summary</h3>
        <p className="text-gray-300 leading-relaxed">{analysis.matchOverview.summary}</p>
      </div>
    </div>
  )
}

// Opponent Analysis Panel
function OpponentAnalysisPanel({ analysis }: { analysis: ValorantMatchAnalysis }) {
  const { opponentAnalysis } = analysis

  return (
    <div className="space-y-6">
      {/* Playstyle */}
      <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
        <h3 className="text-lg font-bold text-white mb-2">Playstyle</h3>
        <p className="text-gray-300">{opponentAnalysis.playstyle}</p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-[#0F1923] rounded-lg border border-green-500/30">
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {opponentAnalysis.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <ChevronRight className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-[#0F1923] rounded-lg border border-red-500/30">
          <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Weaknesses
          </h3>
          <ul className="space-y-2">
            {opponentAnalysis.weaknesses.map((weakness, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <ChevronRight className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dangerous Players */}
      <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Dangerous Players
        </h3>
        <div className="flex flex-wrap gap-2">
          {opponentAnalysis.dangerousPlayers.map((player, i) => (
            <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
              {player}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Winning Strategy Panel
function WinningStrategyPanel({ analysis }: { analysis: ValorantMatchAnalysis }) {
  const { winningStrategy } = analysis

  return (
    <div className="space-y-6">
      {/* Key Points */}
      <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-red-500" />
          Key Strategic Points
        </h3>
        <ol className="space-y-3">
          {winningStrategy.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <span className="text-gray-300">{point}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Agents to Counter */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
          <h3 className="text-lg font-bold text-white mb-4">Agents to Counter</h3>
          <div className="flex flex-wrap gap-2">
            {winningStrategy.agentsToCounter.map((agent, i) => (
              <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                {agent}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
          <h3 className="text-lg font-bold text-white mb-4">Maps to Target</h3>
          <div className="flex flex-wrap gap-2">
            {winningStrategy.mapsToTarget.map((map, i) => (
              <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {map}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Economy Plan */}
      <div className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-yellow-500" />
          Economy Plan
        </h3>
        <ul className="space-y-2">
          {winningStrategy.economyPlan.map((plan, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <span className="text-yellow-500">$</span>
              {plan}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Timeline Panel
function TimelinePanel({ analysis }: { analysis: ValorantMatchAnalysis }) {
  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {analysis.timeline.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`p-4 rounded-lg border ${
            event.result === 'win' 
              ? 'bg-green-500/10 border-green-500/30'
              : event.result === 'loss'
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-gray-500/10 border-gray-500/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white">Round {event.round}</span>
              <span className="px-2 py-0.5 bg-[#1C2B3A] text-gray-400 text-xs rounded">
                {event.timeRange}
              </span>
              <span className="text-sm text-gray-400">{event.phase}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{event.scoreAfter}</span>
              {event.result && (
                <span className={`text-xs px-2 py-0.5 rounded ${
                  event.result === 'win' ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400'
                }`}>
                  {event.result.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-400 mb-2">
            <span className="text-yellow-500">Actions:</span> {event.actions.slice(0, 3).join(', ')}
          </div>
          
          <div className="p-2 bg-[#0F1923] rounded text-sm text-gray-300 italic">
            {event.keyDecision}
          </div>

          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span>$ Your team: {event.economy.yourTeam}</span>
            <span>$ Enemy: {event.economy.opponentTeam}</span>
            {event.plantSite && <span>Site: {event.plantSite}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Coaching Points Panel
function CoachingPointsPanel({ analysis }: { analysis: ValorantMatchAnalysis }) {
  return (
    <div className="space-y-4">
      {analysis.coachingPoints.map((point, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-white">#{i + 1}</span>
                {point.round && (
                  <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                    Round {point.round}
                  </span>
                )}
                {point.agent && (
                  <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                    {point.agent}
                  </span>
                )}
              </div>
              <p className="text-gray-300">{point.advice}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default LiveAnalyzer

