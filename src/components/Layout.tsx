import { Navbar } from './Navbar'
import { AnimatedBackground, GeometricShapes } from './AnimatedBackground'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
  showBackground?: boolean
}

export function Layout({ children, showBackground = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F1923] text-white">
      {showBackground && (
        <>
          <AnimatedBackground />
          <GeometricShapes />
        </>
      )}
      
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="pt-20 relative z-10"
      >
        {children}
      </motion.main>
    </div>
  )
}
