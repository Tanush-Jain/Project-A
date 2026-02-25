import { ClerkProvider } from '@clerk/clerk-react'
import type { ReactNode } from 'react'

// Get the publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn(
    'Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file.'
  )
}

interface ClerkAuthProviderProps {
  children: ReactNode
}

export function ClerkAuthProvider({ children }: ClerkAuthProviderProps) {
  if (!PUBLISHABLE_KEY) {
    return <>{children}</>
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  )
}

export { useAuth, SignIn, SignUp } from '@clerk/clerk-react'

