/**
 * AI Coach Narrator Component
 * Animated AI coach that narrates match timeline with speech synthesis
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  User,
  MessageSquare,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { RoundTimelineEvent } from '@/types/lol'

interface AICoachNarratorProps {
  timeline: RoundTimelineEvent[]
  isPlaying?: boolean
  onPlayPause?: () => void
  onSeek?: (round: number) => void
  autoAdvanceInterval?: number // milliseconds
}

export function AICoachNarrator({ 
  timeline, 
  isPlaying = false, 
  onPlayPause,
  onSeek,
  autoAdvanceInterval = 10000 
}: AICoachNarratorProps) {
  const [currentRound, setCurrentRound] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentEvent = timeline[currentRound]

  // Character-by-character typing effect
  const typeText = useCallback((text: string) => {
    setDisplayedText('')
    setIsTyping(true)
    
    let charIndex = 0
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(prev => prev + text[charIndex])
        charIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, 30) // 30ms per character

    return typingInterval
  }, [])

  // Speak text using Web Speech API
  const speakText = useCallback((text: string) => {
    if (isMuted || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0
    
    // Try to find a suitable voice
    const voices = window.speechSynthesis.getVoices()
    const englishVoice = voices.find(v => v.lang.startsWith('en'))
    if (englishVoice) {
      utterance.voice = englishVoice
    }

    speechRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isMuted])

  // Handle round change
  useEffect(() => {
    if (!currentEvent) return

    // Create narration text from the event
    const narrationText = `Round ${currentEvent.round}. ${currentEvent.phase}. ${currentEvent.keyDecision}`
    
    // Start typing effect
    const typingInterval = typeText(narrationText)
    
    // Start speaking after a short delay
    const speakTimeout = setTimeout(() => {
      speakText(narrationText)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearTimeout(speakTimeout)
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [currentRound, currentEvent, typeText, speakText])

  // Auto-advance timeline
  useEffect(() => {
    if (!isPlaying || !onPlayPause) return

    const interval = setInterval(() => {
      setCurrentRound(prev => {
        if (prev >= timeline.length - 1) {
          onPlayPause()
          return prev
        }
        return prev + 1
      })
    }, autoAdvanceInterval)

    return () => clearInterval(interval)
  }, [isPlaying, onPlayPause, autoAdvanceInterval, timeline.length])

  const handleSeek = (round: number) => {
    setCurrentRound(round)
    onSeek?.(round)
  }

  const handleSkipBack = () => {
    const newRound = Math.max(0, currentRound - 1)
    handleSeek(newRound)
  }

  const handleSkipForward = () => {
    const newRound = Math.min(timeline.length - 1, currentRound + 1)
    handleSeek(newRound)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (isMuted && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  if (!currentEvent) {
    return (
      <div className="p-6 bg-[#0F1923] rounded-lg border border-[#2B3E50] text-center">
        <p className="text-gray-400">No timeline data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Coach Avatar Section */}
      <div className="p-6 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <motion.div
              animate={{ 
                scale: isTyping ? [1, 1.05, 1] : 1,
              }}
              transition={{ 
                repeat: isTyping ? Infinity : 0, 
                duration: 1 
              }}
              className="relative"
            >
              {/* Pulsing circles */}
              {(isPlaying || isTyping) && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-red-500 rounded-full"
                />
              )}
              
              {/* Avatar circle */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isTyping ? 'bg-red-500' : 'bg-[#1C2B3A]'
              } border-2 border-red-500`}>
                <User className={`w-10 h-10 ${isTyping ? 'text-white' : 'text-red-500'}`} />
              </div>
            </motion.div>
          </div>

          {/* Narration Box */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-400">AI Coach</span>
              {isTyping && (
                <span className="text-xs text-gray-500">typing...</span>
              )}
            </div>
            
            <div className="min-h-[80px] p-4 bg-[#1C2B3A] rounded-lg">
              <p className="text-white leading-relaxed">
                {displayedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="inline-block w-1 h-4 bg-red-500 ml-1"
                  />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Sound Wave Visualization */}
        {isPlaying && !isMuted && (
          <div className="flex items-center justify-center gap-1 mt-4 h-8">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [8, Math.random() * 24 + 8, 8],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.5 + Math.random() * 0.5,
                  delay: i * 0.05
                }}
                className="w-1 bg-red-500 rounded-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between p-4 bg-[#0F1923] rounded-lg border border-[#2B3E50]">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipBack}
            disabled={currentRound === 0}
            className="text-gray-400 hover:text-white"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            onClick={onPlayPause}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipForward}
            disabled={currentRound === timeline.length - 1}
            className="text-gray-400 hover:text-white"
          >
            <SkipForward className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-gray-400 hover:text-white ml-2"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="text-sm text-gray-400">
          Round {currentRound + 1} of {timeline.length}
        </div>
      </div>

      {/* Timeline Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>0:00</span>
          <span>{timeline.length * 2}:00</span>
        </div>
        <div className="relative h-2 bg-[#1C2B3A] rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-red-500"
            style={{
              width: `${((currentRound + 1) / timeline.length) * 100}%`
            }}
          />
          {/* Round markers */}
          {timeline.map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5 bg-[#2B3E50]"
              style={{ left: `${((i + 1) / timeline.length) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Round List */}
      <div className="max-h-[300px] overflow-y-auto space-y-1">
        {timeline.map((event, i) => (
          <button
            key={i}
            onClick={() => handleSeek(i)}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
              currentRound === i
                ? 'bg-red-500/20 border border-red-500/50'
                : 'bg-[#0F1923] border border-[#2B3E50] hover:bg-[#1C2B3A]'
            }`}
          >
            <span className={`text-sm font-bold ${
              currentRound === i ? 'text-red-400' : 'text-gray-500'
            }`}>
              R{i + 1}
            </span>
            <span className="text-xs text-gray-400">{event.timeRange}</span>
            <span className={`text-sm flex-1 text-left ${
              currentRound === i ? 'text-white' : 'text-gray-300'
            }`}>
              {event.phase}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${
              event.result === 'win' 
                ? 'bg-green-500/20 text-green-400'
                : event.result === 'loss'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {event.result?.toUpperCase() || '-'}
            </span>
            <ChevronRight className={`w-4 h-4 ${
              currentRound === i ? 'text-red-400' : 'text-gray-600'
            }`} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default AICoachNarrator

