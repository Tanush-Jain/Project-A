import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Clock, ChevronRight, Zap, Brain, Shield } from 'lucide-react'
import { AnimatedBackground, GeometricShapes } from '@/components/AnimatedBackground'
import { GlowButton } from '@/components/GlowButton'

const features = [
  {
    icon: Brain,
    title: 'Agent Composition AI',
    description: 'AI-optimized agent lineups based on map control and team synergy analysis.',
    delay: 0.2
  },
  {
    icon: Clock,
    title: 'Round Timeline Generator',
    description: 'Detailed round-by-round strategy execution with timing precision.',
    delay: 0.4
  },
  {
    icon: Shield,
    title: 'Counter-Strategy Analysis',
    description: 'Predict opponent tactics and develop effective countermeasures.',
    delay: 0.6
  }
]

const stats = [
  { value: '10,000+', label: 'Strategies Generated' },
  { value: '500+', label: 'Pro Teams' },
  { value: '99.2%', label: 'Accuracy Rate' }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F1923] relative overflow-hidden">
      <AnimatedBackground />
      <GeometricShapes />
      
      {/* Navigation */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Target className="w-8 h-8 text-[#FF4655] transition-transform group-hover:scale-110" />
                <motion.div
                  className="absolute inset-0 bg-[#FF4655]/30 blur-lg rounded-full"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                VALORANT<span className="text-[#FF4655]">.ai</span>
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-[#A8B2C1] hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/signup">
                <GlowButton size="sm">Get Started</GlowButton>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-wider text-[#FF4655] uppercase bg-[#FF4655]/10 rounded-full border border-[#FF4655]/20">
              Professional Esports Coaching
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            AI-Powered Tactical
            <br />
            <span className="text-[#FF4655]">Coaching</span> for VALORANT
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#A8B2C1] mb-10 max-w-2xl mx-auto"
          >
            Professional-grade strategies. Map-specific tactics. Real-time adaptation.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <GlowButton size="lg" className="min-w-[280px]">
                Start Coaching Session
                <Zap className="inline-block ml-2 w-5 h-5" />
              </GlowButton>
            </Link>
            <Link to="/about">
              <GlowButton variant="outline" size="lg" className="min-w-[200px]">
                Learn More
                <ChevronRight className="inline-block ml-2 w-5 h-5" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>

        {/* Stats Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-16 overflow-x-auto py-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-3xl md:text-4xl font-bold font-mono text-[#FF4655]">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-[#A8B2C1]">
                {stat.label}
              </span>
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-[#2B3E50]" />
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Elevate Your <span className="text-[#FF4655]">Game</span>
          </h2>
          <p className="text-lg text-[#A8B2C1] max-w-2xl mx-auto">
            Cutting-edge AI technology to analyze, strategize, and dominate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              className="group relative p-8 rounded-xl border border-[#2B3E50] bg-[#1C2B3A]/30 backdrop-blur-sm transition-all duration-300 hover:border-[#FF4655]/50 hover:bg-[#1C2B3A]/60"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF4655]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-lg bg-[#0F1923] border border-[#2B3E50] flex items-center justify-center mb-6 group-hover:border-[#FF4655]/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#FF4655]" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF4655] transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-[#A8B2C1] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-[#2B3E50] bg-[#1C2B3A]/50 p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4655]/10 via-transparent to-[#FF4655]/5" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="text-[#FF4655]">Dominate</span>?
            </h2>
            <p className="text-lg text-[#A8B2C1] mb-8 max-w-xl mx-auto">
              Join 500+ professional teams using VALORANT.ai to gain competitive advantage.
            </p>
            <Link to="/signup">
              <GlowButton size="lg" className="min-w-[240px]">
                Start Free Trial
              </GlowButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2B3E50] bg-[#0F1923]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-[#FF4655]" />
              <span className="text-lg font-bold text-white">
                VALORANT<span className="text-[#FF4655]">.ai</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-[#A8B2C1]">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <span>© 2024 VALORANT.ai</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

