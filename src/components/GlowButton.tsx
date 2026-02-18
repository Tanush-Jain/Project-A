import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "relative font-semibold tracking-wide uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md overflow-hidden"
    
    const variants = {
      primary: "bg-[#FF4655] text-white hover:bg-[#ff5a68]",
      secondary: "bg-[#1C2B3A] text-[#ECE8E1] hover:bg-[#2B3E50]",
      outline: "border-2 border-[#FF4655] text-[#FF4655] bg-transparent hover:bg-[#FF4655]/10"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </span>
        ) : (
          <span className="relative z-10">{children}</span>
        )}
        
        {/* Glow effect */}
        {variant === 'primary' && (
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent -translate-x-full"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}
      </button>
    )
  }
)

GlowButton.displayName = 'GlowButton'

export { GlowButton }

