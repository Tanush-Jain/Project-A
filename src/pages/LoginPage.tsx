import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { GlowButton } from '@/components/GlowButton'
import { AnimatedBackground, GeometricShapes } from '@/components/AnimatedBackground'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1923] relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      <GeometricShapes />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="relative">
            <Target className="w-8 h-8 text-[#FF4655] transition-transform group-hover:scale-110" />
            <motion.div
              className="absolute inset-0 bg-[#FF4655]/30 blur-lg rounded-full"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            VALORANT<span className="text-[#FF4655]">.ai</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-[#1C2B3A]/50 backdrop-blur-sm border border-[#2B3E50] rounded-xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-[#A8B2C1] mb-8">Sign in to your coaching dashboard</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-500 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#ECE8E1] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[#A8B2C1]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white placeholder-[#A8B2C1] focus:outline-none focus:border-[#FF4655] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#ECE8E1] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[#A8B2C1]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white placeholder-[#A8B2C1] focus:outline-none focus:border-[#FF4655] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <GlowButton
              type="submit"
              size="lg"
              className="w-full mt-8"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </GlowButton>
          </form>

          {/* Sign up link */}
          <p className="text-center text-[#A8B2C1] text-sm mt-6">
            New to VALORANT.ai?{' '}
            <Link to="/signup" className="text-[#FF4655] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer help text */}
        <p className="text-center text-[#A8B2C1] text-xs mt-8">
          Use any email and password (6+ characters) for the demo
        </p>
      </motion.div>
    </div>
  )
}
