import { useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function AnimatedBackground() {
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 grid-pattern opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(43, 62, 80, 0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/50 via-transparent to-[#0F1923]/80" />
    </div>
  )
}

export function GeometricShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Right - Large Triangle */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 border border-[#FF4655]/20"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Bottom Left - Diamond */}
      <motion.div
        className="absolute bottom-40 left-20 w-40 h-40 border border-[#FF4655]/15"
        style={{ transform: 'rotate(45deg)' }}
        animate={{
          rotate: [45, 405],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Center Circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#FF4655]/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

