import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Target, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
]

const protectedNavLinks = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/strategy', label: 'New Strategy' },
  { path: '/history', label: 'History' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F1923]/90 backdrop-blur-md border-b border-[#2B3E50]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                {protectedNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors relative py-2",
                      isActive(link.path)
                        ? "text-[#FF4655]"
                        : "text-[#A8B2C1] hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4655]"
                      />
                    )}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pl-4 border-l border-[#2B3E50]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#A8B2C1]" />
                    <span className="text-sm text-[#ECE8E1]">{user?.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg hover:bg-[#1C2B3A] transition-colors group"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 text-[#A8B2C1] group-hover:text-[#FF4655] transition-colors" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors relative py-2",
                      isActive(link.path)
                        ? "text-[#FF4655]"
                        : "text-[#A8B2C1] hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4655]"
                      />
                    )}
                  </Link>
                ))}
                <div className="flex items-center gap-3 pl-4 border-l border-[#2B3E50]">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-[#A8B2C1] hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#FF4655] rounded-md hover:bg-[#ff5a68] transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#1C2B3A] transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-[#0F1923]/95 border-t border-[#2B3E50]"
      >
        <div className="px-4 py-4 space-y-2">
          {isAuthenticated ? (
            <>
              {protectedNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "text-[#FF4655] bg-[#1C2B3A]"
                      : "text-[#A8B2C1] hover:text-white hover:bg-[#1C2B3A]/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[#A8B2C1] hover:text-white hover:bg-[#1C2B3A]/50 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "text-[#FF4655] bg-[#1C2B3A]"
                      : "text-[#A8B2C1] hover:text-white hover:bg-[#1C2B3A]/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-[#2B3E50]">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-center rounded-lg text-sm font-medium text-[#A8B2C1] hover:text-white hover:bg-[#1C2B3A]/50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-center rounded-lg text-sm font-semibold text-white bg-[#FF4655] hover:bg-[#ff5a68] transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  )
}

