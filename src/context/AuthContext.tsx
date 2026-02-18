import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface User {
  email: string
  role: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const storedAuth = localStorage.getItem('valorant_auth')
    const storedUser = localStorage.getItem('valorant_user')
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - validate email format
    if (!email.includes('@') || password.length < 6) {
      return false
    }
    const newUser = { email, role: 'AI Coach' }
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem('valorant_auth', 'true')
    localStorage.setItem('valorant_user', JSON.stringify(newUser))
    return true
  }

  const signup = async (email: string, password: string, role: string): Promise<boolean> => {
    // Mock signup - validate email format
    if (!email.includes('@') || password.length < 6) {
      return false
    }
    const newUser = { email, role: role || 'AI Coach' }
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem('valorant_auth', 'true')
    localStorage.setItem('valorant_user', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('valorant_auth')
    localStorage.removeItem('valorant_user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

